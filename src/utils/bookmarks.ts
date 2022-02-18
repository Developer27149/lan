export const getTree = async () => {
  return new Promise((resolve, reject) => {
    try {
      chrome.bookmarks.getTree((res) => {
        resolve(res);
      });
    } catch (error) {
      reject(error);
    }
  });
};
