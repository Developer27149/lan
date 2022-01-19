import { FcAbout, FcApproval, FcHighPriority } from "react-icons/fc";
interface IProps {
  type: "error" | "info" | "success";
  text: string;
}
export default function Message(props: IProps) {
  const { type, text } = props;
  return (
    <div className="msg">
      <section className="icon">
        {type === "info" ? (
          <FcAbout />
        ) : type === "success" ? (
          <FcApproval />
        ) : (
          <FcHighPriority />
        )}
      </section>
      <section className="text">{text}</section>
    </div>
  );
}
