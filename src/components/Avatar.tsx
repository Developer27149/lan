import { useRecoilState } from "recoil";
import "../style/avatar.sass";
import { configState } from "../recoilRoot";
import { useEffect, useState } from "react";
import { getImgBase64FromUrl, historyPush } from "../utils/index";
import { updateBookmarkIconData, searchIconBase64FromStorage } from "../utils/storage";

interface IProps {
  href: string;
  title: string;
}
export default function Avatar({ href, title }: IProps) {
  const [config] = useRecoilState(configState);
  const [srcValue, setSrcValue] = useState("");
  const [opacity, setOpacity] = useState(0);
  const [isStorageUrl, setIsStorageUrl] = useState(false);
  useEffect(() => {
    const asyncTask = async () => {
      try {
        const { origin, hostname } = new URL(href);
        const urlRecordFromStorage = await searchIconBase64FromStorage(hostname);
        if (urlRecordFromStorage) {
          setSrcValue(urlRecordFromStorage);
          setIsStorageUrl(true);
          console.log("数据从本地获取");
        } else {
          const url = `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${origin}&size=32`;
          setSrcValue(url);
        }
      } catch (error) {
        console.log("load failed...", error);
      }
    };
    if (srcValue === "" || config.publicObject.updateBookmarkIconUrl === href) {
      asyncTask();
    }
  }, [config, srcValue]);

  const handleLoadSuccess = () => {
    setOpacity(1);
    // icon 来自网络，则通过网络尝试更新
    !isStorageUrl &&
      (async () => {
        const { origin, hostname } = new URL(href);
        try {
          const base64Str = await getImgBase64FromUrl(origin + "/favicon.ico");
          if (base64Str!.length > 0) {
            // 保存到 storage
            updateBookmarkIconData(hostname, base64Str!);
          }
        } catch (e) {
          console.log(e);
        }
      })();
  };

  return (
    <div
      data-size={config.publicObject.iconSize}
      className="avatar"
      title={title}
      onClick={() => historyPush(href)}
    >
      <img src={srcValue} onLoad={handleLoadSuccess} style={{ opacity }} />
    </div>
  );
}
