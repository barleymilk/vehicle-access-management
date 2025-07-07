import { useState, useMemo } from "react";
import { Driver, Vehicle } from "@/lib/types";
import { ClearableInput } from "@/components/ui/clearable-input";
import { DisabledInput } from "@/components/ui/disabled-input";
import { FixedBottomButton } from "@/components/ui/fixed-bottom-button";

export const AccessRecordForm = ({
  vehicle,
  driver,
  onGoBack,
}: {
  vehicle: Vehicle | null;
  driver: Driver | null;
  onGoBack: () => void;
}) => {
  const plateNumber = vehicle?.plate_number || "";
  const carType = vehicle?.vehicle_type || "";
  const [driverName, setDriverName] = useState(driver?.name || "");
  const [driverAffiliation, setDriverAffiliation] = useState(
    driver?.org_dept_pos || ""
  );
  const [driverNumber, setDriverNumber] = useState(driver?.phone || "");
  const [companion, setCompanion] = useState("");
  const [visitPurpose, setVisitPurpose] = useState("");
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 차량 정보 그룹: plate_number 또는 vehicle_type 중 하나라도 값이 있으면 true
  const hasVehicleInfo = useMemo(() => {
    return (
      (vehicle?.plate_number || "").trim() ||
      (vehicle?.vehicle_type || "").trim()
    );
  }, []);

  // 운전자 정보 그룹: driverName, driverAffiliation, driverNumber 중 하나라도 값이 있으면 true
  const hasDriverInfo = useMemo(() => {
    return (
      (driver?.name || "").trim() ||
      (driver?.org_dept_pos || "").trim() ||
      (driver?.phone || "").trim()
    );
  }, []);

  const handleSave = async () => {
    // 필수 필드 검증
    if (!plateNumber.trim()) {
      alert("차량번호를 입력해주세요.");
      return;
    }

    if (!driverName.trim()) {
      alert("운전자명을 입력해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/access-records", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vehicle_id: vehicle?.id || null,
          person_id: driver?.id || null,
          work_id: null, // 작업 정보는 나중에 추가
          raw_plate_number: plateNumber.trim(),
          raw_vehicle_type: carType.trim(),
          raw_person_name: driverName.trim(),
          raw_person_phone: driverNumber.trim(),
          driver_organization: driverAffiliation.trim(),
          passengers: companion.trim(),
          purpose: visitPurpose.trim(),
          notes: note.trim(),
          is_free_pass: vehicle?.is_free_pass_enabled || false,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "저장 중 오류가 발생했습니다.");
      }

      alert("출입 기록이 성공적으로 저장되었습니다.");
      onGoBack(); // 저장 후 키패드로 돌아가기
    } catch (error) {
      // console.error("저장 오류:", error);
      alert(
        error instanceof Error ? error.message : "저장 중 오류가 발생했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <main>
        <div className="mt-10">
          {hasVehicleInfo ? (
            <>
              <DisabledInput
                id="car-number"
                label="차량번호"
                placeholder="01가1234 or 기타 or 도보"
                value={plateNumber}
                required
              />
              <DisabledInput
                id="car-type"
                label="차량종류"
                placeholder="SUV"
                value={carType}
              />
            </>
          ) : (
            <>
              <ClearableInput
                id="car-number"
                label="차량번호"
                placeholder="01가1234 or 기타 or 도보"
                value={plateNumber}
                onChange={() => {
                  // 차량번호는 props로 받아오는 값이므로 수정 불가
                }}
                required
              />
              <ClearableInput
                id="car-type"
                label="차량종류"
                placeholder="SUV"
                value={carType}
                onChange={() => {
                  // 차량종류는 props로 받아오는 값이므로 수정 불가
                }}
              />
            </>
          )}
        </div>
        <div className="flex flex-col">
          {hasDriverInfo ? (
            <>
              <DisabledInput
                id="driver-name"
                label="운전자명"
                placeholder="이름"
                value={driverName}
                required
              />
              <DisabledInput
                id="driver-affiliation"
                label="운전자소속"
                placeholder="소속"
                value={driverAffiliation}
              />
              <DisabledInput
                id="driver-number"
                label="운전자번호"
                placeholder="번호"
                value={driverNumber}
              />
            </>
          ) : (
            <>
              <ClearableInput
                id="driver-name"
                label="운전자명"
                placeholder="이름"
                value={driverName}
                onChange={setDriverName}
                required
              />
              <ClearableInput
                id="driver-affiliation"
                label="운전자소속"
                placeholder="소속"
                value={driverAffiliation}
                onChange={setDriverAffiliation}
              />
              <ClearableInput
                id="driver-number"
                label="운전자번호"
                placeholder="번호"
                value={driverNumber}
                onChange={setDriverNumber}
                type="number"
              />
            </>
          )}

          <ClearableInput
            id="companion"
            label="동승자"
            placeholder="동승자"
            value={companion}
            onChange={setCompanion}
          />

          <ClearableInput
            id="purpose"
            label="방문목적"
            placeholder="방문 목적"
            value={visitPurpose}
            onChange={setVisitPurpose}
          />

          <ClearableInput
            id="note"
            label="특이사항"
            placeholder="특이사항"
            value={note}
            onChange={setNote}
          />
        </div>

        <FixedBottomButton onClick={handleSave} disabled={isLoading}>
          {isLoading ? "저장 중..." : "저장하기"}
        </FixedBottomButton>
      </main>
    </>
  );
};
