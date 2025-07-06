import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const { plate_number } = await req.json();
  const supabase = await createClient();

  let query = supabase
    .from("Vehicles")
    .select("*")
    .order("plate_number", { ascending: false });

  if (plate_number) {
    query = query.ilike("plate_number", `%${plate_number}%`);
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data });
}
