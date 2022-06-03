import { useState } from "react";
import AddItemBox from "./AddItemBox";
import { Button } from "antd";
import { BiSearch, BiEdit } from "react-icons/bi";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { FcAlarmClock } from "react-icons/fc";
import { useRecoilState } from "recoil";
import { todoListState } from "./status";
import Input from "../Input";
import { ETodoStatus } from "./const";

export default function RightAside() {
  const [isAdding, setIsAdding] = useState(false);
  const [value, setValue] = useState("");
  const [todoList] = useRecoilState(todoListState);
  return (
    <div className="right-aside">
      {isAdding ? (
        <AddItemBox setIsAdding={setIsAdding} />
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
            <Button type="dashed" icon={"🤣"} onClick={setIsAdding.bind(undefined, true)}>
              NEW
            </Button>
          </div>
          <div
            style={{
              display: "grid",
              flexGrow: 1,
              padding: "0.5rem",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1rem",
            }}
          >
            {todoList.map((todo) => (
              <div
                key={todo.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  maxHeight: "200px",
                  borderTop: "3px solid #8e7eff5c",
                  borderRadius: "6px",
                  padding: "0.5rem 1rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <h2>{todo.title}</h2>
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
                    <BiEdit />
                    <IoCheckmarkDoneCircleOutline
                      style={{
                        color: todo.status === ETodoStatus.搞定 ? "green" : "#333",
                      }}
                    />
                    {todo.isImportant && <FcAlarmClock />}
                  </div>
                </div>
                {/* 主要内容 */}
                <div>{todo.content}</div>
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <span style={{ opacity: "0.8" }}>{todo.time} 👌</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
