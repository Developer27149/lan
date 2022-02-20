import "../style/ContentMenu.sass";

interface IProps {
  options: {
    text: string;
    callback: () => void;
  }[];
  left: number;
  top: number;
}

export default function ContentMenu({ options, left, top }: IProps) {
  if (options.length === 0) return null;
  return (
    <div className="context_menu" style={{ left: left + 20 + "px", top: top - 110 + "px" }}>
      {options.map(({ text, callback }, idx) => {
        return (
          <div
            key={idx}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              callback();
            }}
            className="item"
          >
            {text}
          </div>
        );
      })}
    </div>
  );
}
