"use client";

import { useState } from "react";
import { Keypad } from "@/app/_components/Keypad";
import { VehicleSelector } from "@/app/_components/VehicleSelector";
import { VehicleInfoCard } from "@/app/_components/VehicleInfoCard";
import { AccessRecordForm } from "@/app/_components/AccessRecordForm";
import Header from "@/components/layouts/Header";
import { Driver, Vehicle } from "@/lib/types";

// 차량번호 검색 -> 해당하는 차량 데이터 배열
async function searchVehicles(plateNumber: string) {
  const res = await fetch("/api/search-vehicles", {
    method: "POST",
    body: JSON.stringify({ plate_number: plateNumber }),
    headers: { "Content-Type": "application/json" },
  });
  const { data } = await res.json();
  return data || [];
}

// 선택한 차량 하나의 데이터
async function searchVehicle(vehicleId: string) {
  const res = await fetch("/api/search-vehicle", {
    method: "POST",
    body: JSON.stringify({ vehicle_id: vehicleId }),
    headers: { "Content-Type": "application/json" },
  });
  const { data } = await res.json();
  return data || [];
}

// 선택한 차량의 운전자 데이터 배열
async function searchDrivers(vehicleId: string) {
  const res = await fetch("/api/search-drivers", {
    method: "POST",
    body: JSON.stringify({ vehicle_id: vehicleId }),
    headers: { "Content-Type": "application/json" },
  });
  const { data } = await res.json();
  return data || [];
}

export default function Home() {
  const [mode, setMode] = useState("keypad"); // 'keypad' | 'selector' | 'info' | 'form'
  const [vehicleResults, setVehicleResults] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedDriverArray, setSelectedDriverArray] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  // 1. 차량번호 검색 -> 차량 데이터 배열
  const handleSearch = async (plateNumber: string) => {
    const results = await searchVehicles(plateNumber);
    setVehicleResults(results);
    setSelectedVehicle(null);

    if (results.length > 1)
      setMode("selector"); // 차량 데이터 배열 길이가 1개 이상이면 차량 선택 모드
    else if (results.length === 1) {
      setMode("info"); // 차량 데이터 배열 길이가 1개 이면 차량 정보 모드
      setSelectedVehicle(results[0]);
      const driverData = await searchDrivers(results[0].id);
      setSelectedDriverArray(driverData);
    } else setMode("form"); // 차량 데이터 배열 길이가 0개 이면 차량 등록 모드
  };

  // 2. 차량 데이터 하나 선택
  const handleSelectVehicle = async (vehicle: Vehicle) => {
    const vehicleData = await searchVehicle(vehicle.id);
    const selectedVehicleData = vehicleData[0];
    setSelectedVehicle(selectedVehicleData); // 차량 정보 조회 후 첫 번째 차량 선택

    // 차량 정보를 가져온 후 해당 차량의 운전자 정보도 함께 가져오기
    if (selectedVehicleData) {
      const driverData = await searchDrivers(selectedVehicleData.id);
      setSelectedDriverArray(driverData);
    }

    setMode("info"); // 차량 정보 모드
  };

  // 3. 출입 기록 (form) 컴포넌트로 이동
  const handleGoToForm = () => {
    setMode("form");
  };

  // "다시 검색"을 어느 컴포넌트에서나 할 수 있게 콜백 넘겨줌
  const handleGoBackToKeypad = () => {
    setMode("keypad");
    setVehicleResults([]);
    setSelectedVehicle(null);
    setSelectedDriverArray(null);
  };

  const handleSelectDriver = (driver: Driver) => {
    setSelectedDriver(driver);
  };

  return (
    <>
      <Header />
      <main className="mx-6 pb-24">
        {mode === "keypad" && <Keypad onSearch={handleSearch} />}

        {mode === "selector" && (
          <VehicleSelector
            vehicles={vehicleResults}
            onSelect={handleSelectVehicle}
            onGoBack={handleGoBackToKeypad}
          />
        )}

        {mode === "info" && (
          <>
            <VehicleInfoCard
              vehicle={selectedVehicle}
              drivers={selectedDriverArray}
              onSelectDriver={handleSelectDriver}
              onGoToForm={handleGoToForm}
            />
          </>
        )}

        {mode === "form" && (
          <AccessRecordForm
            vehicle={selectedVehicle}
            driver={selectedDriver}
            onGoBack={handleGoBackToKeypad}
          />
        )}
      </main>
    </>
  );
}
