import { useEffect, useState } from "react";
import { CustomerDataDocument } from "../lib/types";

export default function useCustomerData() {
    const [customersData, setCustomerData] = useState<CustomerDataDocument | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch("/route-task/data.json");
                const data: CustomerDataDocument = await res.json();
                setCustomerData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, []);

    return [customersData];
}
