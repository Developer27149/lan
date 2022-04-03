import React from "react";
// import { keywordType } from "../types/index";
// import EngineIcon from "./EngineIcon";
import "../style/info.sass";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { GrGithub, GrTwitter } from "react-icons/gr";
import { AiOutlineWechat } from "react-icons/ai";

export default React.memo(function Info() {
  // const keywords = ["y", "gg", "gh", "b", "z"];
  return (
    <div className="info-container">
      {/* <div className="info">
        <h3 className="h3">其他</h3>
        <p>🔍 搜索框引擎切换</p>
      </div> */}
      {/* {keywords.map((key) => {
        return (
          <div key={key} className="keys">
            <span>{key}</span>
            <span>+</span>
            <span>space</span>
            <div className="equal"></div>
            <span>
              <EngineIcon keyword={key as keywordType} />
            </span>
          </div>
        );
      })} */}
      <div className="content-me">
        <p>如果你有任何建议或意见，👏🏻欢迎给我发邮件</p>
        <span className="mail">
          <a href="mailto: rivenqin@gmail.com">
            <MdOutlineMarkEmailRead />
          </a>
        </span>
        <p className="or">🤔 &nbsp; or</p>
        <div className="links">
          <a href="https://github.com/youyiqin/lan">
            <GrGithub />
          </a>
          <a href="https://twitter.com/miaocai0">
            <GrTwitter />
          </a>
          <a href="https://avatars.githubusercontent.com/u/23721611?s=400&u=81b71a625223490a477903d8154db4b64caa4c54&v=4">
            <AiOutlineWechat />
          </a>
        </div>
      </div>
    </div>
  );
});
