import { useRecoilState } from "recoil";
import { configState } from "../recoilRoot";
import { useState, useEffect } from "react";
import "../style/bookmarks.sass";
import { getAdjacent, historyPush, updateRootStateWithKeyAndValue } from "../utils/index";
import Avatar from "./Avatar";
import AddBookmark from "./AddBookmark";
import ContextMenu from "./ContextMenu";
import { useMenu } from "../hooks/useMenu";

export default function BookmarkContainer() {
  const [config, setConfig] = useRecoilState(configState);
  const { publicObject } = config;
  const { showBookmark, bookmarkList, bookmarkPos, showAddIconBox } = publicObject;
  const { handleSwitchShowAddIconBox } = useMenu(config, setConfig);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleClickStopPropagation = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  const [contextMenuPos, setContextMenuPos] = useState({ x: -500, y: -500 });
  const [contextMenuOptions, setContextMenuOptions] = useState<
    { text: string; callback: () => void }[]
  >([]);

  useEffect(() => {
    setTimeout(() => {
      setContextMenuPos({ x: -500, y: -500 });
    }, 3000);
  }, [contextMenuPos]);

  if (showBookmark) {
    return (
      <div
        className="bookmarks-container"
        style={getAdjacent(bookmarkPos, 128)}
        onMouseMove={handleMouseMove}
        data-pos={bookmarkPos}
        onClick={handleClickStopPropagation}
      >
        <div
          style={{ padding: "1rem 0", paddingRight: "10px" }}
          className="icon_list"
          data-pos={bookmarkPos}
        >
          {bookmarkList.map((url) => (
            <div
              style={{
                cursor: "pointer",
                borderRadius: "50%",
                backgroundColor: "#ffffff75",
                margin: "4px",
              }}
              key={url}
              // onClick={() => historyPush(url, openType === "新页面" ? "_blank" : "_self")}
              onContextMenu={(e: React.MouseEvent<HTMLDivElement>) => {
                console.log(e);
                const { screenX, screenY } = e;
                setContextMenuPos({ x: screenX, y: screenY });
                setContextMenuOptions([
                  {
                    text: "取走",
                    callback: () => {
                      updateRootStateWithKeyAndValue(setConfig, "bookmarkList", [
                        ...bookmarkList.filter((i) => i !== url),
                      ]);
                      setContextMenuPos({ x: -500, y: -500 });
                    },
                  },
                  {
                    text: "更换图标",
                    callback: () => {
                      updateRootStateWithKeyAndValue(setConfig, "bookmarkList", [
                        ...bookmarkList.filter((i) => i !== url),
                      ]);
                      setContextMenuPos({ x: -500, y: -500 });
                    },
                  },
                ]);
              }}
            >
              <Avatar href={url} />
            </div>
          ))}
        </div>
        {showAddIconBox && <AddBookmark hiddenIt={handleSwitchShowAddIconBox} />}
        <ContextMenu
          left={contextMenuPos.x}
          top={contextMenuPos.y}
          options={contextMenuOptions}
        />
      </div>
    );
  }
  return null;
}
