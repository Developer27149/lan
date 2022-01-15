import React from "react";
import { FcGoogle } from "react-icons/fc";
import { DiBingSmall } from "react-icons/di";
import { RiZhihuFill } from "react-icons/ri";
import { VscGithubAlt } from "react-icons/vsc";
import { keywordType } from "../types/index";

export default React.memo(function EngineIcon({
  keyword,
}: {
  keyword: keywordType;
}) {
  if (keyword === "b") return <DiBingSmall />;
  if (keyword === "z") return <RiZhihuFill />;
  if (keyword === "gh") return <VscGithubAlt />;
  return <FcGoogle />;
});
