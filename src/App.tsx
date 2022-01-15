import Search from "./components/Search";
import { useUnsplash } from "./hooks/useUnsplash";

export default function App({ wallpaper }: { wallpaper: string }) {
  // const { imgBase64, getNewImg } = useUnsplash();

  return (
    <main
      style={{
        backgroundImage: `url(${wallpaper})`,
      }}
    >
      <Search />
    </main>
  );
}
