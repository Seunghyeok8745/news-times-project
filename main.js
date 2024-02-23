const API_Key = 'e1951a07c46347df87e230368a039c0d';
let newsList = [];

const categoryBtn = document.querySelectorAll('.menus button');
categoryBtn.forEach((menu) => {
  menu.addEventListener('click', (event) => getNewsByCategory(event));
});

const getLatestNews = async () => {
  const url = new URL(
    `https://news-times-projectbyshkim.netlify.app/top-headlines?apiKey=${API_Key}`
  );

  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
};

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  const url = new URL(
    `https://news-times-projectbyshkim.netlify.app/top-headlines?category=${category}&apiKey=${API_Key}`
  );
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
};

const getNewsBySearch = async () => {
  const keyword = textBar.value.toLowerCase();
  const categories = [
    'business',
    'entertainment',
    'health',
    'science',
    'sports',
    'technology',
    'general',
  ];
  if (categories.includes(keyword)) {
    const url = new URL(
      `https://news-times-projectbyshkim.netlify.app/top-headlines?country=kr&category=${keyword}&apiKey=${API_Key}`
    );
    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    if (newsList.length === 0) {
      alert(`No Result! Put Different Keyword`);
    } else {
      render();
    }
  } else {
    const url = new URL(
      `https://news-times-projectbyshkim.netlify.app/top-headlines?q=${keyword}&country=kr&apiKey=${API_Key}`
    );
    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    if (newsList.length === 0) {
      alert(`No Result! Put Different Keyword`);
    } else {
      render();
    }
  }
};

const textBar = document.getElementById('textSearch');
textBar.addEventListener('keydown', async (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    await getNewsBySearch();
  }
});

const render = () => {
  let newsHTML = '';
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

      let sources = news.source.name || 'No Source';

      let publishedAt = moment(news.publishedAt).fromNow();

      return `<div class="row news">
 <div class="col-lg-4 photo">
   <img class="news-image-size" src="${urlImage}" />
 </div>
 <div class="col-lg-8" id="content">
   <h2>${news.title}</h2>
   <p>${description}</p>
   <div class="author">${sources} * ${publishedAt}</div>
 </div>
</div>`;
    })
    .join('');
  document.getElementById('news-board').innerHTML = newsHTML;
};

getLatestNews();

let searchIcon = document.getElementById('search');
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
