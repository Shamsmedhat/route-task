import { useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { formatDate } from "../lib/helpers";
import { CustomerDataDocument, TransactionsDoc } from "../lib/types";
import TableLoading from "./TableLoading";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

type MainTableProps = { customersData: CustomerDataDocument | null; query: string; transQuery: string };

export default function MainTable({ customersData, query = "", transQuery = "" }: MainTableProps) {
    const [page, setPage] = useState(1);
    const TransactionWantToDisplay = 10;

    const startViewPoint = TransactionWantToDisplay * (page - 1);

    const endViewPoint = TransactionWantToDisplay * page;
    console.log(page);

    if (!customersData?.customers) return <TableLoading />;

    // Filter customers by query if its provided
    const filteredCustomers = query ? customersData.customers.filter(c => c.name.toLowerCase().includes(query?.toLowerCase())) : customersData.customers;

    // Create rows based on filtered customers and their transactions
    const Rows = filteredCustomers
        .flatMap(customer => {
            // Filter transactions by transQuery if its provided
            const customerTransactions: TransactionsDoc[] | undefined = customersData.transactions?.filter(
                transaction => transaction.customer_id === customer.id && (!transQuery || transaction.date.includes(transQuery) || transaction.amount.toString().includes(transQuery))
            );

            return customerTransactions.map(customerTransaction => (
                <TableRow
                    key={customerTransaction.id}
                    className="border-myBorder"
                >
                    <TableCell className="text-start text-sky-600 font-semibold">{customer.name}</TableCell>
                    <TableCell className="text-start text-slate-200/80">{formatDate(customerTransaction.date)}</TableCell>
                    <TableCell className="text-end pe-[2rem] font-semibold text-[#4ADE80]">{customerTransaction.amount} EGP</TableCell>
                </TableRow>
            ));
        })
        .slice(startViewPoint, endViewPoint);

    console.log(Math.ceil(43 / 10) * 10);
    return (
        <>
            <Table>
                <TableCaption className="py-4 border-t-myBorder border-t-[.5px] !my-0">A list of your total customers transactions.</TableCaption>
                <TableHeader>
                    <TableRow className="border-myBorder ">
                        <TableHead className="w-1/3 lg:w-1/6 text-start font-semibold text-slate-200">Customer Name</TableHead>
                        <TableHead className="text-start font-semibold text-slate-200">Transaction Date</TableHead>
                        <TableHead className="text-end pe-[2rem] font-semibold text-slate-200">Transaction Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="!bg-mySecondary/50">
                    {Rows.length > 0 ? (
                        Rows
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={3}
                                className="text-center"
                            >
                                No transactions available
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <section className="w-full pb-5">
                <div className="flex justify-center space-x-4">
                    <Button
                        className="border border-myBorder p-2 bg-mySecondary hover:bg-myPrimary/40"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >
                        <ChevronLeft />
                    </Button>
                    <Button
                        className="border border-myBorder p-2 bg-mySecondary hover:bg-myPrimary/40"
                        disabled={TransactionWantToDisplay * page == Math.ceil(customersData.transactions.length / 10) * 10}
                        onClick={() => (TransactionWantToDisplay * page <= Math.ceil(customersData.transactions.length / 10) * 10 ? setPage(page + 1) : setPage(page))}
                    >
                        <ChevronRight />
                    </Button>
                </div>
            </section>
        </>
    );
}
