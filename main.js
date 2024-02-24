const API_Key = 'e1951a07c46347df87e230368a039c0d';
let newsList = [];

const categoryBtn = document.querySelectorAll('.menus button');
categoryBtn.forEach((menu) => {
  menu.addEventListener('click', (event) => getNewsByCategory(event));
});

let url = new URL(
  `https://news-times-projectbyshkim.netlify.app/top-headlines?country=us&apiKey=${API_Key}`
);

let totalResult = 0;
let page = 1;
let pageSize = 10;
let groupSize = 5;

const getNews = async () => {
  try {
    url.searchParams.set('page', page); // &page=page
    url.searchParams.set('pagesize', pageSize);
    const response = await fetch(url);
    const data = await response.json();
    console.log('ddd', data);
    if (response.status === 200) {
      if (data.articles.length == 0) {
        hidePageNation();
        throw new Error('No result found');
      }
      newsList = data.articles;
      totalResult = data.totalResults;
      render();
      pageNationRender();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
  }
};

const getLatestNews = async () => {
  url = new URL(
    `https://news-times-projectbyshkim.netlify.app/top-headlines?apiKey=${API_Key}`
  );

  getNews();
};

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  url = new URL(
    `https://news-times-projectbyshkim.netlify.app/top-headlines?category=${category}&apiKey=${API_Key}`
  );
  page = 1;
  getNews();
};

const menuSide = document.querySelectorAll('#toggleButton');
menuSide.forEach((menu) => {
  menu.addEventListener('click', (event) => getNewsByCategory(event));
});

const getNewsBySearch = async () => {
  const keyword = textBar.value.toLowerCase();
  if (keyword === '') {
    alert('Please enter a keyword before searching.');
    return;
  }
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
    url = new URL(
      `https://news-times-projectbyshkim.netlify.app/top-headlines?country=kr&category=${keyword}&apiKey=${API_Key}`
    );

    if (newsList.length === 0) {
      alert(`No Result! Put Different Keyword`);
    } else {
      getNews();
    }
  } else {
    url = new URL(
      `https://news-times-projectbyshkim.netlify.app/top-headlines?q=${keyword}&country=kr&apiKey=${API_Key}`
    );
    if (newsList.length === 0) {
      alert(`No Result! Put Different Keyword`);
    } else {
      getNews();
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

const errorRender = (errorMessage) => {
  const errorHTML = `<div class="errorArea">
  <img src="./errorImage.jpg" alt="error-message">
          <h3>${errorMessage}</h3>
          <p>We couldn't find what you search for <br> Try searching again.</p>
          </div>`;
  document.getElementById('news-board').innerHTML = errorHTML;
};

const pageNationRender = () => {
  const pageGroup = Math.ceil(page / groupSize);
  const totalPages = Math.ceil(totalResult / pageSize);
  let lastPage = pageGroup * groupSize;
  if (lastPage > totalPages) {
    lastPage = totalPages;
  }
  const firstPage =
    lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

  let pageNationHTML = '';
  pageNationHTML += `<li class="page-item ${
    page === 1 ? 'disabled' : ''
  }" onclick ="moveToPage(${page - 1 > 0 ? page - 1 : 1})" >
<a class="page-link" aria-label="Previous">
  <span aria-hidden="true">&laquo;</span>
</a>
</li>`;

  for (let i = firstPage; i <= lastPage; i++) {
    pageNationHTML += ` <li class="page-item ${
      i === page ? 'active' : ''
    }" onclick = "moveToPage(${i})"><a class="page-link">${i}</a></li>`;
  }

  pageNationHTML += `<li class="page-item ${
    page === totalPages ? 'disabled' : ''
  }" onclick="moveToPage(${page + 1 <= totalPages ? page + 1 : totalPages})">
  <a class="page-link" aria-label="Next">
    <span aria-hidden="true">&raquo;</span>
  </a>
</li>`;

  document.querySelector('.pagination').innerHTML = pageNationHTML;
};

const moveToPage = (pageNum) => {
  console.log('test', pageNum);
  page = pageNum;
  getNews();
};

const hidePageNation = () => {
  document.querySelector('.pagination').innerHTML = '';
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
    textBar.style.opacity = '0';
    headButton.style.opacity = '0';
    setTimeout(() => {
      textBar.style.opacity = '1';
      headButton.style.opacity = '1';
    }, 100);
    searchIcon.classList.add('active');
  } else {
    textBar.style.opacity = '0';
    headButton.style.opacity = '0';
    setTimeout(() => {
      textBar.style.display = 'none';
      headButton.style.display = 'none';
    }, 200);
    searchIcon.classList.remove('active');
  }
});

textBar.addEventListener('focus', function () {
  textBar.value = '';
});

headButton.addEventListener('click', getNewsBySearch);

burgerMenu.addEventListener('click', function openNav() {
  navBar.style.width = '210px';
});

xButton.addEventListener('click', function closeNav() {
  navBar.style.width = '0';
});
