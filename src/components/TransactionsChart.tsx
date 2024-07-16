import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "../components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import useCustomerData from "./useCustomerData";
import { useEffect, useState } from "react";

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    amount: {
        label: "Transaction Amount",
        // color: "hsl(var(--chart-1))",
        color: "#c71129",
    },
    date: {
        label: "Transaction Date",
        // color: "hsl(var(--chart-2))",
        color: "#c71129",
    },
} satisfies ChartConfig;

export default function TransactionsChart() {
    const [customersData] = useCustomerData();
    const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
    const [allTransactions, setAllTransactions] = useState<
        {
            customerName: string;
            id: number;
            customer_id: number;
            date: string;
            amount: number;
        }[]
    >([]);

    useEffect(() => {
        if (customersData) {
            const data = customersData.customers.map(customer =>
                customersData?.transactions
                    ?.filter(transaction => transaction.customer_id === customer.id)
                    .map(transaction => ({
                        ...transaction,
                        customerName: customer.name,
                    }))
            );

            const filterdData = data?.flatMap(x => x).filter(c => c?.customerName === selectedCustomer);

            setAllTransactions(filterdData);
        }
    }, [customersData, selectedCustomer]);

    useEffect(() => {
        if (customersData && customersData?.customers?.length > 0) {
            setSelectedCustomer(customersData.customers[0].name);
        }
    }, [customersData]);

    const chartData = allTransactions;

    if (!chartData || chartData?.length === 0) return null;

    return (
        <div className="w-[85%] mx-auto ">
            <h1 className="my-3 py-4 text-4xl">Transaction Analysis</h1>

            <Card className="bg-mySecondary border-myBorder text-slate-50">
                <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row border-myBorder">
                    <div className="grid flex-1 gap-1 text-center sm:text-left">
                        <CardTitle>
                            Transactions of <span className="text-[#2563EB] font-bold">{selectedCustomer}</span>
                        </CardTitle>
                        <CardDescription>Showing the last of 9 transactions</CardDescription>
                    </div>
                    <Select
                        value={selectedCustomer ?? undefined}
                        onValueChange={setSelectedCustomer}
                    >
                        <SelectTrigger
                            className="w-[160px] rounded-lg sm:ml-auto bg-myPrimary/80 ring-offset-myPrimary/65 focus:bg-myPrimary focus:outline-myPrimary border-myPrimary"
                            aria-label="Customers name"
                        >
                            <SelectValue placeholder="Customers name" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl bg-myPrimary text-slate-50 border-myPrimary">
                            {customersData?.customers.map(customer => (
                                <SelectItem
                                    key={customer.id}
                                    value={customer.name}
                                    className="rounded-lg"
                                >
                                    {customer.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </CardHeader>

                {/* Grave content section */}
                <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 ">
                    <ChartContainer
                        config={chartConfig}
                        className="aspect-auto h-[250px] w-full"
                    >
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient
                                    id="fillDesktop"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="#2563EB"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="#2563EB"
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                                <linearGradient
                                    id="fillMobile"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="#2563EB"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="#2563EB"
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                            </defs>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                // minTickGap={32}
                                tickFormatter={value => {
                                    const date = new Date(value);
                                    return date.toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                    });
                                }}
                            />
                            <YAxis
                                dataKey="amount"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                // minTickGap={32}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent
                                        labelFormatter={value => {
                                            return new Date(value).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                            });
                                        }}
                                        indicator="dot"
                                    />
                                }
                            />

                            <Area
                                dataKey="date"
                                type="natural"
                                fill="url(#fillMobile)"
                                stroke="#212329"
                                stackId="a"
                            />
                            <Area
                                dataKey="amount"
                                type="natural"
                                fill="url(#fillMobile)"
                                stroke="#2563EB"
                                stackId="a"
                            />
                            <ChartLegend content={<ChartLegendContent />} />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    );
}
