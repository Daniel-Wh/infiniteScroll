const postsContainer = document.getElementById("post-container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");

let limit = 3;
let page = 1;

// fetch post from api
async function getPost() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&page=${page}`
  );

  const data = await res.json();

  return data;
}

// show posts in DOM
async function showPosts() {
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

showPosts();
