import { useRecoilState } from "recoil";
import { configState } from "../recoilRoot";
import { useState, useEffect, useRef, createElement } from "react";
import "../style/bookmarks.sass";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { getAdjacent } from "../utils/index";
import { search } from "../utils/bookmarks";
import { IBookmarkItem } from "../types/index";
import Avatar from "./Avatar";
import { debounce } from "lodash";

export default function BookmarkContainer() {
  const [config, setConfig] = useRecoilState(configState);
  const { publicObject } = config;
  const { showBookmark, bookmarkList, bookmarkPos } = publicObject;
  const [showAddBox, setShowAddBox] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const [resultList, setResultList] = useState<IBookmarkItem[]>([]);

  const handleChangeSearchKeyword = debounce(async () => {
    const searchValue = inputRef.current!.value;
    // 搜索书签，更新结果
    try {
      const res = await search(searchValue.trim());
      setResultList((res as IBookmarkItem[]).slice(0, 16));
      console.log(res, searchValue);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }, 500);

  const handleAddBookmark = async () => {
    setShowAddBox((is) => !is);
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (!showAddBox && inputRef.current) {
      inputRef.current.value = "";
    }
  }, [showAddBox]);

  if (showBookmark) {
    return (
      <div className="bookmarks-container" style={getAdjacent(bookmarkPos, 96)}>
        {bookmarkList.map(({ url, icon }) => {
          if (icon.length > 0) {
            return <img key={url} src={icon} className="bookmark_icon" />;
          }
          return <div className="bookmark_icon">{url[0].toUpperCase()}</div>;
        })}
        {createElement(showAddBox ? IoMdClose : IoMdAdd, {
          className: "bookmark_icon",
          onClick: handleAddBookmark,
        })}
        {showAddBox && (
          <div
            className="add_bookmark_box"
            style={{ ...getAdjacent(bookmarkPos, 96), [bookmarkPos]: "100px" }}
          >
            <div className="inside_box" onMouseMove={handleMouseMove}>
              <input
                ref={inputRef}
                onChange={handleChangeSearchKeyword}
                placeholder="书签关键词..."
              />
              <div className="result">
                {resultList.map(({ id, title, url }) => {
                  return (
                    <div key={id} className="result_item">
                      <Avatar href={url!} keyword={title} />
                      <a href={url}>{title}</a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  return null;
}
