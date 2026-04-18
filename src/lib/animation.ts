import { Ticker } from "pixi.js";

export function progressAnimation(ticker: Ticker, update: (progress: number) => void, easing?: (x: number) => number, duration?: number): Promise<void> {
    const seconds = duration ?? 0.25;
    const using_easing = easing ?? linear;
    return new Promise((resolve) => {
        let elaspedMS = 0;
        const updateFn = (t: Ticker) => {
            elaspedMS += t.deltaMS;
            const progress = Math.min(1, elaspedMS / (seconds * 1000));
            update(using_easing(progress));
            if (progress === 1) {
                t.remove(updateFn);
                resolve();
            }
        };
        ticker.add(updateFn);
    })
}

export function linear(x: number): number {
    return x;
}

export function easeInQuad(x: number): number {
    return x * x;
}

export function easeOutQuad(x: number): number {
    return 1 - (1 - x) * (1 - x);
}

export function easeInOutQuad(x: number): number {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

export function easeInOutCubic(x: number): number {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

}
