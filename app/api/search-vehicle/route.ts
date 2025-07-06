import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const { vehicle_id } = await req.json();
  const supabase = await createClient();

  let query = supabase
    .from("Vehicles")
    .select("*")
    .order("id", { ascending: false });

  if (vehicle_id) {
    query = query.eq("id", vehicle_id);
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data });
}
