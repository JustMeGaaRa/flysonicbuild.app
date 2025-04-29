export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
    let timeoutId: number | undefined;
    let resolveList: Array<(value: ReturnType<T>) => void> = [];

    return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
        return new Promise<ReturnType<T>>((resolve) => {
            if (timeoutId !== undefined) {
                clearTimeout(timeoutId);
            }
            resolveList.push(resolve);
            timeoutId = setTimeout(() => {
                const result = func.apply(this, args);
                resolveList.forEach((resolve) => resolve(result));
                resolveList = [];
                timeoutId = undefined;
            }, wait);
        });
    };
}
