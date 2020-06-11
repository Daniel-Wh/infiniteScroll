const postsContainer = document.getElementById("post-container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");

let limit = 5;
let page = 1;
let data;
// fetch post from api
async function getPost() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  ).then((response) => {
    if (response.status == 200) {
      showLoading();
      data = response.json();
    }
  });
  return data;
}

// show posts in DOM
async function showPosts() {
  showLoading();
  const posts = await getPost();

  // posts will be an array, iterate through and add to dom
  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
      <div class="number">${post.id}</div>
      <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
      </div>
      `;

    postsContainer.appendChild(postEl);
  });
}

//toggle loader
async function showLoading() {
  loading.classList.toggle("show");
}

function filterPosts(e) {
  const term = e.target.value.toUpperCase();

  const posts = document.querySelectorAll(".post");
  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText.toUpperCase();
    const body = post.querySelector(".post-body").innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
}
showPosts();

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    page++;
    showPosts();
  }
});

filter.addEventListener("input", filterPosts);
