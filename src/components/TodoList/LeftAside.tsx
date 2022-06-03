import dayjs from "dayjs";
import { FcTodoList, FcAlarmClock, FcAreaChart } from "react-icons/fc";
import { useRecoilState, useRecoilValue } from "recoil";
import { ETabs, ITodoItem, todoDayDateFormatStr } from "./const";
import { todoListState, todoPath } from "./status";
import Tag from "./Tag";

export default function LeftAside() {
  const [path, setPath] = useRecoilState(todoPath);
  const todoItems = useRecoilValue(todoListState);
  const items = [
    {
      name: "今日",
      key: ETabs.今日,
      icon: <FcAreaChart />,
      getCount: (items: ITodoItem[]) =>
        items.filter(
          (i) =>
            dayjs(i.createdAt).format(todoDayDateFormatStr) ===
            dayjs().format(todoDayDateFormatStr)
        ).length,
    },
    {
      name: "重要",
      key: ETabs.重要,
      icon: <FcAlarmClock />,
      getCount: (items: ITodoItem[]) => items.filter((i) => i.isImportant).length,
    },
    {
      name: "总览",
      key: ETabs.总览,
      icon: <FcTodoList />,
      getCount: (items: ITodoItem[]) => items.length,
    },
  ];
  return (
    <aside className="left-aside">
      <img src="/icons/64.png" alt="avatar" />
      <h4>Todo List</h4>
      <div className="tab-items">
        {items.map(({ name, key, icon, getCount }) => (
          <section className="tab-item" key={key} onClick={() => setPath(key)}>
            <div className="tab-item-li">
              {icon}
              <span>{name}</span>
            </div>
            <Tag isActivity={key === path} count={getCount(todoItems)} />
          </section>
        ))}
      </div>
    </aside>
  );
}
