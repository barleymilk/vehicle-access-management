import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const { vehicle_id } = await req.json();

    if (!vehicle_id) {
      return NextResponse.json(
        { error: "vehicle_id is required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase.rpc("get_people_by_vehicle", {
      p_vehicle_id: vehicle_id,
    });

    if (error) {
      // console.error("Error fetching people:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch {
    // console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
