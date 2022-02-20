import { useRecoilState } from "recoil";
import { configState } from "../recoilRoot";
import { useState, createElement } from "react";
import "../style/bookmarks.sass";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { getAdjacent, historyPush } from "../utils/index";
import Avatar from "./Avatar";
import AddBookmark from "./AddBookmark";

export default function BookmarkContainer() {
  const [config, setConfig] = useRecoilState(configState);
  const { publicObject } = config;
  const { showBookmark, bookmarkList, bookmarkPos, openType } = publicObject;
  const [showAddBox, setShowAddBox] = useState(true);

  const handleAddBookmark = async () => {
    setShowAddBox((is) => !is);
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  if (showBookmark) {
    return (
      <div
        className="bookmarks-container"
        style={getAdjacent(bookmarkPos, 128)}
        onMouseMove={handleMouseMove}
        data-pos={bookmarkPos}
      >
        <div
          style={{ padding: "1rem 0", paddingRight: "10px" }}
          className="icon_list"
          data-pos={bookmarkPos}
        >
          {createElement(showAddBox ? IoMdClose : IoMdAdd, {
            className: "bookmark_icon",
            onClick: handleAddBookmark,
          })}
          {bookmarkList.map((url) => (
            <div
              style={{ cursor: "pointer" }}
              key={url}
              onClick={() => historyPush(url, openType === "新页面" ? "_blank" : "_self")}
            >
              <Avatar href={url} />
            </div>
          ))}
        </div>
        {showAddBox && <AddBookmark />}
      </div>
    );
  }
  return null;
}
