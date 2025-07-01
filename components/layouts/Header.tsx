"use client";

import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Menu, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  back?: boolean;
  title?: string;
}

function Header({ back = false, title = "차량 번호 검색" }: HeaderProps) {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <header className="bg-background sticky top-0 z-50 border-b">
      <Sheet>
        <div className="flex items-center justify-between px-4 py-3">
          {/* 왼쪽: 메뉴 or 뒤로가기 아이콘 */}
          {back ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              aria-label="뒤로가기"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          ) : (
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
          )}

          {/* 가운데: 페이지 제목 */}
          <h1 className="text-md font-semibold absolute left-1/2 -translate-x-1/2">
            {title}
          </h1>
        </div>

        {/* 사이드 메뉴 */}
        {!back && (
          <SheetContent side="left" className="flex flex-col h-full">
            <div className="flex-1 overflow-auto">
              <SheetHeader>
                <SheetTitle>메뉴</SheetTitle>
                <SheetDescription className="sr-only">
                  메뉴를 고르세요
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 px-6 py-2">
                <SheetClose asChild>
                  <Button
                    className="h-12 font-semibold"
                    onClick={() => handleNavigation("/")}
                  >
                    차량 번호 검색
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    className="h-12 font-semibold"
                    onClick={() => handleNavigation("/access")}
                  >
                    출입 기록 DB
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    className="h-12 font-semibold"
                    onClick={() => handleNavigation("/vehicles")}
                  >
                    차량 DB
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    className="h-12 font-semibold"
                    onClick={() => handleNavigation("/people")}
                  >
                    사람 DB
                  </Button>
                </SheetClose>
              </div>
            </div>
            <SheetFooter className="p-4 border-t">
              <SheetClose asChild>
                <Button variant="outline" className="w-full h-12">
                  닫기
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        )}
      </Sheet>
    </header>
  );
}

export default Header;
