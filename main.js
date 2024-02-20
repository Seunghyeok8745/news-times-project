const API_Key = 'e1951a07c46347df87e230368a039c0d';
let news = [];
const getLatestNews = async () => {
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_Key}`
  );

  console.log(url);

  const response = await fetch(url); //API 호출
  const data = await response.json();
  news = data.articles;
  console.log(news);
};
getLatestNews();

// async 비동기 처리
//await   비동기를 기다리고 실행, 미입력시 pending으로 표시됨
