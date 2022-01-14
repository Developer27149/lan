import { FormEvent, useEffect, useRef, useState } from "react";
import { useSearch } from "../hooks/useSearch";

export default function Search() {
  const inpRef = useRef<HTMLInputElement>(null);
  const { EngineIcon, handleEngineKeyword, curKeyword } = useSearch();
  const [value, setValue] = useState("");
  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const v = e.currentTarget.value;
    if (v !== "" && !new RegExp(`/^${curKeyword} /`).test(v)) {
      const k = v[0] as "g" | "z" | "b";
      handleEngineKeyword(k);
    } else {
      setValue(v);
    }
  };
  useEffect(() => {
    if (inpRef.current) {
      inpRef.current.focus();
    }
  }, []);
  return (
    <div className="search-box">
      <input
        type="text"
        ref={inpRef}
        value={value}
        onChange={handleInputChange}
      />
      <span className="icon">
        <EngineIcon />
      </span>
    </div>
  );
}
