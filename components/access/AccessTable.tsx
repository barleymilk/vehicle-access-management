import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AccessRecord } from "@/lib/supabase/queries";
import { formatPhone } from "@/lib/utils";

interface AccessTableProps {
  data: AccessRecord[];
  isLoading?: boolean;
}

export function AccessTable({ data, isLoading = false }: AccessTableProps) {
  if (isLoading) {
    return (
      <div className="mt-8">
        <div className="text-center py-8 text-gray-500">검색 중...</div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="mt-8">
        <div className="text-center py-8 text-gray-500">
          검색 결과가 없습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-200">
            <TableHead className="rounded-tl-lg">입장일시</TableHead>
            <TableHead>퇴장일시</TableHead>
            <TableHead>방문목적</TableHead>
            <TableHead className="w-[100px]">차량번호</TableHead>
            <TableHead>차량종류</TableHead>
            <TableHead>방문자구분</TableHead>
            <TableHead>운전자명</TableHead>
            <TableHead>운전자소속</TableHead>
            <TableHead>운전자번호</TableHead>
            <TableHead>동승자</TableHead>
            <TableHead className="rounded-tr-lg">특이사항</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.entered_at}</TableCell>
              <TableCell>{item.exited_at}</TableCell>
              <TableCell className="font-medium">{item.purpose}</TableCell>
              <TableCell>{item.raw_plate_number}</TableCell>
              <TableCell>{item.raw_vehicle_type}</TableCell>
              <TableCell>{item.visitor_tag}</TableCell>
              <TableCell>{item.raw_person_name}</TableCell>
              <TableCell>{item.driver_organization}</TableCell>
              <TableCell>{formatPhone(item.raw_person_phone)}</TableCell>
              <TableCell>{item.passengers}</TableCell>
              <TableCell>{item.notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
