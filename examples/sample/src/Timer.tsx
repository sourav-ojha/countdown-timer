import { useCountDownTimer } from "@souravojha/countdown-timer";

const Timer = () => {
  const timer = useCountDownTimer();

  const handleAction = () => {
    if (timer.status === "idle") {
      timer.start(10, () => {
        console.log("Timer done");
      });
    } else if (timer.status === "running") {
      timer.pause();
    } else if (timer.status === "paused") {
      timer.resume();
    }
  };

  return (
    <div>
      <button onClick={handleAction}>
        {timer.seconds}- {timer.status}
      </button>
    </div>
  );
};

export default Timer;
