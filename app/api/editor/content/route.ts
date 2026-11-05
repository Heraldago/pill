import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const CONTENT_PATH = path.join(process.cwd(), "data", "live-content.json");
const DEFAULT_PATH = path.join(process.cwd(), "data", "live-content.default.json");

export async function GET() {
  try {
    let raw: string;
    try {
      raw = await fs.readFile(CONTENT_PATH, "utf-8");
    } catch {
      raw = await fs.readFile(DEFAULT_PATH, "utf-8");
    }
    const data = JSON.parse(raw);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Impossibile caricare i contenuti: " + (error as Error).message },
      { status: 500 }
    );
  }
}
