import db from "@/lib/db";

export const dynamic = "force-dynamic"; // don't prerender

// Handle PUT request to update the existing URL
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const oldId = params.id;
  let data;
  try {
    data = await request.json();
  } catch (err) {
    return new Response(JSON.stringify({ error: "Invalid JSON input" }), {
      status: 400,
    });
  }

  const existing = await db.link.findUnique({ where: { id: data.newId } });
  if (existing) {
    return new Response(JSON.stringify({ error: "Short code already taken" }), {
      status: 409,
    });
  }

  if (!data.newId) {
    return new Response(JSON.stringify({ error: "Missing URL" }), {
      status: 400,
    });
  }
  try {
    const updatedLink = await db.link.update({
      where: { id: oldId },
      data: { id: data.newId },
    });
    return new Response(JSON.stringify(updatedLink), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: "Failed to update URL" }), {
      status: 500,
    });
  }
}
