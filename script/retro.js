const postContainer = document.getElementById("card-container");

async function allPost() {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/posts"
  );
  const data = await res.json();
  const posts = data.posts;
  displayPost(posts);
}

allPost();

function displayPost(posts) {
  for (const post of posts) {
    const card = document.createElement("div");
    card.classList = `bg-[#F3F3F5]  flex lg:flex-row flex-col lg:items-start items-center p-4 lg:p-10 rounded-lg lg:rounded-2xl gap-6 h-fit`;
    card.innerHTML = `              
  <!-- image and status section -->
  <div class="relative h-fit w-fit">
    <img
      src="${post.image}"
      class="w-16 h-16 rounded-md"
      alt=""
    />
    <div
      class=" ${
        post.isActive ? "bg-green-600" : "bg-red-600"
      } h-5 w-5 rounded-full border-2 border-[#F3F3F5] absolute -top-1 -right-1"
    ></div>
  </div>
  <!-- other info -->
  <div class="flex-1">
    <div
      class="flex lg:flex-row flex-col gap-2 lg:gap-5 items-center"
    >
      <h1 class="text-sm font-medium">#${post.category}</h1>
      <h1 class="text-sm font-medium">
        Author : ${post.author.name}
      </h1>
    </div>
    <h1

      class="mt-3 text-xl font-bold lg:text-left text-center"
    >
      ${post.title}
    </h1>
    <h1

      class="mt-4 text-base lg:text-left text-center"
    >
      ${post.description}
    </h1>
    <hr class="border-dashed border border-[#12132D40] mt-5" />
    <div
      class="mt-6 flex lg:flex-row flex-col gap-5 justify-between items-center text-base"
    >
      <div class="flex gap-6">
        <h1>
          <i class="fa-regular fa-message"></i>
          <span >${post.comment_count}</span>
        </h1>
        <h1>
          <i class="fa-regular fa-eye"></i>
          <span>${post.view_count}</span>
        </h1>
        <h1>
          <i class="fa-regular fa-clock"></i>
          <span>${post.posted_time} min</span>
        </h1>
      </div>
      <div
      onclick="readPost('${
        post.title.includes("'") ? post.title.replace("'", "*") : post.title
      }','${post.view_count}')"
        class="bg-green-600 text-white w-8 h-8 rounded-full flex justify-center items-center cursor-pointer"
      >
        <i class="fa-solid fa-envelope-open"></i>
      </div>
    </div>
  </div>
    </div>`;
    postContainer.appendChild(card);
  }
}

let count = 0;
function readPost(name, view) {
  const readCount = document.getElementById("read-count");
  count++;
  readCount.innerText = count;
  const readSection = document.getElementById("read");
  const readMsg = document.createElement("div");
  readMsg.classList = `mt-2 lg:mt-5 bg-white p-2 lg:p-4 rounded-lg lg:rounded-2xl flex gap-1 lg:gap-0 items-center`;
  readMsg.innerHTML = `
    <h1 class="text-sm lg:text-base font-semibold flex-1">
    ${name.includes(":") ? name.replace("*", "'") : name}
  </h1>
  <div class="">
    <i class="fa-regular fa-eye"></i> ${view}
  </div>`;
  readSection.appendChild(readMsg);
}

async function search() {
  const searchField = document.getElementById("search");
  const searchFieldValue = searchField.value;
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchFieldValue}`
  );
  const data = await res.json();
  const posts = data.posts;
  postContainer.textContent = "";
  displayPost(posts);
  searchField.value = "";
}
