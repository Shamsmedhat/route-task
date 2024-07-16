export function formatDate(transactionDate: string): string {
    const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "2-digit",
    };

    const date: Date = new Date(transactionDate);
    return date.toLocaleDateString("en-US", options);
}
