import './Styles/Container.css';
import { FaCloudUploadAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { LuFileJson } from "react-icons/lu";
import Button from './Button';

function Container({ action }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/json") {
      setSelectedFile(file); 
    } else {
      alert("Please upload a valid JSON file.");
    }
  };

  const handleLoadToMongo = async () => {
    if (!selectedFile) {
      alert("Please upload a file first in the 'Extract' section.");
      return;
    }

    setLoading(true);
    setSuccess(false);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:9090/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.text();
        console.log(result);
        setSuccess(true);
      } else {
        alert("❌ Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("🚫 Server error");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (action === 'load' && selectedFile) {
      handleLoadToMongo();
    }
  }, [action]);

  return (
    <div className="content_display">
      {action === 'extract' && (
        <div className='chosefile'>
          <h3>Drop a JSON file here</h3>
          <p className='arrow'>👇🏾</p>

          <input
            type="file"
            id="fileUpload"
            accept=".json"
            onChange={handleFileChange}
            className="upload_input"
          />

          <label htmlFor="fileUpload" className="upload_button">
            <FaCloudUploadAlt className="upload_icon" />
            Choose File
          </label>

          {selectedFile && (
            <p className="file_name">uploaded json file <LuFileJson />{selectedFile.name}</p>
          )}
        </div>
      )}
      

      {action === 'load' && (
        <div className="load_section">
          {loading ? (
            <p className="loading_text">⏳ Uploading JSON to MongoDB...</p>
          ) : success ? (
            <p className="success_text">✅ Successfully uploaded to MongoDB!</p>
          ) : selectedFile ? (
            <p className="waiting_text">Preparing to upload...</p>
          ) : (
            <p className="waiting_text">⚠️ No file found. Please upload a JSON file in the first section.</p>
          )}
        </div>
      )}
      {action === "transform" && (
        <div>
          <select className='select_bar'>
            <option>GITHUB</option>
            <option>GITLAB</option>
            <option>BitBucket</option>
            <option>Azsure DevOps</option>
          </select>
          <Button / >
        </div>
      )
      }
    </div>
  );
}

export default Container;
