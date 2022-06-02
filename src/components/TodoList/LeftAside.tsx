import { FcTodoList, FcAlarmClock, FcAreaChart } from "react-icons/fc";
import { ETabs } from "./const";
import Tag from "./Tag";

export default function LeftAside() {
  const items = [
    {
      name: "今日",
      key: ETabs.今日,
      icon: <FcAreaChart />,
    },
    {
      name: "重要",
      key: ETabs.重要,
      icon: <FcAlarmClock />,
    },
    {
      name: "总览",
      key: ETabs.总览,
      icon: <FcTodoList />,
    },
  ];
  return (
    <aside className="left-aside">
      <img src="/icons/64.png" alt="avatar" />
      <h4>Todo List</h4>
      <div className="tab-items">
        {items.map(({ name, key, icon }) => (
          <section className="tab-item" key={key}>
            <div className="tab-item-li">
              {icon}
              <span>{name}</span>
            </div>
            <Tag count={30} bgColor={"orange"} />
          </section>
        ))}
      </div>
    </aside>
  );
}
