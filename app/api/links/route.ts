import db from "@/lib/db";
import { customAlphabet } from "nanoid";

function generateID() {
  const nanoid = customAlphabet(
    "123467890asdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM",
    5
  );
  const id = nanoid();
  return id;
}

export async function POST(request: Request) {
  const data = await request.json();
  if (!data.originalURL) {
    return new Response(JSON.stringify({ error: "Missing URL" }), {
      status: 400,
    });
  }
  console.log(data);
  // Generate unique id
  const id = generateID();
  console.log(id);
  // Put id & url in database
  const link = await db.link.create({
    data: {
      id: id,
      url: data.originalURL,
    },
  });
  console.log(link);
  // send response
  return new Response(JSON.stringify(link), {
    headers: { "Content-Type": "application/json" },
  });
}
