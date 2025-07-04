import { NextRequest, NextResponse } from "next/server";
import { addInventoryItem } from "@/lib/data";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log('Debug - Bulk upload received data:', data);
    
    // Basic validation
    if (!data.name || !data.quantity || !data.price || !data.fabric || !data.color || !data.size) {
      console.log('Debug - Validation failed:', { name: !!data.name, quantity: !!data.quantity, price: !!data.price, fabric: !!data.fabric, color: !!data.color, size: !!data.size });
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    
    const result = await addInventoryItem({
      name: data.name,
      quantity: Number(data.quantity),
      price: Number(data.price),
      fabric: data.fabric,
      color: data.color,
      size: data.size,
    });
    
    console.log('Debug - Item added successfully:', result);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('Debug - Error in bulk upload:', e);
    return NextResponse.json({ error: "Failed to add item" }, { status: 500 });
  }
} 