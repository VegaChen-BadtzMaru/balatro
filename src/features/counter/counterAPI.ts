export function fetchCount() {
    return new Promise<{ data: number }>((resolve) => setTimeout(() => resolve({ data: 100 }), 1000));
}
