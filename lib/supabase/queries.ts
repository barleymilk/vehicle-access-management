import { createClient } from "./server";

export interface AccessRecord {
  id: number;
  purpose: string;
  raw_plate_number: string;
  raw_vehicle_type: string;
  visitor_tag: string;
  raw_person_name: string;
  driver_organization: string;
  raw_person_phone: string;
  passengers: string;
  notes: string;
  entered_at: string;
  exited_at: string;
  created_at: string;
  updated_at: string;
}

export interface SearchParams {
  plateNumber?: string;
  vehicleType?: string;
  driverName?: string;
  driverCompany?: string;
  driverPhoneNumber?: string;
  passengerName?: string;
  visitPurpose?: string;
  specialNote?: string;
  accessStartDate?: Date;
  accessEndDate?: Date;
}

export async function getAccessRecords(
  params: SearchParams = {}
): Promise<AccessRecord[]> {
  const supabase = await createClient();

  let query = supabase
    .from("AccessRecords")
    .select("*")
    .order("entered_at", { ascending: false });

  // 검색 조건 적용
  if (params.plateNumber) {
    query = query.ilike("raw_plate_number", `%${params.plateNumber}%`);
  }

  if (params.vehicleType) {
    query = query.ilike("raw_vehicle_type", `%${params.vehicleType}%`);
  }

  if (params.driverName) {
    query = query.ilike("raw_person_name", `%${params.driverName}%`);
  }

  if (params.driverCompany) {
    query = query.ilike("driver_organization", `%${params.driverCompany}%`);
  }

  if (params.driverPhoneNumber) {
    query = query.ilike("raw_person_phone", `%${params.driverPhoneNumber}%`);
  }

  if (params.passengerName) {
    query = query.ilike("passengers", `%${params.passengerName}%`);
  }

  if (params.visitPurpose) {
    query = query.ilike("purpose", `%${params.visitPurpose}%`);
  }

  if (params.specialNote) {
    query = query.ilike("notes", `%${params.specialNote}%`);
  }

  if (params.accessStartDate) {
    query = query.gte("entered_at", params.accessStartDate.toISOString());
  }

  if (params.accessEndDate) {
    // 종료일은 해당 날짜의 마지막 시간까지 포함
    const endDate = new Date(params.accessEndDate);
    endDate.setHours(23, 59, 59, 999);
    query = query.lte("entered_at", endDate.toISOString());
  }

  const { data, error } = await query;

  if (error) {
    // console.error("Error fetching access records:", error);
    throw new Error("Failed to fetch access records");
  }

  return data || [];
}
