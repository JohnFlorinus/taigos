const crntarticlecount = 0;

const articlesMeta = {};

function renderArticles(page = 1) {
  const perPage = 4;
  const start = crntarticlecount - (page - 1) * perPage;
  const container = document.querySelector("#articlesContainer");
  container.innerHTML = "";

  for (let i = start; i > start - perPage && i > 0; i--) {
    if (!articlesMeta[i]) continue;

    const meta = articlesMeta[i];
    container.innerHTML += `
      <div class="case">
        <div class="row">
          <div class="col-md-6 col-lg-6 col-xl-8 d-flex">
            <a href="articles/${i}.html" class="img w-100 mb-3 mb-md-0" style="background-image: url(${meta.img});"></a>
          </div>
          <div class="col-md-6 col-lg-6 col-xl-4 d-flex">
            <div class="text w-100 pl-md-3">
              <span class="subheading">${meta.date}</span>
              <h2 style="font-size: 2rem;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 7;overflow: hidden;text-overflow: ellipsis;"><a href="articles/${i}.html">${meta.title}</a></h2>
              <div class="meta">
                <p class="mb-0">2 min read</p>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  }
}

function renderPagination() {
  const totalPages = Math.ceil(crntarticlecount / 4);
  const pagination = document.querySelector("#pagination");
  pagination.innerHTML = "";

  for (let p = 1; p <= totalPages; p++) {
    pagination.innerHTML += `<li><a href="#" onclick="renderArticles(${p})">${p}</a></li>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderArticles(1);
  renderPagination();
});