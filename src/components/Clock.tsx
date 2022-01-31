import { useAppContext } from "../context/index";
import "../style/clock.sass";

export default function Clock() {
  const { state } = useAppContext();
  
  return (
    <div
      className="clock-container"
      style={{
        backgroundImage: `url(${state.wallpaper})`,
      }}
    >
      1
    </div>
  );
}
