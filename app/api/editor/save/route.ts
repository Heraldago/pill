import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const CONTENT_PATH = path.join(process.cwd(), "data", "live-content.json");

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    if (!payload || typeof payload !== "object") {
      return NextResponse.json({ error: "Payload non valido" }, { status: 400 });
    }

    await fs.writeFile(CONTENT_PATH, JSON.stringify(payload, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      message: "Contenuto salvato con successo!",
      timestamp: Date.now(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Errore durante il salvataggio: " + (error as Error).message },
      { status: 500 }
    );
  }
}
