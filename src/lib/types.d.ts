export type CustomersDoc = {
    id: number;
    name: string;
};

export type TransactionsDoc = {
    id: number;
    customer_id: number;
    date: string;
    amount: number;
};

export type CustomerDataDocument = {
    customers: CustomersDoc[];
    transactions: TransactionsDoc[];
};
