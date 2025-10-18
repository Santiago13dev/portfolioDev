import { NextResponse } from "next/server";

// Mock auth handlers
export const GET = async () => {
  return NextResponse.json({ user: null, session: null });
};

export const POST = async () => {
  return NextResponse.json({ user: null, session: null });
};
