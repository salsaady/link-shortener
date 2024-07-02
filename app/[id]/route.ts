import db from "@/lib/db";
import { customAlphabet } from "nanoid";

// Redirect shortened URL to original URL
export async function GET(request: Request, { params }: { params: { id: string } }) {
    //extract id from the request parameters
    const id = params.id;
    console.log("This is the id: ", id)
    //queries database to find original URL corresponding to id
    const link = await db.link.findUnique({
        where: { id },
    });

    if (!link) {
        return new Response(JSON.stringify({ error: "URL not found" }), {
            status: 404,
        });
    }
    // Redirect user to original URL
    return Response.redirect(link.url, 301);
}
