import React from "react";
import { useEffect } from "react";

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

export const useCountDownTimer: UseCountDownTimer = () => {
  const [seconds, setSeconds] = React.useState<number>(0);
  const [status, setStatus] = React.useState<"idle" | "running" | "paused">(
    "idle"
  );
  const [callback, setCallback] = React.useState<(() => void) | null>(null);
  const [timerId, setTimerId] = React.useState<NodeJS.Timeout | null>(null);

  const start = React.useCallback((sec: number, cb: () => void) => {
    setSeconds(sec);
    setCallback(cb);
    setStatus("running");
    setTimerId(null);
  }, []);

  const pause = React.useCallback(() => {
    setStatus("paused");
  }, []);

  const resume = React.useCallback(() => {
    setStatus("running");
  }, []);

  const reset = React.useCallback(() => {
    setSeconds(0);
  }, []);

  const clear = React.useCallback(() => {
    if (timerId) {
      clearTimeout(timerId);
      setTimerId(null);
      setStatus("idle");
    }
  }, [timerId]);

  const executeCallback = React.useCallback(() => {
    if (!callback) {
      return;
    }
    callback();
    setCallback(null);
    clear();
    reset();
  }, [callback, clear, reset]);

  useEffect(() => {
    if (status === "running" && seconds > 0) {
      const id = setTimeout(() => {
        setSeconds((prevSeconds: number) => prevSeconds - 1);
      }, 1000);
      setTimerId(id);
    } else if (status === "running" && seconds === 0) {
      executeCallback();
    }

    return clear;
  }, [status, seconds, clear, executeCallback]);

  return {
    seconds,
    start,
    pause,
    resume,
    reset,
    executeCallback,
    clear,
    status,
  };
};
