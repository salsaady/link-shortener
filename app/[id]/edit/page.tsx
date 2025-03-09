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
    <div className="min-h-screen bg-gradient-to-r from-green-200 to-blue-200 flex items-center justify-center p-4">
      <div className="bg-white rounded shadow p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Customize Your Shortened URL
        </h1>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="url" className="block font-medium mb-1">
              Edit your URL: http://localhost:3000/
            </label>
            <input
              type="text"
              id="url"
              value={newId}
              onChange={(e) => setNewId(e.target.value)}
              placeholder="myCustomShortLink"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Save
          </button>
        </form>

        {/* Display the newly updated URL */}
        {customizedURL && (
          <div className="mt-6 text-center">
            <p className="mb-2">
              <span className="font-semibold">New URL:</span>{" "}
              <a
                href={customizedURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {customizedURL}
              </a>
            </p>
            <button
              type="button"
              onClick={copyToClipboard}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Copy
            </button>
          </div>
        )}
      </div>
    </div>
  );
}