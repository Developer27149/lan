import { useAppContext } from "../context/index";
import Search from "./Search";

export default function Home() {
  const { state } = useAppContext();
  return (
    <main
      style={{
        backgroundImage: `url(${state.wallpaper})`,
      }}
      className="main"
    >
      <Search />
    </main>
  );
}
