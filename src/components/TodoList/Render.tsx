import { ITodoItem } from "./const";

interface IProps {
  item?: ITodoItem;
  onExit: () => void;
}
export default function Render({ item }: IProps) {
  if (!item) return null;
  return (
    <div className="render-container">
      <h2 className="render-title">{item.title}</h2>
      <p className="render-time">{item.time}</p>
      <div className="render-content">{item.content}</div>
    </div>
  );
}
