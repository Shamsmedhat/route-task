import { Table } from "lucide-react";
import { TableCaption, TableHead, TableHeader, TableRow } from "./ui/table";

export default function TableLoading() {
    return (
        <Table>
            <TableCaption className="py-4 border-t-myBorder border-t-[.5px] !my-0">A list of your total customers transactions.</TableCaption>
            <TableHeader>
                <TableRow className="border-myBorder ">
                    <TableHead className="w-1/6 text-start font-semibold text-slate-200">Loading...</TableHead>
                    <TableHead className="text-start font-semibold text-slate-200">Loading...</TableHead>
                    <TableHead className="text-end pe-[2rem] font-semibold text-slate-200">Loading...</TableHead>
                </TableRow>
            </TableHeader>
        </Table>
    );
}
