import { useState } from "react";
import "../style/BookmarkEdit.sass";
import { IoIosAdd } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";
import { ImCool } from "react-icons/im";
import { updateBookmarkIconData } from "../utils/storage.js";
import { updateRootStateWithKeyAndValue } from "../utils/index.js";
import { useSetRecoilState } from "recoil";
import { configState } from "../recoilRoot";

interface IProps {
  href: string;
  exitCb: () => void;
}
export default function BookmarkEdit({ exitCb, href }: IProps) {
  const setConfig = useSetRecoilState(configState);
  const [uploadImgSrc, setUploadImgSrc] = useState("");
  const [info, setInfo] = useState("上传32*32像素的 png 或 svg 图标");
  const [isError, setIsError] = useState(false);
  const urlObj = new URL(href);
  const { hostname } = urlObj;
  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = e.target.files;
      if (!files) return;
      const file = files[0];
      const { type, size } = file;
      if (type === "image/png" || (type === "image/svg+xml" && size < 12000)) {
        console.log("nice format");
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e!.target!.result;
          if (result) {
            setUploadImgSrc(result as string);
          }
          setInfo("上传成功");
          setIsError(false);
        };
        reader.readAsDataURL(file);
      } else {
        setInfo("格式错误或图片太大");
        setIsError(true);
      }
    } catch (error) {
      setInfo("上传失败，请联系我修复（设置页面有联系方式）");
      setIsError(true);
    }
  };
  return (
    <div className="bookmark_edit_box" onClick={exitCb}>
      <div
        className="outbox"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        style={{
          position: "relative",
        }}
      >
        <div className="box" style={{ minWidth: "240px" }}>
          <div
            style={{
              cursor: "pointer",
              margin: "2rem",
              fontSize: "64px",
              color: "#86a8e7",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "24px",
            }}
          >
            {uploadImgSrc.length === 0 ? (
              <IoIosAdd className="icon" />
            ) : (
              <img src={uploadImgSrc} style={{ width: "64px", height: "64px" }} />
            )}
          </div>
          <p
            style={{
              textAlign: "center",
              opacity: 0.7,
              color: isError ? "red" : "#333",
              margin: "1rem",
            }}
          >
            {info}
          </p>
        </div>
        {uploadImgSrc.length === 0 && (
          <input
            type="file"
            style={{
              position: "absolute",
              left: "0",
              right: "0",
              top: "0",
              bottom: "0",
              opacity: "0",
            }}
            onChange={handleUploadFile}
          />
        )}
        {uploadImgSrc.length > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              padding: "8px 14px",
            }}
          >
            <GrPowerReset
              style={{
                color: "#81e471",
                fontSize: "2rem",
                paddingTop: "8px",
                cursor: "pointer",
              }}
              onClick={() => {
                setUploadImgSrc("");
              }}
            />
            <ImCool
              style={{
                color: "#8e42d3",
                fontSize: "2rem",
                paddingTop: "8px",
                cursor: "pointer",
              }}
              onClick={async () => {
                // 更新数据
                await updateBookmarkIconData(hostname, uploadImgSrc);
                updateRootStateWithKeyAndValue(setConfig, "updateBookmarkIconUrl", href);
                exitCb();
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
