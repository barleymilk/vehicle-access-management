"use client";

import { useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FixedBottomButton } from "@/components/ui/fixed-bottom-button";
import { Vehicle, Driver } from "@/lib/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

type BadgeVariant =
  | "destructive"
  | "default"
  | "secondary"
  | "outline"
  | "success";

interface TagInfo {
  text: string;
  variant: BadgeVariant;
}

interface InfoItem {
  label: string;
  value: string;
  tags?: TagInfo[];
}

// driver.vip_level에 따라 적절한 태그를 반환하는 함수
const getDriverVipLevel = (vipLevel?: string): TagInfo | null => {
  if (!vipLevel) return null;

  const vipLevelMap: Record<string, TagInfo> = {
    VIP1: { text: "VIP1", variant: "destructive" },
    VIP2: { text: "VIP2", variant: "destructive" },
    VIP3: { text: "VIP3", variant: "destructive" },
    직원: { text: "직원", variant: "default" },
    대내기관: { text: "대내기관", variant: "default" },
    외부업체: { text: "외부업체", variant: "success" },
    일반: { text: "일반", variant: "secondary" },
    단체방문: { text: "단체방문", variant: "secondary" },
  };

  return vipLevelMap[vipLevel] || null;
};

const workInfo: InfoItem[] = [
  {
    label: "작업명",
    value: "OO관 전기 설비",
    tags: [
      { text: "예정", variant: "secondary" as BadgeVariant },
      { text: "작업중", variant: "default" as BadgeVariant },
      { text: "완료", variant: "success" as BadgeVariant },
      { text: "중지", variant: "destructive" as BadgeVariant },
    ],
  },
  {
    label: "작업 내용",
    value: "강의실 전기 설비 수리",
  },
  {
    label: "작업 기간",
    value: "2025-06-19 ~ 2025-06-20",
  },
  {
    label: "외부업체명",
    value: "(주)제우스전기",
  },
  {
    label: "담당자명",
    value: "김철수",
    tags: [{ text: "직원", variant: "default" as BadgeVariant }],
  },
  {
    label: "담당자번호",
    value: "010-1234-5678",
  },
  {
    label: "정보 전달",
    value: "true",
    tags: [
      { text: "전달 됨", variant: "default" as BadgeVariant },
      { text: "미전달", variant: "destructive" as BadgeVariant },
    ],
  },
];

