import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";
// import pdfWorker from "pdfjs-dist/build/pdf.worker.entry"; 
import mammoth from "mammoth"; // Import mammoth.js for Word files
import { HiPlus } from 'react-icons/hi';
import pdfWorker from "pdfjs-dist/build/pdf.worker.entry";


// Set the workerSrc globally for PDF.js
GlobalWorkerOptions.workerSrc = pdfWorker;

const JobPortal = (isNavbarOpen) => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState(""); // State to store extracted text
  const [highlightedText, setHighlightedText] = useState(""); // State for highlighted text
  const [loading, setLoading] = useState(false);

  // Input fields for name, email, and phone
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({}); 
  const [education, setEducation] = useState(""); // Added state for education
  const [skills, setSkills] = useState(""); // Added state for skills
  const [internship, setInternship] = useState(""); // Added state for internship
  const [showEducationFields, setShowEducationFields] = useState(false);
  const [showInternshipFields, setShowInternshipFields] = useState(false);
  const [educationEntries, setEducationEntries] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [internships, setInternships] = useState([]);
  const [editingInternshipIndex, setEditingInternshipIndex] = useState(null);
  const [showAddressFields, setShowAddressFields] = useState(false);

  const [newInternship, setNewInternship] = useState({
    startDate: "",
    endDate: "",
    companyName: "",
    technology: "",
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInternship((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddInternship = () => {
    // Validation
    const errorMessages = {};
    if (!newInternship.startDate) errorMessages.startDate = "Start date is required.";
    if (!newInternship.endDate) errorMessages.endDate = "End date is required.";
    if (!newInternship.companyName) errorMessages.companyName = "Company name is required.";
    if (!newInternship.technology) errorMessages.technology = "Technology is required.";
    if (Object.keys(errorMessages).length > 0) {
      setErrors(errorMessages);
      return;
    }

    setInternships([...internships, newInternship]);
    setNewInternship({ startDate: "", endDate: "", companyName: "", technology: "" });
    setErrors({});
    setShowInternshipFields(false);
  };

  const handleDeleteInternship = (index) => {
    const updatedInternships = internships.filter((_, i) => i !== index);
    setInternships(updatedInternships);
  };
const handleEditInternship = (index) => {
    setEditingInternshipIndex(index);
    setNewInternship(internships[index]);
  };

  // Handle file drop
  const onDrop = (acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    setFile(uploadedFile);
    setText(""); // Clear previous text
    setHighlightedText(""); // Clear previous highlighted text
    setName(""); // Clear previous name
    setEmail(""); // Clear previous email
    setPhone(""); // Clear previous phone
    setLoading(true); // Start loading indicator

    // Check file type and process accordingly
    const fileType = uploadedFile.name.split(".").pop().toLowerCase();
    if (fileType === "pdf") {
      extractTextFromPDF(uploadedFile);
    } else if (fileType === "docx") {
      extractTextFromWord(uploadedFile);
    } else {
      setText("Unsupported file format. Please upload a PDF or Word document.");
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: [".pdf", ".docx"], // Accept PDF and Word files
    onDrop,
  });

  // // Highlight extracted data
  // const highlightData = (text) => {
  //   const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
  //   const phoneRegex = /\b\d{10,15}\b/g;
  //   const nameRegex = /\b[A-Z][a-z]+\s[A-Z][a-z]+\b/; // No 'g' flag to match only the first occurrence

  //   // Extract first matches for name, email, and phone
  //   const emailMatch = text.match(emailRegex);
  //   const phoneMatch = text.match(phoneRegex);
  //   const nameMatch = text.match(nameRegex);

  //   if (emailMatch) setEmail(emailMatch[0]);
  //   if (phoneMatch) setPhone(phoneMatch[0]);
  //   if (nameMatch) setName(nameMatch[0]);

  //   // Highlight the extracted data
  //   let highlighted = text
  //     .replace(emailRegex, (match) => `<mark style="background-color: yellow">${match}</mark>`)
  //     .replace(phoneRegex, (match) => `<mark style="background-color: lightgreen">${match}</mark>`);

  //   if (nameMatch) {
  //     highlighted = highlighted.replace(
  //       nameMatch[0],
  //       `<mark style="background-color: lightpink">${nameMatch[0]}</mark>`
  //     );
  //   }

  //   setHighlightedText(highlighted);
  // };

  // // Extract text from PDF using pdf.js
  // const extractTextFromPDF = async (file) => {
  //   const fileReader = new FileReader();
  //   fileReader.onload = async () => {
  //     const arrayBuffer = fileReader.result;

  //     try {
  //       const pdf = await getDocument(arrayBuffer).promise;
  //       let extractedText = "";

  //       // Iterate through the pages of the PDF and extract text
  //       for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
  //         const page = await pdf.getPage(pageNumber);
  //         const textContent = await page.getTextContent();

  //         // Extract text from each item on the page
  //         textContent.items.forEach((item) => {
  //           extractedText += item.str + " ";
  //         });
  //       }

  //       setText(extractedText); // Store extracted text
  //       highlightData(extractedText); // Highlight the data
  //     } catch (error) {
  //       setText("Failed to extract text from the PDF file.");
  //     } finally {
  //       setLoading(false); // Stop loading indicator
  //     }
  //   };
  //   fileReader.readAsArrayBuffer(file);
  // };

  const extractTextFromPDF = async (file) => {
    const fileReader = new FileReader();
    fileReader.onload = async () => {
      const arrayBuffer = fileReader.result;
      let extractedText = "";
  
      try {
        // Get the PDF document
        const pdf = await getDocument(arrayBuffer).promise;
  
        // Iterate through all the pages of the PDF and extract text
        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
          const page = await pdf.getPage(pageNumber);
          const textContent = await page.getTextContent();
  
          // Extract text from each item on the page
          textContent.items.forEach((item) => {
            extractedText += item.str + " ";
          });
        }
  
        // Clean up the extracted text
        // extractedText = cleanText(extractedText); // Fix space issues
        extractedText = extractedText.replace(/\s+/g, ' ').trim(); // Remove extra spaces
  
        // Store the extracted text and highlight any matching data
        setText(extractedText);
        highlightData(extractedText);
  
      } catch (error) {
        setText("Failed to extract text from the PDF file.");
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };
  
    // Read the file as an array buffer
    fileReader.readAsArrayBuffer(file);
  };
  
  const highlightData = (text) => {
    if (!text || typeof text !== "string") {
      console.error("Invalid input: Text must be a non-empty string.");
      return;
    }
  
    // Extract the first 100 characters from the text
    const first100Chars = text.slice(0, 100);
    console.log("First 100 Characters:", first100Chars);
  
    // Clean up any special characters that might interfere with matching
    const cleanedText = first100Chars.replace(/[^A-Za-z0-9\s]/g, '');  // Remove special chars
    console.log("Cleaned Text:", cleanedText);
  
    // Regex for all-caps names like "ARAVINDAVARNAHL"
    const allCapsNameRegex = /\b[A-Z]{2,}\b/g;
  
    // Try to match all-caps names in the first 100 characters
    let nameMatch = cleanedText.match(allCapsNameRegex);
    console.log("All-Caps Name Match:", nameMatch);
  
    // If no all-caps name is found, check for mixed-case names in the first 100 characters
    if (!nameMatch || nameMatch.length === 0) {
      console.log("No all-caps name found. Checking for mixed-case names.");
  
      // Regex for mixed-case names (e.g., "Sravani Cheemaladinne")
      const mixedCaseNameRegex = /\b[A-Z][a-z]+(?: [A-Z][a-z]+)*\b/g;
      nameMatch = cleanedText.match(mixedCaseNameRegex);
      console.log("Mixed-Case Name Match:", nameMatch);
    }
  
    // Extract the first matched name, if available
    const extractedName = nameMatch && nameMatch.length > 0 ? nameMatch[0] : null;
    console.log("Extracted Name:", extractedName);
  
    // Regex for email addresses
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
  
    // Regex for phone numbers
    const phoneRegex = /\+?\d{1,4}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}/g;
  
    // Extract matches for emails and phone numbers
    const emailMatch = text.match(emailRegex);
    const phoneMatch = text.match(phoneRegex);
    console.log("Email Match:", emailMatch);
    console.log("Phone Match:", phoneMatch);
  
    // Safely set extracted values (ensure these methods are defined in your application)
    if (typeof setEmail === "function" && emailMatch) setEmail(emailMatch[0]);
    if (typeof setPhone === "function" && phoneMatch) setPhone(phoneMatch[0]);
    if (typeof setName === "function" && extractedName) setName(extractedName);
  
    // Highlight the extracted data in the text
    let highlighted = text;
  
    if (emailMatch) {
      highlighted = highlighted.replace(emailRegex, (match) =>
        `<mark style="background-color: yellow">${match}</mark>`
      );
    }
  
    if (phoneMatch) {
      highlighted = highlighted.replace(phoneRegex, (match) =>
        `<mark style="background-color: lightgreen">${match}</mark>`
      );
    }
  
    if (extractedName) {
      highlighted = highlighted.replace(
        extractedName,
        `<mark style="background-color: lightpink">${extractedName}</mark>`
      );
    }
  
    console.log("Highlighted Text:", highlighted);
  
    // Update the state with the highlighted text (ensure setHighlightedText is defined)
    if (typeof setHighlightedText === "function") {
      setHighlightedText(highlighted);
    } else {
      console.error("setHighlightedText is not defined.");
    }
  };

  // Extract text from Word file using mammoth.js
  const extractTextFromWord = async (file) => {
    const fileReader = new FileReader();
    fileReader.onload = async () => {
      try {
        const arrayBuffer = fileReader.result;
        const result = await mammoth.extractRawText({ arrayBuffer });
        setText(result.value); // Store extracted text
        highlightData(result.value); // Highlight the data
      } catch (error) {
        setText("Failed to extract text from the Word document.");
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };
    fileReader.readAsArrayBuffer(file);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.nameError = "Name is required.";
    if (!email) newErrors.emailError = "Email is required.";
    if (!phone) newErrors.phoneError = "Phone is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Proceed with form submission
      console.log("Form submitted successfully");
    } else {
      console.log("Form validation failed");
    }
  };
  const [formData, setFormData] = useState({
    StartDate: "",
    EndDate: "",
    Specialization: "",
    Percentage: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddEducation = () => {
    // Add the current form data to the list of education entries
    setEducationEntries((prevEntries) => [...prevEntries, formData]);
    // Reset the form fields after adding
    setFormData({
      StartDate: "",
      EndDate: "",
      Specialization: "",
      Percentage: "",
    });
    // Hide the fields after adding
    setShowEducationFields(false);
  };


  const  handleDeleteEducation= (index) => {
    const updatededucationEntries= educationEntries.filter((_, i) => i !== index);
    setEducationEntries(updatededucationEntries);
  };
  const handleEditEducation = (index) => {
    const entryToEdit = educationEntries[index];
    setFormData(entryToEdit); // Populate form with the entry's data
    setEditIndex(index); // Set the index of the entry to edit
    setShowEducationFields(true); // Show the form fields for editing
  };

    // Handle the action of adding an address
    const handleAddAddress = () => {
        // You can add your logic here to save or process the address
        console.log('Address added:', formData);
        // Reset the form or perform other actions if needed
        setFormData({
          AddressLine1: '',
          AddressLine2: '',
          Country: '',
          State: '',
          City: '',
          ZipCode: ''
        });
      };

  return (
    // <div style={{ fontFamily: "Arial, sans-serif", margin: "100px", marginLeft: "200px",marginTop:"40px" }}>
    // <div class="font-sans mx-4 mt-10 lg:mx-20 lg:mt-16 xl:mx-48 xl:mt-24">
    <div
    className={`transition-all duration-300 ${
      isNavbarOpen ? "ml-8" : "ml-6"
    } mt-12 p-4`}
  >
        <h1 className="text-center text-4xl font-semibold mb-4">
 Application Form
</h1>
      <h1>Upload Your Resume</h1>
      <div
        {...getRootProps()}
        style={{
          padding: "20px",
          border: "2px dashed #ccc",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        <p>
          Drag & drop your resume here, or click to select a file (PDF or Word files only)
        </p>
      </div>

      <div style={{ marginTop: "20px" }}>
        {file && (
          <div>
            <h3>File: {file.name}</h3>
          </div>
        )}
        {loading && <p>Loading... Please wait.</p>}

        {/* {file && !loading && text && (
          <div style={{ marginTop: "20px" }}>
            <h3>Extracted Text:</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: highlightedText || text,
              }}
            ></p>
          </div>
        )} */}
      </div>

<div className="flex items-center mt-4">
  <div className="w-1/2 pr-2">
    <label htmlFor="Name" className="block text-sm font-medium text-gray-700">
      Name <span className="text-red-500">*</span>
    </label>
    <input
      type="text"
      id="Name"
      name="Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      required
      className={`mt-2 mb-1 block w-full rounded-md border shadow-sm py-2 px-4 sm:text-sm ${
        errors.nameError ? "border-red-400" : "border-gray-400"
      }`}
    />
    {errors.nameError && (
      <p className="text-red-500 text-sm mt-1">{errors.nameError}</p>
    )}
  </div>

  <div className="w-1/2 pl-2">
    <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
      Email <span className="text-red-500">*</span>
    </label>
    <input
      type="email"
      id="Email"
      name="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
      className={`mt-2 mb-1 block w-full rounded-md border shadow-sm py-2 px-4 sm:text-sm ${
        errors.emailError ? "border-red-400" : "border-gray-400"
      }`}
    />
    {errors.emailError && (
      <p className="text-red-500 text-sm mt-1">{errors.emailError}</p>
    )}
  </div>
</div>

<div className="flex items-center mt-4">
  <div className="w-1/2 pr-2">
    <label htmlFor="Phone" className="block text-sm font-medium text-gray-700">
      Phone <span className="text-red-500">*</span>
    </label>
    <input
      type="text"
      id="Phone"
      name="Phone"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      required
      className={`mt-2 mb-1 block w-full rounded-md border shadow-sm py-2 px-4 sm:text-sm ${
        errors.phoneError ? "border-red-400" : "border-gray-400"
      }`}
    />
    {errors.phoneError && (
      <p className="text-red-500 text-sm mt-1">{errors.phoneError}</p>
    )}
  </div>
</div>

   {/* Education Section */}
   <div className="flex items-center mt-4">
        <div className="w-1/2 pr-2 flex items-center">
          <label htmlFor="Education" className="block text-sm font-medium text-gray-700">
            Education <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={() => setShowEducationFields(!showEducationFields)}
            className="ml-2 p-2 rounded-full bg-blue-500 text-white"
          >
            <HiPlus />
          </button>
        </div>
        {/* Error message for Education */}
        {/* {errors.educationError && <p className="text-red-500 text-sm mt-1">{errors.educationError}</p>} */}
      </div>

      {/* Show Education Additional Fields */}
      {showEducationFields && (
        <div className="mt-4">
          {/* Education Entry */}
          <div className="flex items-center mt-4">
            <div className="w-1/2 pr-2">
              <label htmlFor="StartDate" className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                id="StartDate"
                name="StartDate"
                value={formData.StartDate}
                onChange={handleFormChange}
                className="mt-2 mb-1 block w-full rounded-md border shadow-sm py-2 px-4 sm:text-sm"
              />
            </div>
            <div className="w-1/2 pl-2">
              <label htmlFor="EndDate" className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                id="EndDate"
                name="EndDate"
                value={formData.EndDate}
                onChange={handleFormChange}
                className="mt-2 mb-1 block w-full rounded-md border shadow-sm py-2 px-4 sm:text-sm"
              />
            </div>
          </div>

          {/* Specialization and Percentage */}
          <div className="flex items-center mt-4">
            <div className="w-1/2 pr-2">
              <label htmlFor="Specialization" className="block text-sm font-medium text-gray-700">
                Specialization
              </label>
              <input
                type="text"
                id="Specialization"
                name="Specialization"
                value={formData.Specialization}
                onChange={handleFormChange}
                className="mt-2 mb-1 block w-full rounded-md border shadow-sm py-2 px-4 sm:text-sm"
              />
            </div>
            <div className="w-1/2 pl-2">
              <label htmlFor="Percentage" className="block text-sm font-medium text-gray-700">
                Percentage
              </label>
              <input
                type="number"
                id="Percentage"
                name="Percentage"
                value={formData.Percentage}
                onChange={handleFormChange}
                className="mt-2 mb-1 block w-full rounded-md border shadow-sm py-2 px-4 sm:text-sm"
              />
            </div>
          </div>

          {/* Add Education Entry */}
          <div className="flex items-center mt-4">
    <button
            type="button"
            onClick={handleAddEducation}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Add Education
          </button>
</div>

        </div>
      )}

      {/* Education Table */}
      {educationEntries.length > 0 && (
      <div className="mt-4">
        <h3 className="text-lg font-bold mb-4">Education Details</h3>
        <table className="min-w-full mt-2">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Start Date</th>
              <th className="px-4 py-2 border">End Date</th>
              <th className="px-4 py-2 border">Specialization</th>
              <th className="px-4 py-2 border">Percentage</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {educationEntries.map((entry, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{entry.StartDate}</td>
                <td className="px-4 py-2 border">{entry.EndDate}</td>
                <td className="px-4 py-2 border">{entry.Specialization}</td>
                <td className="px-4 py-2 border">{entry.Percentage}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      type="button"
                      onClick={() => handleEditEducation(index)}
                      className="px-3 py-1 bg-green-500 text-white rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteEducation(index)}
                      className="ml-2 px-3 py-1 bg-red-500 text-white rounded-md"
                    >
                      Delete
                    </button>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}

      {/* Internship Section */}
     
    
  <div className="flex items-center mt-4">
        <div className="w-1/2 pr-2 flex items-center">
          <label htmlFor="Internship" className="block text-sm font-medium text-gray-700">
            Work Experience <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={() => setShowInternshipFields(!showInternshipFields)}
            className="ml-2 p-2 rounded-full bg-blue-500 text-white"
          >
            <HiPlus />
          </button>
        </div>
      </div>

      {showInternshipFields && (
        <div className="space-y-4 mt-4">
          <div className="flex">
            <div className="w-1/2 pr-2">
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={newInternship.startDate}
                onChange={handleInputChange}
                className="mt-2 mb-1 block w-full rounded-md border shadow-sm py-2 px-4 sm:text-sm"
              />
              {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
            </div>
            <div className="w-1/2 pl-2">
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={newInternship.endDate}
                onChange={handleInputChange}
                className="mt-2 mb-1 block w-full rounded-md border shadow-sm py-2 px-4 sm:text-sm"
              />
              {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate}</p>}
            </div>
          </div>
          <div className="flex">
            <div className="w-1/2 pr-2">
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={newInternship.companyName}
                onChange={handleInputChange}
                className="mt-2 mb-1 block w-full rounded-md border shadow-sm py-2 px-4 sm:text-sm"
              />
              {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName}</p>}
            </div>
            <div className="w-1/2 pl-2">
              <label htmlFor="technology" className="block text-sm font-medium text-gray-700">
                Technology Worked On
              </label>
              <input
                type="text"
                id="technology"
                name="technology"
                value={newInternship.technology}
                onChange={handleInputChange}
                className="mt-2 mb-1 block w-full rounded-md border shadow-sm py-2 px-4 sm:text-sm"
              />
              {errors.technology && <p className="text-red-500 text-sm">{errors.technology}</p>}
            </div>
          </div>
          <button
            type="button"
            onClick={handleAddInternship}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Add Experience
          </button>
        </div>
      )}

      {/* Table to display internships */}
      {internships.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4">Internship Details</h3>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Start Date</th>
                <th className="border border-gray-300 px-4 py-2">End Date</th>
                <th className="border border-gray-300 px-4 py-2">Company Name</th>
                <th className="border border-gray-300 px-4 py-2">Technology</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {internships.map((internship, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{internship.startDate}</td>
                  <td className="border border-gray-300 px-4 py-2">{internship.endDate}</td>
                  <td className="border border-gray-300 px-4 py-2">{internship.companyName}</td>
                  <td className="border border-gray-300 px-4 py-2">{internship.technology}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      type="button"
                      onClick={() => handleEditInternship(index)}
                      className="px-3 py-1 bg-blue-500 text-white rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteInternship(index)}
                      className="ml-2 px-3 py-1 bg-red-500 text-white rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Skills Section */}
      <div className="flex items-center mt-4">
        <div className="w-1/2 pr-2">
          <label htmlFor="Skills" className="block text-sm font-medium text-gray-700">
            Skills <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="Skills"
            name="Skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            required
            className={`mt-2 mb-1 block w-full rounded-md border shadow-sm py-2 px-4 sm:text-sm ${
              errors.skillsError ? 'border-red-400' : 'border-gray-400'
            }`}
          />
          {errors.skillsError && (
            <p className="text-red-500 text-sm mt-1">{errors.skillsError}</p>
          )}
        </div>
      </div>

{/* <div className="mt-6">
  <button
    type="submit"
    className="w-[30%] bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
  >
    Apply Now
  </button>
</div> */}

<div className="flex items-center mt-4">
  <div className="w-1/2 pr-2 flex items-center">
    <label htmlFor="Address" className="block text-sm font-medium text-gray-700">
      Addresses <span className="text-red-500">*</span>
    </label>
    {/* <button
      type="button"
      onClick={() => setShowAddressFields(!showAddressFields)}
      className="ml-2 p-2 rounded-full bg-blue-500 text-white"
    >
      <HiPlus />
    </button> */}
  </div>
</div>

{/* Show Address Additional Fields */}
{/* {showAddressFields && ( */}
  <div className="mt-4">
    {/* Address Line 1 and Address Line 2 */}
    <div className="flex items-center mt-4">
      <div className="w-1/2 pr-2">
        <label htmlFor="AddressLine1" className="block text-sm font-medium text-gray-700">
          Address Line 1
        </label>
        <input
          type="text"
          id="AddressLine1"
          name="AddressLine1"
          value={formData.AddressLine1}
          onChange={handleFormChange}
          className="mt-2 mb-1 block w-full rounded-md border shadow-sm py-2 px-4 sm:text-sm"
        />
      </div>
      <div className="w-1/2 pl-2">
        <label htmlFor="AddressLine2" className="block text-sm font-medium text-gray-700">
          Address Line 2
        </label>
        <input
          type="text"
          id="AddressLine2"
          name="AddressLine2"
          value={formData.AddressLine2}
          onChange={handleFormChange}
          className="mt-2 mb-1 block w-full rounded-md border shadow-sm py-2 px-4 sm:text-sm"
        />
      </div>
    </div>

    {/* Country, State, City, and ZipCode */}
    <div className="flex items-center mt-4">
      <div className="w-1/2 pr-2">
        <label htmlFor="Country" className="block text-sm font-medium text-gray-700">
          Country
        </label>
        <input
          type="text"
          id="Country"
          name="Country"
          value={formData.Country}
          onChange={handleFormChange}
          className="mt-2 mb-1 block w-full rounded-md border shadow-sm py-2 px-4 sm:text-sm"
        />
      </div>
      <div className="w-1/2 pl-2">
        <label htmlFor="State" className="block text-sm font-medium text-gray-700">
          State
        </label>
        <input
          type="text"
          id="State"
          name="State"
          value={formData.State}
          onChange={handleFormChange}
          className="mt-2 mb-1 block w-full rounded-md border shadow-sm py-2 px-4 sm:text-sm"
        />
      </div>
    </div>

    <div className="flex items-center mt-4">
      <div className="w-1/2 pr-2">
        <label htmlFor="City" className="block text-sm font-medium text-gray-700">
          City
        </label>
        <input
          type="text"
          id="City"
          name="City"
          value={formData.City}
          onChange={handleFormChange}
          className="mt-2 mb-1 block w-full rounded-md border shadow-sm py-2 px-4 sm:text-sm"
        />
      </div>
      <div className="w-1/2 pl-2">
        <label htmlFor="ZipCode" className="block text-sm font-medium text-gray-700">
          ZipCode
        </label>
        <input
          type="text"
          id="ZipCode"
          name="ZipCode"
          value={formData.ZipCode}
          onChange={handleFormChange}
          className="mt-2 mb-1 block w-full rounded-md border shadow-sm py-2 px-4 sm:text-sm"
        />
      </div>
    </div>

    {/* Add Address Entry */}
    {/* <div className="flex items-center mt-4">
      <button
        type="button"
        onClick={handleAddAddress}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Add Address
      </button>
    </div> */}
  </div>
{/* )} */}

<div className="mt-6 flex justify-end">
  <button
    type="submit"
    className="w-[20%] bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
  >
    Apply Now
  </button>
</div>

    </div>
  );

};

export default JobPortal;


// import React, { useState } from "react";
// import { useDropzone } from "react-dropzone";
// import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";
// // import pdfWorker from "pdfjs-dist/build/pdf.worker.entry"; 
// import mammoth from "mammoth"; // Import mammoth.js for Word files
// import { HiPlus } from 'react-icons/hi';
// import pdfWorker from "pdfjs-dist/build/pdf.worker.entry";


// // Set the workerSrc globally for PDF.js
// GlobalWorkerOptions.workerSrc = pdfWorker;

// const JobPortal = (isNavbarOpen) => {
//   const [file, setFile] = useState(null);
//   const [text, setText] = useState(""); // State to store extracted text
//   const [highlightedText, setHighlightedText] = useState(""); // State for highlighted text
//   const [loading, setLoading] = useState(false);

//   // Input fields for name, email, and phone
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [errors, setErrors] = useState({}); 


//   const [newInternship, setNewInternship] = useState({
//     startDate: "",
//     endDate: "",
//     companyName: "",
//     technology: "",
//   });


//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewInternship((prev) => ({ ...prev, [name]: value }));
//   };


//   // Handle file drop
//   const onDrop = (acceptedFiles) => {
//     const uploadedFile = acceptedFiles[0];
//     setFile(uploadedFile);
//     setText(""); // Clear previous text
//     setHighlightedText(""); // Clear previous highlighted text
//     setName(""); // Clear previous name
//     setEmail(""); // Clear previous email
//     setPhone(""); // Clear previous phone
//     setLoading(true); // Start loading indicator

//     // Check file type and process accordingly
//     const fileType = uploadedFile.name.split(".").pop().toLowerCase();
//     if (fileType === "pdf") {
//       extractTextFromPDF(uploadedFile);
//     } else if (fileType === "docx") {
//       extractTextFromWord(uploadedFile);
//     } else {
//       setText("Unsupported file format. Please upload a PDF or Word document.");
//       setLoading(false);
//     }
//   };

//   const { getRootProps, getInputProps } = useDropzone({
//     accept: [".pdf", ".docx"], // Accept PDF and Word files
//     onDrop,
//   });

  
//   const extractTextFromPDF = async (file) => {
//     const fileReader = new FileReader();
//     fileReader.onload = async () => {
//       const arrayBuffer = fileReader.result;
//       let extractedText = "";
  
//       try {
//         // Get the PDF document
//         const pdf = await getDocument(arrayBuffer).promise;
  
//         // Iterate through all the pages of the PDF and extract text
//         for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
//           const page = await pdf.getPage(pageNumber);
//           const textContent = await page.getTextContent();
  
//           // Extract text from each item on the page
//           textContent.items.forEach((item) => {
//             extractedText += item.str + " ";
//           });
//         }
  
//         // Clean up the extracted text
//         // extractedText = cleanText(extractedText); // Fix space issues
//         extractedText = extractedText.replace(/\s+/g, ' ').trim(); // Remove extra spaces
  
//         // Store the extracted text and highlight any matching data
//         setText(extractedText);
//         highlightData(extractedText);
  
//       } catch (error) {
//         setText("Failed to extract text from the PDF file.");
//       } finally {
//         setLoading(false); // Stop loading indicator
//       }
//     };
  
//     // Read the file as an array buffer
//     fileReader.readAsArrayBuffer(file);
//   };
  
//   const highlightData = (text) => {
//     if (!text || typeof text !== "string") {
//       console.error("Invalid input: Text must be a non-empty string.");
//       return;
//     }
  
//     // Extract the first 100 characters from the text
//     const first100Chars = text.slice(0, 100);
//     console.log("First 100 Characters:", first100Chars);
  
//     // Clean up any special characters that might interfere with matching
//     const cleanedText = first100Chars.replace(/[^A-Za-z0-9\s]/g, '');  // Remove special chars
//     console.log("Cleaned Text:", cleanedText);
  
//     // Regex for all-caps names like "ARAVINDAVARNAHL"
//     const allCapsNameRegex = /\b[A-Z]{2,}\b/g;
  
//     // Try to match all-caps names in the first 100 characters
//     let nameMatch = cleanedText.match(allCapsNameRegex);
//     console.log("All-Caps Name Match:", nameMatch);
  
//     // If no all-caps name is found, check for mixed-case names in the first 100 characters
//     if (!nameMatch || nameMatch.length === 0) {
//       console.log("No all-caps name found. Checking for mixed-case names.");
  
//       // Regex for mixed-case names (e.g., "Sravani Cheemaladinne")
//       const mixedCaseNameRegex = /\b[A-Z][a-z]+(?: [A-Z][a-z]+)*\b/g;
//       nameMatch = cleanedText.match(mixedCaseNameRegex);
//       console.log("Mixed-Case Name Match:", nameMatch);
//     }
  
//     // Extract the first matched name, if available
//     const extractedName = nameMatch && nameMatch.length > 0 ? nameMatch[0] : null;
//     console.log("Extracted Name:", extractedName);
  
//     // Regex for email addresses
//     const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
  
//     // Regex for phone numbers
//     const phoneRegex = /\+?\d{1,4}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}/g;
  
//     // Extract matches for emails and phone numbers
//     const emailMatch = text.match(emailRegex);
//     const phoneMatch = text.match(phoneRegex);
//     console.log("Email Match:", emailMatch);
//     console.log("Phone Match:", phoneMatch);
  
//     // Safely set extracted values (ensure these methods are defined in your application)
//     if (typeof setEmail === "function" && emailMatch) setEmail(emailMatch[0]);
//     if (typeof setPhone === "function" && phoneMatch) setPhone(phoneMatch[0]);
//     if (typeof setName === "function" && extractedName) setName(extractedName);
  
//     // Highlight the extracted data in the text
//     let highlighted = text;
  
//     if (emailMatch) {
//       highlighted = highlighted.replace(emailRegex, (match) =>
//         `<mark style="background-color: yellow">${match}</mark>`
//       );
//     }
  
//     if (phoneMatch) {
//       highlighted = highlighted.replace(phoneRegex, (match) =>
//         `<mark style="background-color: lightgreen">${match}</mark>`
//       );
//     }
  
//     if (extractedName) {
//       highlighted = highlighted.replace(
//         extractedName,
//         `<mark style="background-color: lightpink">${extractedName}</mark>`
//       );
//     }
  
//     console.log("Highlighted Text:", highlighted);
  
//     // Update the state with the highlighted text (ensure setHighlightedText is defined)
//     if (typeof setHighlightedText === "function") {
//       setHighlightedText(highlighted);
//     } else {
//       console.error("setHighlightedText is not defined.");
//     }
//   };
  
  
//   // Function to clean the extracted text (remove unwanted spaces between parts of email addresses, etc.)
//   // const cleanText = (extractedText) => {
//   //   return extractedText.replace(/\s+(?=\S)/g, ''); // Remove extra spaces between text parts
//   // };
  

//   // Extract text from Word file using mammoth.js
//   const extractTextFromWord = async (file) => {
//     const fileReader = new FileReader();
//     fileReader.onload = async () => {
//       try {
//         const arrayBuffer = fileReader.result;
//         const result = await mammoth.extractRawText({ arrayBuffer });
//         setText(result.value); // Store extracted text
//         highlightData(result.value); // Highlight the data
//       } catch (error) {
//         setText("Failed to extract text from the Word document.");
//       } finally {
//         setLoading(false); // Stop loading indicator
//       }
//     };
//     fileReader.readAsArrayBuffer(file);
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!name) newErrors.nameError = "Name is required.";
//     if (!email) newErrors.emailError = "Email is required.";
//     if (!phone) newErrors.phoneError = "Phone is required.";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0; // Return true if no errors
//   };




//   return (
//     <div
//     className={`transition-all duration-300 ${
//       isNavbarOpen ? "ml-8" : "ml-6"
//     } mt-12 p-4`}
//   >
//         <h1 className="text-center text-4xl font-semibold mb-4">
//  Application Form
// </h1>
//       <h1>Upload Your Resume</h1>
//       <div
//         {...getRootProps()}
//         style={{
//           padding: "20px",
//           border: "2px dashed #ccc",
//           borderRadius: "5px",
//           cursor: "pointer",
//         }}
//       >
//         <input {...getInputProps()} />
//         <p>
//           Drag & drop your resume here, or click to select a file (PDF or Word files only)
//         </p>
//       </div>

//       <div style={{ marginTop: "20px" }}>
//         {file && (
//           <div>
//             <h3>File: {file.name}</h3>
//           </div>
//         )}
//         {loading && <p>Loading... Please wait.</p>}

//         {/* {file && !loading && text && (
//           <div style={{ marginTop: "20px" }}>
//             <h3>Extracted Text:</h3>
//             <p
//               dangerouslySetInnerHTML={{
//                 __html: highlightedText || text,
//               }}
//             ></p>
//           </div>
//         )} */}
//       </div>

// <div className="flex items-center mt-4">
//   <div className="w-1/2 pr-2">
//     <label htmlFor="Name" className="block text-sm font-medium text-gray-700">
//       Name <span className="text-red-500">*</span>
//     </label>
//     <input
//       type="text"
//       id="Name"
//       name="Name"
//       value={name}
//       onChange={(e) => setName(e.target.value)}
//       required
//       className={`mt-2 mb-1 block w-full rounded-md border shadow-sm py-2 px-4 sm:text-sm ${
//         errors.nameError ? "border-red-400" : "border-gray-400"
//       }`}
//     />
//     {errors.nameError && (
//       <p className="text-red-500 text-sm mt-1">{errors.nameError}</p>
//     )}
//   </div>

//   <div className="w-1/2 pl-2">
//     <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
//       Email <span className="text-red-500">*</span>
//     </label>
//     <input
//       type="email"
//       id="Email"
//       name="Email"
//       value={email}
//       onChange={(e) => setEmail(e.target.value)}
//       required
//       className={`mt-2 mb-1 block w-full rounded-md border shadow-sm py-2 px-4 sm:text-sm ${
//         errors.emailError ? "border-red-400" : "border-gray-400"
//       }`}
//     />
//     {errors.emailError && (
//       <p className="text-red-500 text-sm mt-1">{errors.emailError}</p>
//     )}
//   </div>
// </div>

// <div className="flex items-center mt-4">
//   <div className="w-1/2 pr-2">
//     <label htmlFor="Phone" className="block text-sm font-medium text-gray-700">
//       Phone <span className="text-red-500">*</span>
//     </label>
//     <input
//       type="text"
//       id="Phone"
//       name="Phone"
//       value={phone}
//       onChange={(e) => setPhone(e.target.value)}
//       required
//       className={`mt-2 mb-1 block w-full rounded-md border shadow-sm py-2 px-4 sm:text-sm ${
//         errors.phoneError ? "border-red-400" : "border-gray-400"
//       }`}
//     />
//     {errors.phoneError && (
//       <p className="text-red-500 text-sm mt-1">{errors.phoneError}</p>
//     )}
//   </div>
// </div>





// <div className="mt-6 flex justify-end">
//   <button
//     type="submit"
//     className="w-[20%] bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
//   >
//     Apply Now
//   </button>
// </div>

//     </div>
//   );

// };

// export default JobPortal;


// import React, { useState } from "react";
// import { useDropzone } from "react-dropzone";
// import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";
// import pdfWorker from "pdfjs-dist/build/pdf.worker.entry"; // For PDF extraction
// import mammoth from "mammoth"; // For Word document extraction
// import { HiPlus } from 'react-icons/hi';

// // Set the workerSrc globally for PDF.js
// GlobalWorkerOptions.workerSrc = pdfWorker;

// const JobPortal = ({ isNavbarOpen }) => {
//   const [file, setFile] = useState(null);
//   const [text, setText] = useState(""); // Store extracted text
//   const [highlightedText, setHighlightedText] = useState(""); // Highlighted text
//   const [loading, setLoading] = useState(false);

//   // Input fields for name, email, and phone
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [errors, setErrors] = useState({});

//   // Handle file drop
//   const onDrop = (acceptedFiles) => {
//     const uploadedFile = acceptedFiles[0];
//     setFile(uploadedFile);
//     setText(""); // Clear previous text
//     setHighlightedText(""); // Clear previous highlighted text
//     setName(""); // Clear previous name
//     setEmail(""); // Clear previous email
//     setPhone(""); // Clear previous phone
//     setLoading(true); // Start loading indicator

//     const fileType = uploadedFile.name.split(".").pop().toLowerCase();
//     if (fileType === "pdf") {
//       extractTextFromPDF(uploadedFile);
//     } else if (fileType === "docx") {
//       extractTextFromWord(uploadedFile);
//     } else {
//       setText("Unsupported file format. Please upload a PDF or Word document.");
//       setLoading(false);
//     }
//   };

//   const { getRootProps, getInputProps } = useDropzone({
//     accept: [".pdf", ".docx"],
//     onDrop,
//   });

//   // // Highlight extracted data (Name, Email, Phone)
//   // const highlightData = (text) => {
//   //   // Regex to match email without space and extra characters
//   //   const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
  
//   //   // Refined name matching regex that ensures proper name format (first and last names, with possible initials)
//   //   const nameRegex = /\b[A-Z][a-z]+(?:\s[A-Z][a-z]+)*\s[A-Z][a-z]+(?:\s[A-Z][a-z]+)?\b/;  // Matches names like "ARAVINDA VARNA HL"
    
//   //   // Regex to match phone number in various formats
//   //   const phoneRegex = /\b\d{10,15}\b/g;
  
//   //   // Extract matches
//   //   const emailMatch = text.match(emailRegex);
//   //   const phoneMatch = text.match(phoneRegex);
//   //   const nameMatch = text.match(nameRegex);
  
//   //   // Set the matches to respective states
//   //   if (emailMatch) setEmail(emailMatch[0]);
//   //   if (phoneMatch) setPhone(phoneMatch[0]);
//   //   if (nameMatch) setName(nameMatch[0]);
  
//   //   // Highlight the extracted data
//   //   let highlighted = text
//   //     .replace(emailRegex, (match) => `<mark style="background-color: yellow">${match}</mark>`)
//   //     .replace(phoneRegex, (match) => `<mark style="background-color: lightgreen">${match}</mark>`);
  
//   //   if (nameMatch) {
//   //     highlighted = highlighted.replace(
//   //       nameMatch[0],
//   //       `<mark style="background-color: lightpink">${nameMatch[0]}</mark>`
//   //     );
//   //   }
  
//   //   setHighlightedText(highlighted); // Update the state with the highlighted text
//   // };
  

//   // const cleanText = (extractedText) => {
//   //   // Remove any unwanted space between parts of email addresses or similar cases
//   //   return extractedText.replace(/\s+(?=\S)/g, '');
//   // };

//   const highlightData = (text) => {
//     // Regex to match email without space and extra characters
//     const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
  
//     // Refined name matching regex to handle more name formats (first, middle, last names, initials)
//     const nameRegex = /\b(?:Mr\.|Ms\.|Dr\.|Prof\.)?\s?([A-Z][a-z]+(?:\s[A-Z][a-z]+){0,2})\b/g;
    
//     // Regex to match phone number in various formats (exact 10 digits or flexible format with separators)
//     const phoneRegex = /\b\d{3}[\s.-]?\d{3}[\s.-]?\d{4}\b/g;
  
//     // Extract matches
//     const emailMatch = text.match(emailRegex);
//     const phoneMatch = text.match(phoneRegex);
//     const nameMatch = text.match(nameRegex);
  
//     // Set the matches to respective states
//     if (emailMatch) setEmail(emailMatch[0]);
//     if (phoneMatch) setPhone(phoneMatch[0]);
//     if (nameMatch) setName(nameMatch[0]);
  
//     // Highlight the extracted data
//     let highlighted = text
//       .replace(emailRegex, (match) => `<mark style="background-color: yellow">${match}</mark>`)
//       .replace(phoneRegex, (match) => `<mark style="background-color: lightgreen">${match}</mark>`);
  
//     if (nameMatch) {
//       highlighted = highlighted.replace(
//         nameMatch[0],
//         `<mark style="background-color: lightpink">${nameMatch[0]}</mark>`
//       );
//     }
  
//     setHighlightedText(highlighted); // Update the state with the highlighted text
//   };
  
//   const cleanText = (extractedText) => {
//     // Remove any unwanted space between parts of email addresses or similar cases
//     return extractedText.replace(/\s+(?=\S)/g, '');
//   };
  
  
//   const extractTextFromPDF = async (file) => {
//     const fileReader = new FileReader();
//     fileReader.onload = async () => {
//       const arrayBuffer = fileReader.result;
//       let extractedText = "";
  
//       try {
//         const pdf = await getDocument(arrayBuffer).promise;
        
//         for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
//           const page = await pdf.getPage(pageNumber);
//           const textContent = await page.getTextContent();
          
//           textContent.items.forEach((item) => {
//             extractedText += item.str + " ";
//           });
//         }
  
//         // Clean up extracted text (fix the space issue)
//         extractedText = cleanText(extractedText);
//         extractedText = extractedText.replace(/\s+/g, ' ').trim();  // Remove extra spaces
  
//         setText(extractedText);
//         highlightData(extractedText);
//       } catch (error) {
//         setText("Failed to extract text from the PDF file.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fileReader.readAsArrayBuffer(file);
//   };
  


//   // Extract text from Word file using mammoth.js
//   const extractTextFromWord = async (file) => {
//     const fileReader = new FileReader();
//     fileReader.onload = async () => {
//       try {
//         const arrayBuffer = fileReader.result;
//         const result = await mammoth.extractRawText({ arrayBuffer });
//         setText(result.value);
//         highlightData(result.value);
//       } catch (error) {
//         setText("Failed to extract text from the Word document.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fileReader.readAsArrayBuffer(file);
//   };

//   // Form validation
//   const validateForm = () => {
//     const newErrors = {};
//     if (!name) newErrors.nameError = "Name is required.";
//     if (!email) newErrors.emailError = "Email is required.";
//     if (!phone) newErrors.phoneError = "Phone is required.";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   return (
//     <div className={`transition-all duration-300 ${isNavbarOpen ? "ml-8" : "ml-6"} mt-12 p-4`}>
//       <h1 className="text-center text-4xl font-semibold mb-4">Application Form</h1>
//       <h1>Upload Your Resume</h1>
//       <div
//         {...getRootProps()}
//         style={{
//           padding: "20px",
//           border: "2px dashed #ccc",
//           borderRadius: "5px",
//           cursor: "pointer",
//         }}
//       >
//         <input {...getInputProps()} />
//         <p>
//           Drag & drop your resume here, or click to select a file (PDF or Word files only)
//         </p>
//       </div>

//       <div style={{ marginTop: "20px" }}>
//         {file && <div><h3>File: {file.name}</h3></div>}
//         {loading && <p>Loading... Please wait.</p>}
//         {/* {file && !loading && text && (
//           <div style={{ marginTop: "20px" }}>
//             <h3>Extracted Text:</h3>
//             <p dangerouslySetInnerHTML={{ __html: highlightedText || text }}></p>
//           </div>
//         )} */}
//       </div>

//       {/* Name, Email, Phone input fields */}
//       <div className="flex items-center mt-4">
//         <div className="w-1/2 pr-2">
//           <label htmlFor="Name" className="block text-sm font-medium text-gray-700">Name</label>
//           <input
//             type="text"
//             id="Name"
//             name="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//             className={`mt-2 mb-1 block w-full rounded-md border shadow-sm py-2 px-4 sm:text-sm ${errors.nameError ? "border-red-400" : "border-gray-400"}`}
//           />
//           {errors.nameError && <p className="text-red-500 text-sm mt-1">{errors.nameError}</p>}
//         </div>

//         <div className="w-1/2 pl-2">
//           <label htmlFor="Email" className="block text-sm font-medium text-gray-700">Email</label>
//           <input
//             type="email"
//             id="Email"
//             name="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className={`mt-2 mb-1 block w-full rounded-md border shadow-sm py-2 px-4 sm:text-sm ${errors.emailError ? "border-red-400" : "border-gray-400"}`}
//           />
//           {errors.emailError && <p className="text-red-500 text-sm mt-1">{errors.emailError}</p>}
//         </div>
//       </div>

//       <div className="flex items-center mt-4">
//         <div className="w-1/2 pr-2">
//           <label htmlFor="Phone" className="block text-sm font-medium text-gray-700">Phone</label>
//           <input
//             type="text"
//             id="Phone"
//             name="Phone"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             required
//             className={`mt-2 mb-1 block w-full rounded-md border shadow-sm py-2 px-4 sm:text-sm ${errors.phoneError ? "border-red-400" : "border-gray-400"}`}
//           />
//           {errors.phoneError && <p className="text-red-500 text-sm mt-1">{errors.phoneError}</p>}
//         </div>
//       </div>

//       <div className="mt-6 flex justify-end">
//         <button type="submit" className="w-[20%] bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
//           Apply Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default JobPortal;
