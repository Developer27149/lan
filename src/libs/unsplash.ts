const access_key = "ETQLApk4L6g__-ELS59ONCB_e8oAjqtgWYgzDl76-9I";
const secret_key = "yGNo5qZESOtD6APPiNNk2MLP1Ml9-TGECmHu5RvX0fs";

const headers = new Headers();
headers.append("Content-Type", "application/json");
const url = `https://api.unsplash.com/collections/?client_id=${access_key}`;

const request = async () => {
  const res = await fetch(url);
  console.log(res);
};

export { request };
