const crntarticlecount = 11;

const articlesMeta = {
1: { title: "The US economy is experiencing a slowdown, with a 1% increase in median household income and a surge in interest in big tech stocks, amidst concerns about volatility and regulatory changes.", img: "https://image.cnbcfm.com/api/v1/image/108201555-17583167612025-09-19t211751z_1764404862_rc29vgaeytiy_rtrmadp_0_usa-trump.jpeg?v=1758316820&w=1920&h=1080",  date: "2025-09-20" },
  2: { title: "The US economy is facing a slowdown in consumer spending and business investment, prompting the government to consider tax cuts and increased spending to stimulate growth.", img: "https://image.cnbcfm.com/api/v1/image/108201555-17583167612025-09-19t211751z_1764404862_rc29vgaeytiy_rtrmadp_0_usa-trump.jpeg?v=1758316820&w=1920&h=1080",  date: "2025-09-20" },
  3: { title: "The US economy's growth may be unsustainable due to the record-high national debt, which could impact the number of H-1B visas issued.", img: "https://image.cnbcfm.com/api/v1/image/108201555-17583167612025-09-19t211751z_1764404862_rc29vgaeytiy_rtrmadp_0_usa-trump.jpeg?v=1758316820&w=1920&h=1080",  date: "2025-09-20" },
  4: { title: "The US Federal Reserve's rate cut has sparked a mixed reaction in the stock market, with some investors welcoming the stimulus while others express concerns about inflation and potential market bubbles.", img: "https://image.cnbcfm.com/api/v1/image/108201555-17583167612025-09-19t211751z_1764404862_rc29vgaeytiy_rtrmadp_0_usa-trump.jpeg?v=1758316820&w=1920&h=1080",  date: "2025-09-20" },
  5: { title: "The Trump administration's new $100,000 annual fee on H-1B visas is expected to increase labor costs for big tech companies, potentially leading to changes in their approach to talent acquisition.", img: "https://image.cnbcfm.com/api/v1/image/108201555-17583167612025-09-19t211751z_1764404862_rc29vgaeytiy_rtrmadp_0_usa-trump.jpeg?v=1758316820&w=1920&h=1080",  date: "2025-09-20" },
  6: { title: "The stock market has reached record highs despite economic complexities.", img: "https://image.cnbcfm.com/api/v1/image/108201555-17583167612025-09-19t211751z_1764404862_rc29vgaeytiy_rtrmadp_0_usa-trump.jpeg?v=1758316820&w=1920&h=1080",  date: "2025-09-20" },
  7: { title: "The US Federal Reserve's interest rate cut has not led to expected decreases in long-term rates.", img: "https://image.cnbcfm.com/api/v1/image/108201555-17583167612025-09-19t211751z_1764404862_rc29vgaeytiy_rtrmadp_0_usa-trump.jpeg?v=1758316820&w=1920&h=1080",  date: "2025-09-20" },
  8: { title: "Mortgage rates have unexpectedly increased following the US Federal Reserve's interest rate cut.", img: "https://image.cnbcfm.com/api/v1/image/108201555-17583167612025-09-19t211751z_1764404862_rc29vgaeytiy_rtrmadp_0_usa-trump.jpeg?v=1758316820&w=1920&h=1080",  date: "2025-09-20" },
  9: { title: "Rising 10-year Treasury yields are likely to further increase coffee prices due to tariffs amid ongoing trade tensions.", img: "https://image.cnbcfm.com/api/v1/image/108201485-1758310690688-gettyimages-2232204702-m36a9242.jpeg?v=1758310734&w=1920&h=1080",  date: "2025-09-21" },
  10: { title: "The S&P 500 and Nasdaq have driven the US stock market to new highs.", img: "https://image.cnbcfm.com/api/v1/image/108148105-1747763002538-108148105-1747758171199-NUP_207730_02334.JPG?v=1747763009&w=1920&h=1080",  date: "2025-09-24" },
  11: { title: "Investors are reassessing portfolio strategies amid AI-driven market shifts, with some considering more concentrated portfolios.", img: "https://image.cnbcfm.com/api/v1/image/107200469-1677528554271-NUP_200782_00155.jpg?v=1721682202&w=1920&h=1080",  date: "2025-09-24" }
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