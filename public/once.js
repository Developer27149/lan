window.onload = () => {
  var body = document.body;
  body.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    console.log("click right key");
  });
};
