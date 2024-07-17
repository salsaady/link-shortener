"use client";

import { useState } from "react";
import { useRouter } from "next/router"; // Import the router for navigation

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
        setShortenedURL(newLink.id);
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
            navigator.clipboard.writeText(newURL).then(() => {
                console.log('URL copied to clipboard');
            }).catch((err) => {
                console.error('Could not copy text: ', err);
            });
        }
    }

    function navigateToEdit() {
        if (shortenedURL) {
            router.push(`/edit/${shortenedURL}`);
        }
    }

    return (
        <div className="p-4 space-y-4">
            <center>URL Shortener</center>
            {error && <p>error: {error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="url">Enter URL to shorten: </label>
                    <input type="text" name="url" id="url" className="form-controls border-2 border-black" style={{ width: "100%", height: "40px", padding: "10px", fontSize: "16px" }} />
                </div>
                <button type="submit" className="border-2 border-black px-1 py-1 rounded">Shorten</button>
                {shortenedURL && <p>New URL: http://localhost:3000/{shortenedURL}</p>}
                {shortenedURL && <button type="button" onClick={copyToClipboard} className="border-2 border-black px-1 py-1 rounded">Copy</button>}
                {shortenedURL && <button type="button" onClick={navigateToEdit} className="border-2 border-black px-1 py-1 rounded">Customize</button>}
            </form>
        </div>
    );
}
