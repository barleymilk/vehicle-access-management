"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Delete } from "lucide-react";
import { useState } from "react";

export function Keypad() {
  const [inputValue, setInputValue] = useState("");

  const handleNumberClick = (num: number) => {
    // 입력값이 4자리 미만일 때만 추가
    if (inputValue.length < 4) {
      setInputValue((prev) => prev + num);
    }
  };

  const handleDelete = () => {
    setInputValue((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setInputValue("");
  };

  return (
    <>
      <div className="flex flex-col mx-6">
        {/* 차량 번호 입력 Input 상자 */}
        <div className="flex gap-4">
          <div className="relative w-full">
            <Input
              type="text"
              value={inputValue}
              placeholder="차량 번호 입력"
              className="my-8 h-12 rounded-full pr-12 pl-5"
              readOnly
            />
            <Button
              variant="ghost"
              className="absolute right-2 top-0 my-8 h-12 rounded-full"
              onClick={handleClear}
            >
              <X />
            </Button>
          </div>
        </div>

        {/* 숫자 키패드 */}
        <div className="grid grid-cols-3 gap-4 my-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <Button
              key={num}
              className="h-14 text-2xl transition-colors active:bg-primary/90 active:scale-95"
              onClick={() => handleNumberClick(num)}
            >
              {num}
            </Button>
          ))}
          <Button variant="ghost" className="h-14" />
          <Button
            className="h-14 text-2xl transition-colors active:bg-primary/90 active:scale-95"
            onClick={() => handleNumberClick(0)}
          >
            0
          </Button>
          <Button
            className="h-14 text-2xl transition-colors active:bg-primary/90 active:scale-95"
            onClick={handleDelete}
          >
            <Delete strokeWidth={1.5} className="scale-190" />
          </Button>
        </div>
      </div>

      {/* 검색 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-background p-4">
        <Button className="w-full mx-auto h-14 text-xl font-semibold">
          검색하기
        </Button>
      </div>
    </>
  );
}
