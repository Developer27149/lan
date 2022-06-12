import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { configState } from "../../recoilRoot";
import { updateRootStateWithKeyAndValue } from "../../utils";
import { getFromStorage, storageSet } from "../../utils/storage";
import LeftAside from "./LeftAside";
import RightAside from "./RightAside";
import { todoListState } from "./status";
import "./style.sass";
import "antd/dist/antd.css";

export default function TodoList() {
  // get config from localstorage and init all data!
  const [isLoading, setIsLoading] = useState(true);
  const [, setConfig] = useRecoilState(configState);
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [isAdding, setIsAdding] = useState(true);

  // 隐藏搜索框
  useEffect(() => {
    updateRootStateWithKeyAndValue(setConfig, "hiddenSearchBox", true);
    return () => {
      updateRootStateWithKeyAndValue(setConfig, "hiddenSearchBox", false);
    };
  }, []);

  // 初始化数据
  useEffect(() => {
    getFromStorage("todoList")
      .then((data: any) => {
        console.log("todo list data is:", data);
        setTodoList(data["todoList"]);
        setTimeout(() => setIsLoading(false));
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    // save todo list to localStorage
    storageSet({ todoList });
  }, [todoList]);

  if (isLoading) return null;

  return (
    <div className="todo-box">
      <div className="todo-container">
        <LeftAside isAdding={isAdding} setIsAdding={setIsAdding} />
        <RightAside isAdding={isAdding} setIsAdding={setIsAdding} />
      </div>
    </div>
  );
}
