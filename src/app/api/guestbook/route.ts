import { NextResponse } from "next/server";

// TEMPORALMENTE DESHABILITADO - Problema de conectividad con Supabase
// Una vez resuelto el problema de red, restaurar el código original

// List all guestbook entries
export async function GET() {
    return NextResponse.json({ 
        success: true, 
        data: [], 
        message: "Guestbook temporalmente deshabilitado" 
    });
}

// Add a new entry
export async function POST(req: Request) {
    return NextResponse.json({ 
        success: false, 
        message: "Guestbook temporalmente deshabilitado" 
    }, { status: 503 });
}

// Remove an entry
export async function DELETE(req: Request) {
    return NextResponse.json({ 
        success: false, 
        message: "Guestbook temporalmente deshabilitado" 
    }, { status: 503 });
}
