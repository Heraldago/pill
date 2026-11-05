import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const CONTENT_PATH = path.join(process.cwd(), "data", "live-content.json");
const DEFAULT_PATH = path.join(process.cwd(), "data", "live-content.default.json");

export async function POST() {
  try {
    const raw = await fs.readFile(DEFAULT_PATH, "utf-8");
    await fs.writeFile(CONTENT_PATH, raw, "utf-8");
    const data = JSON.parse(raw);
    return NextResponse.json({
      success: true,
      message: "Contenuti ripristinati ai valori di fabbrica",
      data,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Errore durante il ripristino: " + (error as Error).message },
      { status: 500 }
    );
  }
}
