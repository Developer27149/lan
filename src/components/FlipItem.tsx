import React, { useState, useEffect } from "react";

export default React.forwardRef<HTMLDivElement>((props, ref) => {
  const [num, setNum] = useState(9);
  const [numBack, setNumBack] = useState(0);
  useEffect(() => {
    setInterval(() => {
      setNum((i) => {
        const _num = i - 0.5;
        if (_num >= -0.5) {
          if (`${_num}`.endsWith(".5")) {
            setNumBack(~~_num);
          }
          return _num;
        } else {
          return 9;
        }
      });
    }, 500);
  }, []);
  return (
    <div ref={ref} className="clock_item">
      <h1>{numBack}</h1>
      <div className="top">
        <h1 data-main="true">{~~(num + 0.5)}</h1>
        <div className="h"></div>
      </div>
      {/* <div className="bottom">
        <h1 data-main="true">{~~(num + 0.5)}</h1>
      </div> */}
    </div>
  );
});
