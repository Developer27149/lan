import React from "react";
import "../style/switchOptions.sass";

interface IProps {
  options: string[];
  currentOption: string;
  handleSwitch: (option: string) => void;
  title: string;
}
export default React.memo(function SwitchOptions(props: IProps) {
  const { options, title, currentOption, handleSwitch } = props;
  return (
    <div className="switch-options-container">
      <h4>{title}</h4>
      <div className="items">
        {options.map((option, idx) => {
          return (
            <div
              className={`${option === currentOption ? "item active" : "item"}`}
              key={idx}
              onClick={() => handleSwitch(option)}
            >
              {option}
            </div>
          );
        })}
      </div>
    </div>
  );
});
