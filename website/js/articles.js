const crntarticlecount = 4;

const articlesMeta = {
1: { title: "The 10-year Treasury yield reached a 2-week high, defying expectations of a decline following the US Federal Reserve's interest rate cut.", img: "https://image.cnbcfm.com/api/v1/image/108201555-17583167612025-09-19t211751z_1764404862_rc29vgaeytiy_rtrmadp_0_usa-trump.jpeg?v=1758316820&w=1920&h=1080",  date: "2025-09-20" },
  2: { title: "Rising long-term interest rates contrast with the US Federal Reserve's recent interest rate cut.", img: "https://image.cnbcfm.com/api/v1/image/108201325-1758296116975-gettyimages-2171459190-hhhmatucoupslowlifegettybf2024hhh204.jpeg?v=1758296305&w=1920&h=1080",  date: "2025-09-21" },
  3: { title: "Oracle's leadership transition is proceeding with minimal disruption under Safra Catz and new co-CEOs.", img: "https://image.cnbcfm.com/api/v1/image/108196250-1757438255413-gettyimages-2207639855-TFSPI_02042025-6095.jpeg?v=1758538599&w=1920&h=1080",  date: "2025-09-22" },
  4: { title: "US economic growth is likely to decelerate this year despite a slightly more optimistic revised forecast from the OECD.", img: "https://image.cnbcfm.com/api/v1/image/107009544-1643734747012-gettyimages-1300924332-a53i8166_20210207102128309.jpeg?v=1727735662&w=1920&h=1080",  date: "2025-09-23" }
};

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