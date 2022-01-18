import { useState } from "react";

export const useClock = () => {
  const [minuteCount, setMinuteCount] = useState(40);
  return { minuteCount, setMinuteCount };
};
