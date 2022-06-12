import { ITodoItem } from "./const";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CgArrowLeft } from "react-icons/cg";
interface IProps {
  item?: ITodoItem;
  onExit: () => void;
}
export default function Render({ item, onExit }: IProps) {
  if (!item) return null;
  return (
    <div className="render-container">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <CgArrowLeft onClick={onExit} style={{ margin: "0 0.5rem", fontSize: "1.4rem" }} />
        <p className="render-time">{item.time}</p>
      </div>
      
      <h2 className="render-title">{item.title}</h2>

      <ReactMarkdown className="render-content markdown-body" remarkPlugins={[remarkGfm]}>
        {item.content}
      </ReactMarkdown>
    </div>
  );
}
