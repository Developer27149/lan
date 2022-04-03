import "./loading.css";
import "./loading.sass";

export default function Loading() {
  return (
    <div className="loading-box">
      {/* <section className="loading"></section> */}
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
