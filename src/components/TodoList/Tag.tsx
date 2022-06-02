interface IProps {
  count: number;
  bgColor: string;
}

export default function Tag({ count, bgColor }: IProps) {
  return (
    <div className="tab-tag" style={{ backgroundColor: bgColor }}>
      {count}
    </div>
  );
}
