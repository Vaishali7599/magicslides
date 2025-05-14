import React, { useState } from "react";
import Login from "./components/Login";
import EmailList from "./components/EmailList";
import EmailClassifier from "./components/EmailClassifier";
import { fetchEmails } from "./utils/gmailAPI";
import { classifyEmails } from "./utils/openaiAPI";

function App() {
  const [emails, setEmails] = useState([]);
  const [classification, setClassification] = useState(null);
  const [openaiKey, setOpenaiKey] = useState(localStorage.getItem('openai_key') || '');

  // handleLogin function will be called after a successful Google OAuth login
  const handleLogin = async (token) => {
    if (!token) {
      console.error("No token provided for login");
      return;
    }

    try {
      // Fetch the emails after successful login using the provided token
      const emailsFetched = await fetchEmails(token);

      if (emailsFetched.length > 0) {
        setEmails(emailsFetched);
        localStorage.setItem("emails", JSON.stringify(emailsFetched));
      } else {
        console.log("No emails found or error fetching emails.");
      }
    } catch (error) {
      console.error("Error during email fetch:", error);
    }
  };

  // Handle classification of emails using OpenAI API
  const handleClassify = async () => {
    if (!openaiKey) return alert("OpenAI key missing");
    localStorage.setItem('openai_key', openaiKey);
    
    try {
      const result = await classifyEmails(emails, openaiKey);
      setClassification(result);
    } catch (error) {
      console.error("Error during email classification:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Gmail Email Classifier</h1>

      {!emails.length && <Login onLoginSuccess={handleLogin} />}

      {emails.length > 0 && (
        <>
          <textarea
            value={openaiKey}
            onChange={(e) => setOpenaiKey(e.target.value)}
            placeholder="Enter OpenAI API Key"
            className="border p-2 w-full mb-2"
          />
          <button
            onClick={handleClassify}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Classify Emails
          </button>
          <EmailList emails={emails} />
        </>
      )}

      {classification && <EmailClassifier classification={classification} />}
    </div>
  );
}

export default App;
