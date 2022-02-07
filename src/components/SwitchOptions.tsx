import React from "react";
import "../style/switchOptions.sass";

interface IProps {
  options: {
    text: string;
    onClickEvent: () => void;
    active: boolean;
  }[];
  title: string;
}
export default React.memo(function SwitchOptions(props: IProps) {
  const { options, title } = props;
  return (
    <div className="switch-options-container">
      <h4>{title}</h4>
      <div className="items">
        {options.map(({ text, onClickEvent, active }, idx) => {
          return (
            <section
              className={`${active ? "item active" : "item"}`}
              key={text + idx}
              onClick={onClickEvent}
            >
              {text}
            </section>
          );
        })}
      </div>
    </div>
  );
});
