import { useAppContext } from "../context/index.js";
import { useClock } from "../hooks/useClock";
import FlipClock from "./FlipClock";

interface IProps {
  handleSwitch: () => void;
}

export default function ClockContainer(props: IProps) {
  const { handleSwitch } = props;
  const { minuteCount, setMinuteCount } = useClock();
  const newHandleSwitch = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    handleSwitch();
  };
  const { state } = useAppContext();
  return (
    <>
      <div className="clock_container" data-start={state}>
        <nav className="clock_exit" onClick={newHandleSwitch}>
          exit
        </nav>
        <FlipClock minute={minuteCount} />
      </div>
    </>
  );
}
