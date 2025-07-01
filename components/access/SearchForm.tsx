"use client";

import { useState } from "react";
import { ClearableInput } from "@/components/ui/clearable-input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronUp, ChevronDown, ChevronDownIcon } from "lucide-react";

export interface SearchFormData {
  plateNumber: string;
  vehicleType: string;
  driverName: string;
  driverCompany: string;
  driverPhoneNumber: string;
  passengerName: string;
  visitPurpose: string;
  specialNote: string;
  accessStartDate?: Date;
  accessEndDate?: Date;
}

interface SearchFormProps {
  onSearch: (data: SearchFormData) => void;
  isLoading?: boolean;
}

export function SearchForm({ onSearch, isLoading = false }: SearchFormProps) {
  const [plateNumber, setPlateNumber] = useState("");
  const [driverName, setDriverName] = useState("");
  const [driverPhoneNumber, setDriverPhoneNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [driverCompany, setDriverCompany] = useState("");
  const [passengerName, setPassengerName] = useState("");
  const [visitPurpose, setVisitPurpose] = useState("");
  const [specialNote, setSpecialNote] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(true);
  const [accessStartDate, setAccessStartDate] = useState<Date | undefined>(
    undefined
  );
  const [accessEndDate, setAccessEndDate] = useState<Date | undefined>(
    undefined
  );
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);

  const toggleSearchExpanded = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  const handleSearch = () => {
    onSearch({
      plateNumber,
      vehicleType,
      driverName,
      driverCompany,
      driverPhoneNumber,
      passengerName,
      visitPurpose,
      specialNote,
      accessStartDate,
      accessEndDate,
    });
  };

  return (
    <div className="rounded-b-[2.5rem] flex flex-col bg-background -mx-6 shadow-xl shadow-gray-300/50">
      <div className="mx-6 mb-3">
        {isSearchExpanded && (
          <>
            <div className="max-h-[28vh] overflow-y-auto mt-8">
              <ClearableInput
                id="plate-number"
                label="차량번호"
                placeholder="01가1234 (혹은 기타)"
                value={plateNumber}
                onChange={setPlateNumber}
              />
              <ClearableInput
                id="vehicle-type"
                label="차량종류"
                placeholder="SUV"
                value={vehicleType}
                onChange={setVehicleType}
              />
              <ClearableInput
                id="driver-name"
                label="운전자명"
                value={driverName}
                onChange={setDriverName}
              />
              <ClearableInput
                id="driver-company"
                label="운전자소속"
                value={driverCompany}
                onChange={setDriverCompany}
              />
              <ClearableInput
                id="driver-phone-number"
                label="운전자번호"
                placeholder="01011112222 (숫자만 입력)"
                type="number"
                value={driverPhoneNumber}
                onChange={setDriverPhoneNumber}
              />
              <ClearableInput
                id="passenger-name"
                label="동승자"
                placeholder="김철수"
                value={passengerName}
                onChange={setPassengerName}
              />
              <ClearableInput
                id="visit-purpose"
                label="방문목적"
                value={visitPurpose}
                onChange={setVisitPurpose}
              />
              <ClearableInput
                id="special-note"
                label="특이사항"
                value={specialNote}
                onChange={setSpecialNote}
              />
              <div className="flex flex-row gap-3">
                <div className="flex flex-col gap-3 flex-1">
                  <Label htmlFor="date" className="px-1 text-sm">
                    출입 시작일
                  </Label>
                  <Popover open={openStartDate} onOpenChange={setOpenStartDate}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date"
                        className="w-full justify-between font-normal"
                      >
                        {accessStartDate
                          ? accessStartDate.toLocaleDateString()
                          : "날짜 선택"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={accessStartDate}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          if (!date) {
                            setAccessStartDate(undefined);
                            setAccessEndDate(undefined);
                          } else if (
                            date &&
                            accessStartDate &&
                            date.getTime() === accessStartDate.getTime()
                          ) {
                            setAccessStartDate(undefined);
                            setAccessEndDate(undefined);
                          } else {
                            setAccessStartDate(date);
                            if (date && !accessEndDate) {
                              setAccessEndDate(date);
                            }
                            if (date && accessEndDate && date > accessEndDate) {
                              setAccessEndDate(date);
                            }
                          }
                          setOpenStartDate(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex flex-col gap-3 flex-1">
                  <Label htmlFor="date" className="px-1 text-sm">
                    출입 종료일
                  </Label>
                  <Popover open={openEndDate} onOpenChange={setOpenEndDate}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date"
                        className="w-full justify-between font-normal"
                      >
                        {accessEndDate
                          ? accessEndDate.toLocaleDateString()
                          : "날짜 선택"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={accessEndDate}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          if (!date) {
                            setAccessStartDate(undefined);
                            setAccessEndDate(undefined);
                          } else if (
                            date &&
                            accessEndDate &&
                            date.getTime() === accessEndDate.getTime()
                          ) {
                            setAccessStartDate(undefined);
                            setAccessEndDate(undefined);
                          } else {
                            setAccessEndDate(date);
                            if (date && !accessStartDate) {
                              setAccessStartDate(date);
                            }
                            if (
                              date &&
                              accessStartDate &&
                              date < accessStartDate
                            ) {
                              setAccessStartDate(date);
                            }
                          }
                          setOpenEndDate(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            <Button
              className="w-full mt-4 h-12 font-semibold text-md"
              onClick={handleSearch}
              disabled={isLoading}
            >
              {isLoading ? "검색 중..." : "DB 검색"}
            </Button>
          </>
        )}
        <Button
          variant="ghost"
          className="w-full mt-3"
          onClick={toggleSearchExpanded}
        >
          {isSearchExpanded ? (
            <ChevronUp strokeWidth={1.5} className="scale-300 text-gray-300" />
          ) : (
            <ChevronDown
              strokeWidth={1.5}
              className="scale-300 text-gray-300"
            />
          )}
        </Button>
      </div>
    </div>
  );
}
