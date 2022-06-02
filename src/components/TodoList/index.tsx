import LeftAside from "./LeftAside";
import RightAside from "./RightAside";
import "./style.sass";

export default function TodoList() {
  return (
    <div className="todo-box">
      <div className="todo-container">
        <LeftAside />
        <RightAside />
      </div>
    </div>
  );
}
