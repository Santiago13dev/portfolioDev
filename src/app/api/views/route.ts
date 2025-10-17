import { NextResponse } from "next/server";

export const cache = "no-cache"
export const revalidate = 0

// TEMPORALMENTE DESHABILITADO - Credenciales de Umami no configuradas
export async function GET() {
    // Retornar datos mock mientras tanto
    return NextResponse.json({ 
        success: true, 
        data: {
            pageviews: { value: 0 },
            visitors: { value: 0 },
            visits: { value: 0 },
            bounces: { value: 0 },
            totaltime: { value: 0 }
        }
    });
}
