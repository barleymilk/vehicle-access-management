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
import { Menu } from "lucide-react";

function Header() {
  return (
    <header className="bg-background sticky top-0 z-50 border-b">
      <Sheet>
        <div className="flex items-center justify-between px-4 py-3">
          {/* 왼쪽: 메뉴 아이콘 */}
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>

          {/* 가운데: 페이지 제목 */}
          <h1 className="text-md font-semibold absolute left-1/2 -translate-x-1/2">
            차량 번호 검색
          </h1>
        </div>

        {/* 사이드 메뉴 */}
        <SheetContent side="left" className="flex flex-col h-full">
          <div className="flex-1 overflow-auto">
            <SheetHeader>
              <SheetTitle>메뉴</SheetTitle>
              <SheetDescription className="sr-only">
                메뉴를 고르세요
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-6 px-6 py-2">
              <Button className="font-semibold">출입 기록 DB</Button>
              <Button className="font-semibold">차량 DB</Button>
              <Button className="font-semibold">사람 DB</Button>
            </div>
          </div>
          <SheetFooter className="p-4 border-t">
            <SheetClose asChild>
              <Button variant="outline" className="w-full">
                닫기
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </header>
  );
}

export default Header;
