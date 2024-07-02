"use client";

import { url } from "inspector";
import { useState } from "react";

export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const [shortenedURL, setShortenedURL] = useState<string | null>(null);

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

  return (
    <div className="p-4 space-y-4">
      <center>URL Shortener</center>
      {error && <p>error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="url">Enter URL to shorten: </label>
          <input type="text" name="url" id="url" className="form-controls border-2 border-black" />
        </div>
        <button type="submit" className="border-2 border-black px-1 py-1 rounded">Shorten</button>
        {shortenedURL && <p>New URL: http://localhost:3000/{shortenedURL}</p>}
      </form>
    </div>
  );
}
