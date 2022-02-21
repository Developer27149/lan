import { useRef, useState, useEffect } from "react";
import { debounce } from "lodash";
import { search } from "../utils/bookmarks";
import { IBookmarkItem } from "../types/index";
import { updateRootStateWithKeyAndValue } from "../utils/index.js";
import { useRecoilState } from "recoil";
import { configState } from "../recoilRoot";
import Avatar from "./Avatar";
import { FiEdit3 } from "react-icons/fi";

export default function AddBookmark({
  hiddenIt,
  setCurUpdateBookmarkUrl,
}: {
  hiddenIt: () => void;
  setCurUpdateBookmarkUrl: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [resultList, setResultList] = useState<IBookmarkItem[]>([]);
  const [config, setConfig] = useRecoilState(configState);
  const { publicObject } = config;
  const { bookmarkList } = publicObject;
  const handleChangeSearchKeyword = debounce(async () => {
    const searchValue = inputRef.current!.value;
    // 搜索书签，更新结果
    try {
      const res = await search(searchValue.trim());
      setResultList((res as IBookmarkItem[]).slice(0, 12));
    } catch (error) {
      alert(error);
    }
  }, 500);

  const handlePickItToHomepage = (url: string) => {
    updateRootStateWithKeyAndValue(setConfig, "bookmarkList", [
      ...bookmarkList.filter((i) => i !== url),
      url,
    ]);
  };
  useEffect(() => {
    updateRootStateWithKeyAndValue(setConfig, "hiddenSearchBox", true);
    document.addEventListener("click", hiddenIt, { once: true });
    return () => {
      updateRootStateWithKeyAndValue(setConfig, "hiddenSearchBox", false);
    };
  }, []);
  return (
    <div className="add_bookmark_box">
      <div className="inside_box">
        <input
          ref={inputRef}
          onChange={handleChangeSearchKeyword}
          placeholder="书签关键词..."
        />
        <div className="result">
          {resultList
            .filter((i) => i.url)
            .map(({ id, title, url }) => {
              return (
                <div key={id} className="result_item">
                  <Avatar href={url!} />
                  <span className="title">
                    <a href={url}>
                      {title.slice(0, 54)}
                      {title.length > 54 ? "..." : ""}
                    </a>
                  </span>

                  {!bookmarkList.includes(url!) && (
                    <span className="pick" onClick={() => handlePickItToHomepage(url!)}>
                      📌
                    </span>
                  )}
                  <span className="pick pen" onClick={() => setCurUpdateBookmarkUrl(url!)}>✏️</span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
