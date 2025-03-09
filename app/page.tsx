"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import the router for navigation

export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const [shortenedURL, setShortenedURL] = useState<string | null>(null);
  const router = useRouter(); // Initialize the router

  async function makeCall(url: string) {
    const data = {
      originalURL: url,
    };
    const str = JSON.stringify(data);
    const res = await fetch("http://localhost:3000/api/links", {
      method: "POST",
      body: str,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const data = await res.json();
      const { error } = data;
      setError(error);
      return;
    }

    setError(null);
    const newLink = await res.json();
    console.log(newLink);
    setShortenedURL(newLink.id)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const url = formData.get("url") as string;
    makeCall(url);
  }


  function copyToClipboard() {
    if (shortenedURL) {
      const newURL = `http://localhost:3000/${shortenedURL}`;
      console.log("i clicked copy and this is my new url ",{shortenedURL})
      navigator.clipboard.writeText(newURL)
    }
  }

function navigateToEdit() {
    console.log("customize button was  clicked")
      router.push(`./${shortenedURL}/edit`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-200 flex items-center justify-center p-4">
      <div className="bg-white rounded shadow p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          URL Shortener
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
              Enter URL to shorten:
            </label>
            <input
              type="text"
              name="url"
              id="url"
              placeholder="https://example.com"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Shorten
          </button>
        </form>

        {/* Display the new short URL and buttons */}
        {shortenedURL && (
          <div className="mt-6 text-center">
            <p className="mb-2">
              <span className="font-semibold">New URL:</span>{" "}
              <a
                href={`http://localhost:3000/${shortenedURL}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                http://localhost:3000/{shortenedURL}
              </a>
            </p>
            <div className="flex justify-center space-x-2">
              <button
                type="button"
                onClick={copyToClipboard}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Copy
              </button>
              <button
                type="button"
                onClick={navigateToEdit}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
              >
                Customize
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}