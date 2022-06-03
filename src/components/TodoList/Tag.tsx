import { tagColor } from "./const";

interface IProps extends React.HTMLProps<HTMLDivElement> {
  count: number;
  bgColor?: string;
  isActivity: boolean;
}

export default function Tag({ count, bgColor = tagColor, isActivity, ...rest }: IProps) {
  return (
    <div
      className="tab-tag"
      style={{ backgroundColor: bgColor, opacity: isActivity ? "1" : 0.2 }}
      {...rest}
    >
      {count}
    </div>
  );
}
