const URL = `https://newsapi.org/v2/top-headlines?language=en&category=technology&category=sciencefrom=2022-06-27&sortBy=popularity&apiKey=e63ec7a673dc45059196be8de48a3048`;
const container = document.getElementById('container');

const btn = document.createElement('button');
btn.setAttribute('id', 'btn');
btn.textContent = 'Load more news';
let Counter_elementsOutputed = 0;
let randomIndexesArr = [];
const getRandomArray = (arr, start) => {
  let result = [];
  let end = start + 6;
  if (start + 6 > arr.length) {
    end = arr.length;
  }
  for (let i = start; i < end; i++) {
    result.push(arr[i]);
  }
  return result;
};

const fetchData = async () => {
  try {
    const result = await fetch(URL);
    const Data = await result.json();
    console.log(Data.articles);
    return Data.articles;
  } catch (e) {
    console.error(e);
  }
};

const SixRandomArticle = async () => {
  try {
    const articles = await fetchData();
    const randomArticles = getRandomArray(articles, Counter_elementsOutputed);
    Counter_elementsOutputed += 6;
    console.log(randomArticles);
    return randomArticles;
  } catch (e) {
    console.error(e);
  }
};

const displayData = async () => {
  try {
    const articlesTodisplay = await SixRandomArticle();
    if (articlesTodisplay.length === 0) {
      alert('no more news');
    }
    articlesTodisplay.forEach((item) => {
      const title = item.title == null ? '' : item.title;
      const description = item.description == null ? '' : item.description;
      const img = item.urlToImage == null ? '' : item.urlToImage;
      const url = item.url == null ? '' : item.url;
      const date =
        new Date(item.publishedAt) == null ? '' : new Date(item.publishedAt);
      const author = item.author == null ? '' : item.author;

      container.innerHTML += `
      <article>
        <h2><a href="${url}" target="_blank">${title}</a></h2>
        <img src="${img}" alt="" />
        <p class="desc">${description}</p>
        <p class="author">Author: ${author}</p>
        
        <p class="date">${date.toDateString()}</p>
      </article>
      `;
    });
  } catch (e) {
    console.error(e);
  }
};

displayData()
  .then(() => {
    document.body.append(btn);
  })

  .then(() => {
    setInterval(() => {
      container.innerHTML = '';
      displayData();
      console.log('next');
    }, 1000 * 60 * 60 * 60);
  });

btn.addEventListener('click', displayData);
