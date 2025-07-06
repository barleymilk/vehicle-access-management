import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const {
      vehicle_id,
      person_id,
      work_id,
      raw_plate_number,
      raw_vehicle_type,
      raw_person_name,
      raw_person_phone,
      driver_organization,
      passengers,
      purpose,
      notes,
      is_free_pass = false,
    } = await req.json();

    // 필수 필드 검증
    if (!raw_plate_number) {
      return NextResponse.json(
        { error: "차량번호는 필수입니다" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // 현재 시간을 한국 시간으로 설정
    const now = new Date();
    const koreaTime = new Date(now.getTime() + 9 * 60 * 60 * 1000);
    const entered_at = koreaTime.toISOString();

    const { data, error } = await supabase
      .from("AccessRecords")
      .insert({
        vehicle_id,
        person_id,
        work_id,
        raw_plate_number,
        raw_vehicle_type,
        raw_person_name,
        raw_person_phone,
        driver_organization,
        passengers,
        purpose,
        notes,
        is_free_pass,
        entered_at,
        exited_at: null, // 퇴장 시간은 나중에 업데이트
      })
      .select()
      .single();

    if (error) {
      // console.error("Error inserting access record:", error);
      return NextResponse.json(
        { error: "출입 기록 저장 중 오류가 발생했습니다" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
      message: "출입 기록이 성공적으로 저장되었습니다",
    });
  } catch {
    // console.error("API Error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
