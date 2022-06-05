import { useState } from "react";
import AddItemBox from "./AddItemBox";
import { Button } from "antd";
import { BiSearch, BiEdit } from "react-icons/bi";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { FcAlarmClock } from "react-icons/fc";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useRecoilState } from "recoil";
import { todoListState } from "./status";
import Input from "../Input";
import { ETodoStatus, ITodoItem } from "./const";

export default function RightAside() {
  const [isAdding, setIsAdding] = useState(true);
  const [value, setValue] = useState("");
  const [initV, setInitV] = useState<ITodoItem | undefined>();
  const [todoList, setTodoList] = useRecoilState(todoListState);

  const onReverseIsFinish = (todo: ITodoItem) =>
    setTodoList((item) =>
      item.map((i) => {
        if (i.id !== todo.id) return i;
        i.status = i.status === ETodoStatus.在做了 ? ETodoStatus.搞定 : ETodoStatus.在做了;
        return i;
      })
    );
  const onReverseIsImportant = (todo: ITodoItem) =>
    setTodoList((item) =>
      item.map((i) => {
        if (i.id !== todo.id) return i;
        i.isImportant = !i.isImportant;
        return i;
      })
    );
  return (
    <div className="right-aside">
      {isAdding ? (
        <AddItemBox setIsAdding={setIsAdding} initV={initV} setInitV={setInitV} />
      ) : (
        <>
          <div
            style={{
              width: "max(960px, '90%)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "1rem",
            }}
          >
            <Input
              placeholder="😗我查查..."
              value={value}
              setValue={setValue}
              rightIcon={<BiSearch />}
            />
            <Button type="link" icon={"🤣"} onClick={setIsAdding.bind(undefined, true)}>
              NEW
            </Button>
          </div>
          <div
            style={{
              display: "grid",
              flexGrow: 1,
              padding: "1rem",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1rem",
            }}
          >
            {todoList
              .filter((i) => i.content.includes(value) || i.title.includes(value))
              .map((todo) => (
                <div
                  key={todo.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    maxHeight: "200px",
                    borderTop: `6px solid ${
                      todo.status === ETodoStatus.搞定 ? "#52c41a91" : "#8e7eff5c"
                    }`,
                    borderRadius: "6px",
                    padding: "0.5rem 1rem",
                    background: "#fff",
                    wordBreak: "break-all",
                    overflow: "hidden",
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <h2 style={{ marginBottom: 0 }}>{todo.title}</h2>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        marginLeft: "auto",
                        cursor: "pointer",
                        fontWeight: "1.2rem",
                      }}
                    >
                      <IoCheckmarkDoneCircleOutline
                        style={{
                          color: todo.status === ETodoStatus.搞定 ? "green" : "#333",
                          opacity: todo.status === ETodoStatus.搞定 ? "1" : "0.35",
                          fontSize: "1.4rem",
                        }}
                        onClick={() => onReverseIsFinish(todo)}
                      />
                      <FcAlarmClock
                        style={{
                          filter: `grayscale(${todo.isImportant ? 0 : 1})`,
                          opacity: todo.isImportant ? "1" : "0.35",
                          fontSize: "1.4rem",
                        }}
                        onClick={() => onReverseIsImportant(todo)}
                      />
                    </div>
                  </div>
                  {/* 主要内容 */}
                  <div
                    style={{
                      flexGrow: 1,
                      overflow: "hidden",
                    }}
                    className="select"
                  >
                    {todo.content.slice(0, 32)}
                    {todo.content.length > 32 ? "..." : ""}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      paddingTop: "0.5rem",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <BiEdit
                        onClick={() => {
                          setInitV(todo);
                          setIsAdding(true);
                        }}
                      />
                      <MdOutlineDeleteOutline
                        onClick={() => {
                          setTodoList((todos) => todos.filter((i) => i.id !== todo.id));
                        }}
                      />
                    </div>
                    <span style={{ opacity: "0.8" }}>{todo.time} 👀</span>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}
