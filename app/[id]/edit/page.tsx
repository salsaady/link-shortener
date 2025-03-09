"use client";

import { SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import the router for navigation

export default function EditPage(){
  const [error, setError] = useState<string | null>(null);
  const [customizedURL, setCustomizedURL] = useState<string | null>(null);
  const [thisId, setThisId] = useState("");
  const [newId, setNewId] = useState(""); // To hold the new custom ID

  const router = useRouter(); // Initialize the router
  useEffect(() => {
    const pathArray = window.location.pathname.split('/')
    setThisId( pathArray[1])
  }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
       // API expects a PUT request to update the existing link identifier
       const res = await fetch(`http://localhost:3000/api/links/${thisId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newId: newId }), // Sending the new custom ID
      });
      if (!res.ok) {
        const data = await res.json();
        const { error } = data;
        setError(error);
        return;
      }

      setCustomizedURL(`http://localhost:3000/${newId}`)
      alert('Shortened URL updated successfully!');
  }

  function copyToClipboard() {
    console.log("i clicked copy and this is my new url ",{customizedURL})
     if (customizedURL) {
       navigator.clipboard.writeText(customizedURL)
       alert('Copied to clipboard')
     }
   }

  // Handler to update the state when the input changes
  const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setNewId(event.target.value); // Update the state with the new input value
  };

  return (
    <div className="p-4 space-y-4" style={{ margin: "10px" }}>
      <center className="text-100px">Customize your shortened URL!</center>
      {error && <p>error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="url">Edit your URL: http://localhost:3000/ </label>
          <input 
        value={newId} // Bind input to state
        onChange={handleInputChange} // Handle changes
        type="text"
        name="url"
        id="url"
        className="form-controls border-2 border-black rounded-md"
        style={{ margin: "10px", width: "600px", height: "40px", fontSize: "16px" }}
      />        </div>
        <button type="submit" className="border-2 border-black px-1 py-1 rounded">Save</button>
        {customizedURL && <p>New URL: http://localhost:3000/{customizedURL}</p>}
        {customizedURL && <button type="button" onClick={copyToClipboard} className="border-2 border-black px-1 py-1 rounded">Copy</button>}
      </form>
      <div></div>
    </div>

  );
}