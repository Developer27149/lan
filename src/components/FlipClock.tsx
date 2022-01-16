import FlipItem from "./FlipItem";
import { useRef } from "react";

interface IProps {
  minute: number;
}

export default function FlipClock(props: IProps) {
  const { minute = 0 } = props;
  const flipItemHour1 = useRef<HTMLDivElement>(null);
  const flipItemHour2 = useRef<HTMLDivElement>(null);
  const flipItemMinute1 = useRef<HTMLDivElement>(null);
  const flipItemMinute2 = useRef<HTMLDivElement>(null);
  const flipItemSecond1 = useRef<HTMLDivElement>(null);
  const flipItemSecond2 = useRef<HTMLDivElement>(null);
  return (
    <div className="FlipClock">
      <FlipItem ref={flipItemHour1} />
      {/* <FlipItem ref={flipItemHour2} />
      <b>:</b>
      <FlipItem ref={flipItemMinute1} />
      <FlipItem ref={flipItemMinute2} />
      <b>:</b>
      <FlipItem ref={flipItemSecond1} />
      <FlipItem ref={flipItemSecond2} /> */}
    </div>
  );
}
