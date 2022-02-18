import { useRecoilState } from "recoil";
import { configState } from "../recoilRoot";
import { useState, useEffect } from "react";
import { getTree } from "../utils/bookmarks";
import "../style/bookmarks.sass";

export default function BookmarkContainer() {
  const [config, setConfig] = useRecoilState(configState);
  const [bookmarkTree, setBookmarkTree] = useState(null);
  useEffect(() => {
    const asyncTask = async () => {
      // get bookmarks tree
      const tree = await getTree();
      console.log(tree);
    };
    if (config?.publicObject?.showBookmark) {
      asyncTask();
    }
  }, [config]);
  if (config?.publicObject?.showBookmark) {
    return <div className="bookmarks-container">{bookmarkTree && <div>tree</div>}</div>;
  }
  return null;
}
