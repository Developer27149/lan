import { Dispatch, HTMLProps, ReactNode } from "react";
import "../style/input.sass";
import cx from "classnames";

interface IProps extends HTMLProps<HTMLInputElement> {
  label?: string;
  value: string;
  setValue: Dispatch<React.SetStateAction<string>>;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export default function Input({
  label,
  name,
  value,
  setValue,
  className,
  leftIcon,
  rightIcon,
  style = {},
  ...rest
}: IProps) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {label && (
        <label
          htmlFor={name}
          style={{ paddingRight: "12px", width: `${label.length + 1.5}rem` }}
        >
          {label}:
        </label>
      )}
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        {leftIcon && (
          <div
            style={{
              position: "absolute",
              left: ".4rem",
              top: "11px",
            }}
          >
            {leftIcon}
          </div>
        )}
        <input
          {...rest}
          className={cx("custom-input", className)}
          style={{
            paddingLeft: leftIcon ? "1.3rem" : "auto",
            paddingRight: rightIcon ? "1.3rem" : "auto",
            ...style,
          }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {rightIcon && (
          <div
            style={{
              position: "absolute",
              right: ".4rem",
              top: "11px",
            }}
          >
            {rightIcon}
          </div>
        )}
      </div>
    </div>
  );
}
