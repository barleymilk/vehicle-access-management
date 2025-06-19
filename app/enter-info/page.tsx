"use client";

import { useState } from "react";
import Header from "@/components/layouts/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

function EnterInfoPage() {
  const [inputValue, setInputValue] = useState("");
  const [driverAffiliation, setDriverAffiliation] = useState("");
  const [driverNumber, setDriverNumber] = useState("");
  const [companion, setCompanion] = useState("");
  const [visitPurpose, setVisitPurpose] = useState("");
  const [note, setNote] = useState("");

  const handleClear = () => {
    setInputValue("");
  };

  return (
    <>
      <Header back title="정보 입력" />
      <main className="mx-6 pb-24">
        <div className="flex gap-2 mt-10 mb-6">
          <Label
            htmlFor="car-number"
            className="w-22 flex-shrink-0 text-md font-semibold"
          >
            차량번호*
          </Label>
          <Input
            disabled
            type="text"
            id="car-number"
            placeholder="01가1234"
            className="rounded-full"
          />
        </div>
        <div className="flex gap-2 mb-6">
          <Label
            htmlFor="car-type"
            className="w-22 flex-shrink-0 text-md font-semibold"
          >
            차량종류
          </Label>
          <Input
            disabled
            type="text"
            id="car-type"
            placeholder="SUV"
            className="rounded-full"
          />
        </div>
        <div className="flex gap-2 mb-6">
          <Label
            htmlFor="driver-name"
            className="w-22 flex-shrink-0 text-md font-semibold"
          >
            운전자명*
          </Label>
          <div className="relative w-full">
            <Input
              type="text"
              id="driver-name"
              placeholder="이름"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="rounded-full pr-12"
            />
            {inputValue && (
              <Button
                variant="ghost"
                className="absolute right-2 top-0 h-full rounded-full"
                onClick={handleClear}
                tabIndex={-1}
              >
                <X />
              </Button>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 mb-2">
            <Label
              htmlFor="driver-affiliation"
              className="w-22 flex-shrink-0 text-md font-semibold"
            >
              운전자소속
            </Label>
            <div className="relative w-full">
              <Input
                type="text"
                id="driver-affiliation"
                placeholder="소속"
                value={driverAffiliation}
                onChange={(e) => setDriverAffiliation(e.target.value)}
                className="rounded-full pr-12"
              />
              {driverAffiliation && (
                <Button
                  variant="ghost"
                  className="absolute right-2 top-0 h-full rounded-full"
                  onClick={() => setDriverAffiliation("")}
                  tabIndex={-1}
                >
                  <X />
                </Button>
              )}
            </div>
          </div>
          <div className="flex gap-2 mb-2">
            <Label
              htmlFor="driver-number"
              className="w-22 flex-shrink-0 text-md font-semibold"
            >
              운전자번호
            </Label>
            <div className="relative w-full">
              <Input
                type="number"
                id="driver-number"
                placeholder="번호"
                value={driverNumber}
                onChange={(e) => setDriverNumber(e.target.value)}
                className="rounded-full pr-12"
              />
              {driverNumber && (
                <Button
                  variant="ghost"
                  className="absolute right-2 top-0 h-full rounded-full"
                  onClick={() => setDriverNumber("")}
                  tabIndex={-1}
                >
                  <X />
                </Button>
              )}
            </div>
          </div>
          <div className="flex gap-2 mb-2">
            <Label
              htmlFor="companion"
              className="w-22 flex-shrink-0 text-md font-semibold"
            >
              동승자
            </Label>
            <div className="relative w-full">
              <Input
                type="text"
                id="companion"
                placeholder="동승자"
                value={companion}
                onChange={(e) => setCompanion(e.target.value)}
                className="rounded-full pr-12"
              />
              {companion && (
                <Button
                  variant="ghost"
                  className="absolute right-2 top-0 h-full rounded-full"
                  onClick={() => setCompanion("")}
                  tabIndex={-1}
                >
                  <X />
                </Button>
              )}
            </div>
          </div>
          <div className="flex gap-2 mb-2">
            <Label
              htmlFor="purpose"
              className="w-22 flex-shrink-0 text-md font-semibold"
            >
              방문목적
            </Label>
            <div className="relative w-full">
              <Input
                type="text"
                id="purpose"
                placeholder="방문 목적"
                value={visitPurpose}
                onChange={(e) => setVisitPurpose(e.target.value)}
                className="rounded-full pr-12"
              />
              {visitPurpose && (
                <Button
                  variant="ghost"
                  className="absolute right-2 top-0 h-full rounded-full"
                  onClick={() => setVisitPurpose("")}
                  tabIndex={-1}
                >
                  <X />
                </Button>
              )}
            </div>
          </div>
          <div className="flex gap-2 mb-2">
            <Label
              htmlFor="note"
              className="w-22 flex-shrink-0 text-md font-semibold"
            >
              특이사항
            </Label>
            <div className="relative w-full">
              <Input
                type="text"
                id="note"
                placeholder="특이사항"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="rounded-full pr-12"
              />
              {note && (
                <Button
                  variant="ghost"
                  className="absolute right-2 top-0 h-full rounded-full"
                  onClick={() => setNote("")}
                  tabIndex={-1}
                >
                  <X />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* 검색 버튼 */}
        <div className="fixed bottom-0 left-0 right-0 bg-background/20 backdrop-blur-sm">
          <Button
            className="h-14 my-4 mx-6 w-[calc(100%-3rem)] text-xl font-semibold"
            // onClick={() => router.push("/search-info")}
          >
            저장하기
          </Button>
        </div>
      </main>
    </>
  );
}

export default EnterInfoPage;
