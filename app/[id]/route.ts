import db from "@/lib/db";

export const dynamic = "force-dynamic"; // don't prerender

// Redirect shortened URL to original URL
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  console.log("This is the id: ", id);

  const link = await db.link.findUnique({
    where: { id },
  });

  if (!link) {
    console.log("No URL found for ID:", id); // Log if no URL is found
    return new Response(JSON.stringify({ error: "URL not found" }), {
      status: 404,
    });
  }

  // Redirect to the original URL
  console.log("Retrieved URL for ID:", id, "URL:", link.url);
  return new Response(null, {
    headers: { Location: link.url },
    status: 301,
  });
}
