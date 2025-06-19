import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layouts/Header";

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

const vehicleInfo: InfoItem[] = [
  {
    label: "차량번호",
    value: "01가1234",
  },
  {
    label: "차량종류",
    value: "SUV",
  },
  {
    label: "공용차량",
    value: "보안부서",
  },
  {
    label: "접근기간",
    value: "2025-06-19 ~ 2025-06-20",
  },
  {
    label: "특이사항",
    value: "없음",
  },
];

const ownerInfo: InfoItem[] = [
  {
    label: "소유주",
    value: "홍길동",
    tags: [
      { text: "VIP1", variant: "destructive" as BadgeVariant },
      { text: "VIP2", variant: "destructive" as BadgeVariant },
      { text: "VIP3", variant: "destructive" as BadgeVariant },
      { text: "직원", variant: "default" as BadgeVariant },
      { text: "대내기관", variant: "default" as BadgeVariant },
      { text: "외부업체", variant: "success" as BadgeVariant },
      { text: "일반", variant: "secondary" as BadgeVariant },
      { text: "단체방문", variant: "secondary" as BadgeVariant },
    ],
  },
  {
    label: "소속",
    value: "보안부서",
  },
  {
    label: "부서",
    value: "차량담당",
  },
  {
    label: "직급",
    value: "차량담당",
  },
  {
    label: "연락처",
    value: "010-1234-5678",
  },
  {
    label: "활동기간",
    value: "2025-06-19 ~ 2025-06-20",
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
];

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

function searchInfoPage() {
  return (
    <>
      <Header back title="DB 정보" />

      <main className="mx-6 pb-24">
        <div className="bg-primary absolute top-15 -mx-6 text-center w-full py-8 h-[13rem] clip-path-polygon">
          <span className="text-3xl text-white font-bold">FREE PASS</span>
        </div>
        <div className="flex flex-col gap-4 relative z-5 mt-24">
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
          <Card className="gap-2">
            <CardTitle className="text-center text-lg font-semibold">
              소유주 정보
            </CardTitle>
            <CardContent>
              <Table className="borderless">
                <TableBody>
                  {ownerInfo.map((info) => (
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

        {/* 검색 버튼 */}
        <div className="z-10 fixed bottom-0 left-0 right-0 bg-background/20 backdrop-blur-sm">
          <Button className="h-14 my-4 mx-6 w-[calc(100%-3rem)] text-xl font-semibold">
            기록하기
          </Button>
        </div>
      </main>
    </>
  );
}

export default searchInfoPage;
