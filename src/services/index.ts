export const getThisWeekData = async (): Promise<
  {
    images: {
      startdate: string;
      fullstartdate: string;
      enddate: string;
      urlbase: string;
      copyright: string;
    }[];
  } & unknown
> => {
  const data = await fetch("https://cn.bing.com/HPImageArchive.aspx?format=js&n=6&uhd=1");
  const jsonData = await data.json();
  console.log(jsonData);

  return jsonData;
};
