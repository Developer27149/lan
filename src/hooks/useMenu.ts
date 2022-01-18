import { useState } from "react";

export const useMenu = () => {
  const [showClock, setShowClock] = useState(!false);
  const handleSwitchShowClock = () => setShowClock(!showClock);
  return { showClock, handleSwitchShowClock };
};
