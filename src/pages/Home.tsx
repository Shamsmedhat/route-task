import MainTable from "../components/MainTable";
import { Input } from "../components/ui/input";
import { useState } from "react";
import useCustomerData from "../components/useCustomerData";

export default function Home() {
    const [customersData] = useCustomerData();
    const [query, setQuery] = useState("");
    const [transQuery, setTransQuery] = useState("");

    return (
        <section className="flex-1 pb-[1rem]">
            {/* Head section title and filter inputs */}
            <header className="max-w-[85%] mx-auto">
                <h1 className="my-3 py-4 text-4xl">Customer Transactions</h1>

                <div className="flex mt-3 mb-[3rem] justify-between">
                    {/* Filter by Customer name input */}
                    <Input
                        placeholder="Filter by Customer name..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        className="max-w-sm border-2 border-mySecondary bg-myPrimary ring-offset-myBorder focus-visible:outline-mySecondary"
                    />
                    {/* style line */}
                    <span className="bg-mySecondary w-[30%] h-[0.1rem] translate-y-5 relative after:translate-y-[-50%] after:content-['OR'] after:px-3 after:text-mySecondary after:font-extrabold after:bg-myPrimary after:absolute after:left-1/2 after:transform after:-translate-x-1/2"></span>

                    {/* Filter by Transaction amount */}
                    <Input
                        placeholder="Filter by Transaction amount..."
                        value={transQuery}
                        onChange={e => setTransQuery(e.target.value)}
                        className="max-w-sm border-2 border-mySecondary bg-myPrimary ring-offset-myBorder focus-visible:outline-mySecondary"
                    />
                </div>
            </header>

            <div className="bg-mySecondary max-w-[85%] min-h-[44rem] flex flex-col justify-between mx-auto shadow-md rounded-md ">
                <MainTable
                    customersData={customersData}
                    query={query}
                    transQuery={String(transQuery)}
                />
            </div>
        </section>
    );
}
