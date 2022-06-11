import { useState } from "react";
import Input from "../Input";
import {
  Form,
  DatePicker,
  Switch,
  Input as InputText,
  Button,
  message,
  TimePicker,
} from "antd";
import dayjs from "dayjs";
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineEnter, AiOutlineDelete } from "react-icons/ai";
import { ETodoStatus, ITodoItem, fullDateStr, IComment, TSetType } from "./const";
import { useSetRecoilState } from "recoil";
import { todoListState } from "./status";
import { MacScrollbar } from "mac-scrollbar";

const { useForm, Item } = Form;

interface IProps {
  setIsAdding: TSetType<boolean>;
  initV?: ITodoItem;
  setInitV?: TSetType<ITodoItem | undefined>;
}

export default function AddItemBox({ setIsAdding, initV, setInitV }: IProps) {
  const setTodoList = useSetRecoilState(todoListState);
  const [title, setTitle] = useState(initV?.title ?? "");
  const [content, setContent] = useState(initV?.content ?? "");
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<IComment[]>(initV?.comments ?? []);

  const [form] = useForm();
  const initValues = {
    dateRange: initV ? initV.dateRange.map((i) => dayjs(i)) : [dayjs(), dayjs()],
    isImportant: initV?.isImportant ?? false,
    time: dayjs(initV?.createdAt) ?? dayjs(),
  };

  const onBack = () => {
    setInitV?.(undefined);
    setIsAdding(false);
  };

  const onFinish = (values: typeof initValues) => {
    if (title.length === 0) {
      message.warning("不如写一个有用的标题吧 👀");
      return;
    }
    if (content.length === 0) {
      message.warning("具体干点啥也补充一下吧 👀");
      return;
    }
    const { dateRange, isImportant, time } = values;
    const createdAt = dayjs().valueOf();
    const todoItem: ITodoItem = {
      title,
      isImportant,
      createdAt,
      dateRange: dateRange.map((i) => i.valueOf()) as any,
      time: time.format("hh:mm"),
      content,
      status: ETodoStatus.计划,
      id: createdAt,
      comments,
    };
    if (initV) {
      console.log("update");

      setTodoList((todos) => {
        return [todoItem, ...todos.filter((i) => i.id !== initV.id)];
      });
    } else {
      console.log("create");

      setTodoList((todos) => {
        return [todoItem, ...todos];
      });
    }

    message.success("OK 🎉🎉🎉");
    onBack();
  };

  const [vd, setVd] = React.useState<Vditor>();
  useEffect(() => {
    const vditor = new Vditor("vditor", {
      after: () => {
        vditor.setValue("`Vditor` 最小代码示例");
        setVd(vditor);
      },
    });
  }, []);

  return (
    <>
      <div className="new-todo-box">
        <div className="item-input">
          <IoIosArrowBack
            style={{
              margin: "0 6px",
              color: "#9e1edf",
              fontWeight: "bolder",
              width: "2rem",
              cursor: "pointer",
            }}
            onClick={onBack}
          />
          <div style={{ flexGrow: 1 }}>
            <Input
              value={title}
              setValue={setTitle}
              label="标题"
              style={{ width: "calc(100% - 100px)" }}
              placeholder="简洁的标题 🎈"
              maxLength={8}
            />
          </div>
        </div>
        <div className="todo-option">
          <Form form={form} layout="inline" initialValues={initValues} onFinish={onFinish}>
            <Item name="isImportant" valuePropName="checked" style={{ width: 60 }}>
              <Switch checkedChildren={"重要"} unCheckedChildren={"不急"} />
            </Item>
            <Item label="🐶预计" name="dateRange">
              <DatePicker.RangePicker allowClear={false} />
            </Item>
            <Item name="time">
              <TimePicker format={"hh:mm"} />
            </Item>
            <Item>
              <Button htmlType="submit" type="dashed" shape="round">
                {initV ? "保存" : "创建"}
              </Button>
            </Item>
          </Form>
        </div>
      </div>
      <div className="todo-content">
        <MacScrollbar>
          {/* <InputText.TextArea
            style={{
              minHeight: "100%",
              resize: "none",
              border: "none",
              outline: "none",
              overflow: "hidden",
            }}
            placeholder="balabala...我还支持 Markdown 语法格式"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          /> */}
        </MacScrollbar>
        <MacScrollbar
          style={{
            display: "flex",
            height: "100%",
            flexDirection: "column",
            flexGrow: 1,
            paddingRight: "1rem",
          }}
        >
          {/* 旧数据 */}
          <div style={{ flexGrow: 1 }}>
            <div>
              {comments.map((item) => (
                <div
                  key={item.createdAt}
                  style={{
                    padding: "0.5rem",
                    marginBottom: "0.5rem",
                    background: "#fff",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "0.5rem",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        border: "none",
                        borderRadius: "3px",
                        background: "#291cfa24",
                        padding: "4px",
                        fontSize: "0.5rem",
                      }}
                    >
                      {dayjs(item.createdAt).format(fullDateStr)}:
                    </span>

                    <span
                      className="opacity"
                      onClick={() => {
                        setComments((i) => i.filter((j) => j.createdAt !== item.createdAt));
                      }}
                    >
                      <AiOutlineDelete
                        style={{ opacity: "0.4", fontSize: "0.7rem", cursor: "pointer" }}
                      />
                    </span>
                  </div>
                  <div className="select" style={{ wordBreak: "break-all" }}>
                    {item.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* 添加评注 */}
          <Input
            value={newComment}
            setValue={setNewComment}
            placeholder="备注？ 🦒"
            rightIcon={<AiOutlineEnter />}
            onKeyDown={(e) => {
              if (e.key === "Enter" && newComment.trim().length > 0) {
                setComments((i) =>
                  i.concat({ content: newComment, createdAt: dayjs().valueOf() })
                );
                setNewComment("");
              }
            }}
          />
        </MacScrollbar>
      </div>
    </>
  );
}