export function VehicleInfoCard({
  vehicle,
  drivers,
  onGoToForm,
  onSelectDriver,
}: {
  vehicle: Vehicle | null;
  drivers: Driver[] | null;
  onSelectDriver: (driver: Driver) => void;
  onGoToForm: () => void;
}) {
  const [currentDriverIndex, setCurrentDriverIndex] = useState(0);

  // vehicle이 null인 경우 로딩 상태나 에러 상태를 표시
  if (!vehicle) {
    return (
      <main className="pb-24">
        <div className="flex flex-col gap-4 mt-6">
          <Card className="gap-2">
            <CardContent className="flex items-center justify-center py-8">
              <p className="text-gray-500">차량 정보가 없습니다.</p>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  const vehicleInfo: InfoItem[] = [
    {
      label: "차량번호",
      value: vehicle.plate_number || "정보 없음",
    },
    {
      label: "차량종류",
      value: vehicle.vehicle_type || "정보 없음",
    },
    {
      label: "공용차량",
      value: vehicle.is_public_vehicle ? "공용" : "개인",
    },
    {
      label: "접근기간",
      value: vehicle.access_period || "정보 없음",
    },
    {
      label: "특이사항",
      value: vehicle.note || "정보 없음",
    },
  ];

  // console.log("vehicle:", vehicle);
  // console.log("drivers:", drivers);

  const driver = drivers?.[currentDriverIndex];
  const totalDrivers = drivers?.length || 0;

  const handleSelectDriver = (selectedDriver: Driver) => {
    onSelectDriver(selectedDriver);
  };

  const handlePreviousDriver = () => {
    if (currentDriverIndex > 0) {
      setCurrentDriverIndex(currentDriverIndex - 1);
    }
  };

  const handleNextDriver = () => {
    if (currentDriverIndex < totalDrivers - 1) {
      setCurrentDriverIndex(currentDriverIndex + 1);
    }
  };

  // driver.vip_level에 따른 태그 가져오기
  const driverVipLevel = getDriverVipLevel(driver?.vip_level);

  const driverInfo: InfoItem[] = [
    {
      label: "소유주",
      value: driver?.name || "정보 없음",
      tags: driverVipLevel ? [driverVipLevel] : undefined,
    },
    {
      label: "소속",
      value: driver?.organization || "정보 없음",
    },
    {
      label: "부서",
      value: driver?.department || "정보 없음",
    },
    {
      label: "직급",
      value: driver?.position || "정보 없음",
    },
    {
      label: "연락처",
      value: driver?.phone || "정보 없음",
    },
    {
      label: "활동기간",
      value: driver?.activity_period || "정보 없음",
    },
    {
      label: "담당자명",
      value: driver?.contact_person_name || "정보 없음",
      tags: [{ text: "직원", variant: "default" as BadgeVariant }],
    },
    {
      label: "담당자번호",
      value: driver?.contact_person_phone || "정보 없음",
    },
  ];

  return (
    <>
      <main className="pb-24">
        {/* FREE PASS 차량인 경우 */}
        {vehicle.is_free_pass_enabled && (
          <div className="bg-primary absolute top-15 -mx-6 text-center w-full py-8 h-[13rem] clip-path-polygon">
            <span className="text-3xl text-white font-bold">FREE PASS</span>
          </div>
        )}

        <div
          className={`flex flex-col gap-4 relative z-5 ${vehicle.is_free_pass_enabled ? "mt-24" : "mt-6"}`}
        >
          <Card className="gap-2">
            <CardTitle className="text-center text-lg font-semibold">
              차량 정보
            </CardTitle>
            <CardContent>
              <Table className="borderless">
                <TableBody>
                  {vehicleInfo.map((info) => (
                    <TableRow key={info.label} className="border-0">
                      <TableCell className="font-semibold">
                        {info.label}
                      </TableCell>
                      <TableCell>
                        <div className="bg-white/40 rounded-lg px-3 py-1 flex items-center gap-2">
                          {info.value}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* 소유주 정보 Card with Swipe */}
          <Card className="gap-2">
            <CardTitle className="text-center text-lg font-semibold">
              소유주 정보
              {totalDrivers > 1 && (
                <div className="flex items-center justify-center gap-2 mt-2">
                  <button
                    onClick={handlePreviousDriver}
                    disabled={currentDriverIndex === 0}
                    className="p-1 rounded-full bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-sm text-gray-600">
                    {currentDriverIndex + 1} / {totalDrivers}
                  </span>
                  <button
                    onClick={handleNextDriver}
                    disabled={currentDriverIndex === totalDrivers - 1}
                    className="p-1 rounded-full bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </CardTitle>
            <CardContent>
              <Table className="borderless">
                <TableBody>
                  {driverInfo.map((info) => (
                    <TableRow key={info.label} className="border-0">
                      <TableCell className="font-semibold">
                        {info.label}
                      </TableCell>
                      <TableCell>
                        <div className="bg-white/40 rounded-lg px-3 py-1 flex items-center gap-2">
                          <span>{info.value}</span>
                          {info.tags && (
                            <div className="flex gap-1">
                              {info.tags.map((tag, index) => (
                                <Badge
                                  key={index}
                                  variant={tag.variant}
                                  className="text-xs font-semibold"
                                >
                                  {tag.text}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="gap-2 bg-card">
            <CardTitle className="text-center text-lg font-semibold">
              작업 정보
            </CardTitle>
            <CardContent>
              <Table className="borderless">
                <TableBody>
                  {workInfo.map((info) => (
                    <TableRow key={info.label} className="border-0">
                      <TableCell className="font-semibold">
                        {info.label}
                      </TableCell>
                      <TableCell>
                        <div className="bg-white/40 rounded-lg px-3 py-1 flex items-center gap-2">
                          {info.label !== "정보 전달" && (
                            <span>{info.value}</span>
                          )}
                          {info.tags && (
                            <div className="flex gap-1">
                              {info.tags.map((tag, index) => (
                                <Badge
                                  key={index}
                                  variant={tag.variant}
                                  className="text-xs font-semibold"
                                >
                                  {tag.text}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* 기록하기 버튼 */}
        <FixedBottomButton
          onClick={() => {
            if (driver) {
              handleSelectDriver(driver);
              onGoToForm();
            }
          }}
        >
          기록하기
        </FixedBottomButton>
      </main>
    </>
  );
}
