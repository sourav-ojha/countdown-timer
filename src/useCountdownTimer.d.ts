export type UseCountDownTimer = () => {
    seconds: number;
    start: (sec: number, callback: () => void) => void;
    pause: () => void;
    resume: () => void;
    reset: () => void;
    executeCallback: () => void;
    clear: () => void;
    status: string;
};
export declare const useCountDownTimer: UseCountDownTimer;
