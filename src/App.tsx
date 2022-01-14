import Search from "./components/Search";
import { useUnsplash } from "./hooks/useUnsplash";

export default function App() {
  const { imgBase64, getNewImg } = useUnsplash();

  return (
    <main
      style={
        imgBase64.length > 0
          ? {
              background: `url(${imgBase64}) no-repeat`,
              backgroundSize: "cover",
            }
          : {}
      }
    >
      <Search />
    </main>
  );
}
