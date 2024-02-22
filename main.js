const API_Key = 'e1951a07c46347df87e230368a039c0d';
let newsList = [];
let categoryBtn = document.querySelectorAll('.menus button');

categoryBtn.forEach((menu) => {
  menu.addEventListener('click', (event) => getNewsByCategory(event));
});

const getLatestNews = async () => {
  const url = new URL(
    `https://news-times-projectbyshkim.netlify.app/top-headlines?country=us&apiKey=${API_Key}`
  );

  console.log(url);

  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
  console.log(newsList);
};

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  //  event.target = 이벤트가 발생한 요소
  // textContent 속성을 사용하면 해당 요소의 텍스트 콘텐츠를 가져옴
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_Key}`
  );
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  newsList = data.articles;
  render();
};

const getNewsBySearch = async () => {
  const keyword = textBar.value.toLowerCase();
  const url = new URL(
    `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${API_Key}`
  );
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
};

const render = () => {
  let newsHTML = ``;
  newsHTML = newsList
    .map((news) => {
      let description = news.description || '';
      if (description.length > 200) {
        description = description.substring(0, 200) + '...';
      } else if (description === '') {
        description = 'No Content';
      }

      let urlImage =
        news.urlToImage ||
        'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg';

      let sources = news.source.name;
      if (!sources) {
        sources = 'no source';
      }

      let publishedAt = moment(news.publishedAt).fromNow();

      return `<div class="row news">
 <div class="col-lg-4 photo">
   <img
     class="news-image-size"
     src=${urlImage}
   />
 </div>
 <div class="col-lg-8" id="content">
   <h2>${news.title}</h2>
   <p>
     ${description}
   </p>
   <div class="author">${sources} * ${publishedAt}</div>
 </div>
</div>`;
    })
    .join('');
  document.getElementById('news-board').innerHTML = newsHTML;
};

getLatestNews();

let searchIcon = document.getElementById('search');
let textBar = document.getElementById('textSearch');
let headButton = document.getElementById('goButton');
let navBar = document.getElementById('sideNav');
let burgerMenu = document.getElementById('burger');
let xButton = document.querySelector('#closeButton');
let isDisplayed = false;

searchIcon.addEventListener('click', function () {
  isDisplayed = !isDisplayed;

  if (isDisplayed) {
    textBar.style.display = 'inline';
    headButton.style.display = 'inline';
    searchIcon.classList.add('active');
  } else {
    textBar.style.display = 'none';
    headButton.style.display = 'none';
    searchIcon.classList.remove('active');
  }
});

textBar.addEventListener('focus', function () {
  textBar.value = '';
});

headButton.addEventListener('click', getNewsBySearch);

burgerMenu.addEventListener('click', function openNav() {
  navBar.style.width = '230px';
});

xButton.addEventListener('click', function closeNav() {
  navBar.style.width = '0';
});

textBar.addEventListener('keydown', function (event) {
  if (event.keyCode === 13) {
    if (textBar.value === '') {
      alert('Please enter a keyword!');
    } else {
      getNewsBySearch();
    }
  }
});
