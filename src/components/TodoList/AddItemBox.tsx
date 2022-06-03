import { Dispatch, SetStateAction, useState } from "react";
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
import { ETodoStatus, ITodoItem } from "./const";
import { useSetRecoilState } from "recoil";
import { todoListState } from "./status.js";

const { useForm, Item } = Form;

interface IProps {
  setIsAdding: Dispatch<SetStateAction<boolean>>;
}

export default function AddItemBox({ setIsAdding }: IProps) {
  const setTodoList = useSetRecoilState(todoListState);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [form] = useForm();
  const initValues = {
    dateRange: [dayjs(), dayjs()],
    isImportant: false,
    time: dayjs(),
  };

  const onBack = () => setIsAdding(false);

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
      comments: [],
    };
    setTodoList((todos) => {
      return [...todos, todoItem];
    });
    message.success("创建好了 🎉");
    onBack();
  };

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
              placeholder="干啥啊？"
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
                创建
              </Button>
            </Item>
          </Form>
        </div>
      </div>
      <div className="todo-content">
        <InputText.TextArea
          style={{
            height: "100%",
            resize: "none",
          }}
          placeholder="balabala...我还支持 Markdown 语法格式"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </>
  );
}
