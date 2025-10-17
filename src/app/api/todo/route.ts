import { NextResponse } from "next/server";

// Datos mock para desarrollo sin DB
const mockTodos = [
  { id: "1", text: "Terminar portafolio", done: false, createdAt: new Date() },
  { id: "2", text: "Deployar a Vercel", done: true, createdAt: new Date() },
];

export async function GET() {
  try {
    return NextResponse.json({ success: true, data: mockTodos });
  } catch (error) {
    console.error("Error fetching todos:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}

export async function POST() {
  return NextResponse.json(
    { success: false, message: "Database not configured" },
    { status: 503 }
  );
}

export async function PATCH() {
  return NextResponse.json(
    { success: false, message: "Database not configured" },
    { status: 503 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { success: false, message: "Database not configured" },
    { status: 503 }
  );
}
