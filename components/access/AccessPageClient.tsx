"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layouts/Header";
import { SearchForm, SearchFormData } from "@/components/access/SearchForm";
import { AccessTable } from "@/components/access/AccessTable";
import { createClient } from "@/lib/supabase/client";
import { Pagination } from "@/components/access/Pagination";

interface AccessRecord {
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

export function AccessPageClient() {
  const [data, setData] = useState<AccessRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 20;

  const handleSearch = async (searchData: SearchFormData, page: number = 1) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("Starting search with data:", searchData);

      const supabase = createClient();
      console.log("Supabase client created");

      let query = supabase
        .from("AccessRecords")
        .select("*", { count: "exact" })
        .order("entered_at", { ascending: false, nullsFirst: false })
        .range((page - 1) * itemsPerPage, page * itemsPerPage - 1);

      console.log("Base query created");

      // 검색 조건 적용
      if (searchData.plateNumber) {
        query = query.ilike("raw_plate_number", `%${searchData.plateNumber}%`);
        console.log("Added plate number filter:", searchData.plateNumber);
      }

      if (searchData.vehicleType) {
        query = query.ilike("raw_vehicle_type", `%${searchData.vehicleType}%`);
        console.log("Added vehicle type filter:", searchData.vehicleType);
      }

      if (searchData.driverName) {
        query = query.ilike("raw_person_name", `%${searchData.driverName}%`);
        console.log("Added driver name filter:", searchData.driverName);
      }

      if (searchData.driverCompany) {
        query = query.ilike(
          "driver_organization",
          `%${searchData.driverCompany}%`
        );
        console.log("Added driver company filter:", searchData.driverCompany);
      }

      if (searchData.driverPhoneNumber) {
        const cleanPhoneNumber = searchData.driverPhoneNumber.replace(/-/g, "");
        query = query.or(
          `raw_person_phone.ilike.%${cleanPhoneNumber}%,raw_person_phone.ilike.%${searchData.driverPhoneNumber}%`
        );
        console.log(
          "Added driver phone filter:",
          cleanPhoneNumber,
          "or",
          searchData.driverPhoneNumber
        );
      }

      if (searchData.passengerName) {
        query = query.ilike("passengers", `%${searchData.passengerName}%`);
        console.log("Added passenger name filter:", searchData.passengerName);
      }

      if (searchData.visitPurpose) {
        query = query.ilike("purpose", `%${searchData.visitPurpose}%`);
        console.log("Added visit purpose filter:", searchData.visitPurpose);
      }

      if (searchData.specialNote) {
        query = query.ilike("notes", `%${searchData.specialNote}%`);
        console.log("Added special note filter:", searchData.specialNote);
      }

      if (searchData.accessStartDate) {
        const startDate = new Date(searchData.accessStartDate);
        // 한국 시간대(KST) 기준으로 00:00:00 설정
        startDate.setHours(0, 0, 0, 0);
        // UTC로 변환 (한국 시간 + 9시간)
        const utcStartDate = new Date(startDate.getTime() + 9 * 60 * 60 * 1000);
        query = query.gte("entered_at", utcStartDate.toISOString());
        console.log(
          "Added start date filter (KST):",
          startDate.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }),
          "-> UTC:",
          utcStartDate.toISOString()
        );
      }

      if (searchData.accessEndDate) {
        const endDate = new Date(searchData.accessEndDate);
        // 한국 시간대(KST) 기준으로 23:59:59 설정
        endDate.setHours(23, 59, 59, 999);
        // UTC로 변환 (한국 시간 + 9시간)
        const utcEndDate = new Date(endDate.getTime() + 9 * 60 * 60 * 1000);
        query = query.lte("entered_at", utcEndDate.toISOString());
        console.log(
          "Added end date filter (KST):",
          endDate.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }),
          "-> UTC:",
          utcEndDate.toISOString()
        );
      }

      console.log("Executing query...");
      const { data: result, error, count } = await query;
      console.log("Query result:", { data: result, error, count });

      if (error) {
        console.error("Supabase error details:", {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint,
        });

        // 테이블이 존재하지 않는 경우 임시 데이터 사용
        if (error.code === "42P01") {
          console.log("Table does not exist, using mock data");
          const mockData: AccessRecord[] = [
            {
              id: 1,
              purpose: "업무 방문",
              raw_plate_number: "01가1234",
              raw_vehicle_type: "SUV",
              visitor_tag: "외부업체",
              raw_person_name: "김철수",
              driver_organization: "KT",
              raw_person_phone: "010-1111-2222",
              passengers: "이영희",
              notes: "정문 출입",
              entered_at: "2025-01-15T10:30:00Z",
              exited_at: "2025-01-15T10:30:00Z",
              created_at: "2025-01-15T10:30:00Z",
              updated_at: "2025-01-15T10:30:00Z",
            },
            {
              id: 2,
              purpose: "배송",
              raw_plate_number: "02나5678",
              raw_vehicle_type: "트럭",
              visitor_tag: "외부업체",
              raw_person_name: "박민수",
              driver_organization: "CJ대한통운",
              raw_person_phone: "010-3333-4444",
              passengers: "",
              notes: "화물차 출입",
              entered_at: "2025-01-15T14:20:00Z",
              exited_at: "2025-01-15T14:20:00Z",
              created_at: "2025-01-15T14:20:00Z",
              updated_at: "2025-01-15T14:20:00Z",
            },
            {
              id: 3,
              purpose: "정기 점검",
              raw_plate_number: "03다9012",
              raw_vehicle_type: "승용차",
              visitor_tag: "내부직원",
              raw_person_name: "최영수",
              driver_organization: "내부",
              raw_person_phone: "010-5555-6666",
              passengers: "정수진",
              notes: "정기 점검차량",
              entered_at: "2025-01-15T09:15:00Z",
              exited_at: "2025-01-15T09:15:00Z",
              created_at: "2025-01-15T09:15:00Z",
              updated_at: "2025-01-15T09:15:00Z",
            },
          ];
          setData(mockData);
          setTotalCount(mockData.length);
        } else {
          setError(
            `데이터를 불러오는 중 오류가 발생했습니다: ${error.message}`
          );
          setData([]);
          setTotalCount(0);
        }
      } else {
        console.log("Setting data:", result);
        setData(result || []);
        setTotalCount(count || 0);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      console.error("Error type:", typeof err);
      console.error("Error stringified:", JSON.stringify(err, null, 2));
      setError(
        `예상치 못한 오류가 발생했습니다: ${err instanceof Error ? err.message : String(err)}`
      );
      setData([]);
      setTotalCount(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    handleSearch(
      {
        plateNumber: "",
        vehicleType: "",
        driverName: "",
        driverCompany: "",
        driverPhoneNumber: "",
        passengerName: "",
        visitPurpose: "",
        specialNote: "",
      },
      page
    );
  };

  // 초기 데이터 로드
  useEffect(() => {
    handleSearch({
      plateNumber: "",
      vehicleType: "",
      driverName: "",
      driverCompany: "",
      driverPhoneNumber: "",
      passengerName: "",
      visitPurpose: "",
      specialNote: "",
    });
  }, []);

  return (
    <>
      <Header title="출입 기록 DB" />
      <main className="mx-6 pb-24">
        <SearchForm
          onSearch={(searchData) => {
            setCurrentPage(1);
            handleSearch(searchData, 1);
          }}
          isLoading={isLoading}
        />

        {error ? (
          <div className="mt-8">
            <div className="text-center py-8 text-red-500">{error}</div>
          </div>
        ) : (
          <>
            <AccessTable data={data} isLoading={isLoading} />
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalCount={totalCount}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
                isLoading={isLoading}
              />
            </div>
          </>
        )}
      </main>
    </>
  );
}
