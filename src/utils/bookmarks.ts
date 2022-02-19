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

export const search = async (query: string) => {
  console.log(query, "is query");

  return new Promise((resolve, reject) => {
    try {
      if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
      chrome.bookmarks.search(query, (res) => resolve(res));
    } catch (error) {
      reject(error as Error);
    }
  });
};

export const covertWordToBase64Icon = (char: string) => {
  const uid = `${(Math.random() * 10).toFixed(8)}_${char}`;
  
};
