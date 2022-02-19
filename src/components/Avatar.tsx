import { useRecoilValue } from "recoil";
import "../style/avatar.sass";
import { configState } from "../recoilRoot";
import { useEffect, useState } from "react";
import { getImgBase64FromUrl, getRandomColor } from "../utils/index.js";
import { searchIconBase64FromStorage } from "../utils/storage";
import { FcLink } from "react-icons/fc";

interface IProps {
  href: string;
  keyword: string;
}
export default function Avatar({ href, keyword }: IProps) {
  const config = useRecoilValue(configState);
  const [srcValue, setSrcValue] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    // try {
    const urlInstance = new URL(href);
    const hostname = urlInstance.hostname;
    const url = `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${hostname}&size=32`;
    setSrcValue(url);
    (async () => {
      try {
        let base64Str = await searchIconBase64FromStorage(url);
        if (base64Str && base64Str.length > 0) {
          setSrcValue(base64Str);
        } else {
          base64Str = await getImgBase64FromUrl(url);
          if (base64Str.length > 0) {
            // success
            setSrcValue(base64Str);
          }
        }
      } catch (error) {
        console.log("init icon base64 failed!!!", error);
        // setIsLoadFail(true);
      }
    })();
    // } catch (error) {
    //   console.log(error, "new url obj failed");
    //   setIsLoadFail(true);
    // }
  }, []);

  const handleLoadSuccess = () => {
    console.log("load success!");
    setIsLoaded(true);
  };
  return (
    <div data-size={config.publicObject.iconSize} className="avatar">
      <div
        style={{
          textAlign: "center",
          borderRadius: "50%",
          color: "#fff",
          backgroundColor: getRandomColor(),
          verticalAlign: "center",
          opacity: isLoaded ? 0 : 1,
        }}
        className="avatar_text"
      >
        {keyword[0].toUpperCase()}
      </div>
      <img
        src={`${srcValue}`}
        onLoad={handleLoadSuccess}
        style={{
          position: "absolute",
          left: "4px",
          top: "4px",
          opacity: isLoaded ? 1 : 0,
        }}
      />
    </div>
  );
}
