const crntarticlecount = 23;

const articlesMeta = {
1: { title: "The 10-year Treasury yield reached a 2-week high, defying expectations of a decline following the US Federal Reserve's interest rate cut.", img: "https://image.cnbcfm.com/api/v1/image/108201555-17583167612025-09-19t211751z_1764404862_rc29vgaeytiy_rtrmadp_0_usa-trump.jpeg?v=1758316820&w=1920&h=1080",  date: "2025-09-20" },
  2: { title: "Rising long-term interest rates contrast with the US Federal Reserve's recent interest rate cut.", img: "https://image.cnbcfm.com/api/v1/image/108201325-1758296116975-gettyimages-2171459190-hhhmatucoupslowlifegettybf2024hhh204.jpeg?v=1758296305&w=1920&h=1080",  date: "2025-09-21" },
  3: { title: "Oracle's leadership transition is proceeding with minimal disruption under Safra Catz and new co-CEOs.", img: "https://image.cnbcfm.com/api/v1/image/108196250-1757438255413-gettyimages-2207639855-TFSPI_02042025-6095.jpeg?v=1758538599&w=1920&h=1080",  date: "2025-09-22" },
  4: { title: "US economic growth is likely to decelerate this year despite a slightly more optimistic revised forecast from the OECD.", img: "https://image.cnbcfm.com/api/v1/image/107009544-1643734747012-gettyimages-1300924332-a53i8166_20210207102128309.jpeg?v=1727735662&w=1920&h=1080",  date: "2025-09-23" },
  5: { title: "Amazon's stock may offer a buying opportunity due to improving trends in its AWS cloud-computing business.", img: "https://image.cnbcfm.com/api/v1/image/107200469-1677528554271-NUP_200782_00155.jpg?v=1721682202&w=1920&h=1080",  date: "2025-09-24" },
  6: { title: "Earnings reports are significantly influencing the stock market, with AI-driven demand boosting certain companies while others struggle with declining sales.", img: "https://image.cnbcfm.com/api/v1/image/108202390-1758571024707-Hip_177_3_Million_Gun_Runner_Colt_at_KEE_Sept_Yearling_Sale1.jpeg?v=1758650035&w=1920&h=1080",  date: "2025-09-25" },
  7: { title: "US consumer spending and a stable labor market support the economy, potentially allowing for interest rate cuts.", img: "https://image.cnbcfm.com/api/v1/image/106950335-16330213422021-09-30t170025z_347214335_rc2rvp94a9pp_rtrmadp_0_aurora-autonomous.jpeg?v=1633021398&w=1920&h=1080",  date: "2025-09-26" },
  8: { title: "Physical gold is subject to capital gains tax, with tax rates ranging from 0% to 28%.", img: "https://image.cnbcfm.com/api/v1/image/108201471-1758310089160-IMG_9072.jpg?v=1758945050&w=1920&h=1080",  date: "2025-09-27" },
  9: { title: "Modular housing may revive affordable home ownership.", img: "https://image.cnbcfm.com/api/v1/image/108204002-1758818988251-gabbys-dollhouse-the-movie-gallery-2b_Cropped.jpg?v=1758819110&w=1920&h=1080",  date: "2025-09-28" },
  10: { title: "The 60/40 stock and bond portfolio has historically performed well in overvalued markets.", img: "https://image.cnbcfm.com/api/v1/image/108202852-1758644923424-gettyimages-2198911819-aoa123.jpeg?v=1758644969&w=1920&h=1080",  date: "2025-09-29" },
  11: { title: "The Federal Reserve may cut interest rates in response to ongoing economic concerns.", img: "https://image.cnbcfm.com/api/v1/image/108196238-17574378542025-09-09t170710z_101730336_rc2dogafrgz1_rtrmadp_0_usa-stocks.jpeg?v=1757438034&w=1920&h=1080",  date: "2025-09-30" },
  12: { title: "Treasury yields remain flat amid ongoing market uncertainty.", img: "https://image.cnbcfm.com/api/v1/image/108205811-1759248258700-gettyimages-2238328629-wm029751_kj9ps1cp.jpeg?v=1759248296&w=1920&h=1080",  date: "2025-10-01" },
  13: { title: "US job cuts rose to 34,000 in September, sparking concerns about labor market weakness.", img: "https://image.cnbcfm.com/api/v1/image/108206556-1759338420094-gettyimages-2192441205-poolside-035.jpeg?v=1759338432&w=1920&h=1080",  date: "2025-10-02" },
  14: { title: "The top 1% now hold a record $52 trillion in wealth, driven largely by the AI frenzy.", img: "https://image.cnbcfm.com/api/v1/image/108176674-1753386632366-gettyimages-2222164870-economou-notitle250618_np6Q5.jpeg?v=1759495022&w=1920&h=1080",  date: "2025-10-03" },
  15: { title: "Market concerns are rising over potential bubbles in sectors such as AI and cryptocurrency.", img: "https://image.cnbcfm.com/api/v1/image/108207705-1759514304709-gettyimages-495359451-80179736.jpeg?v=1759514344&w=1920&h=1080",  date: "2025-10-04" },
  16: { title: "US government shutdown and automotive market uncertainties are heightening financial strain on low-wage workers and contributing to job cuts.", img: "https://image.cnbcfm.com/api/v1/image/108207842-1759525669684-Audrey_Willie.jpg?v=1759526057&w=1920&h=1080",  date: "2025-10-05" },
  17: { title: "Verizon's leadership change and major corporate deals, including Fifth Third Bancorp's acquisition of Comerica, have occurred amid a surging US stock market driven by AI-related sectors.", img: "https://image.cnbcfm.com/api/v1/image/106351594-1579791977326dsc03513r.jpg?v=1579792034&w=1920&h=1080",  date: "2025-10-06" },
  18: { title: "Nvidia's stock may rise another 45%.", img: "https://image.cnbcfm.com/api/v1/image/108207529-1759500790003-INSIDE_ALT_MICHAEL_AROUGHETI_STILL_6.jpg?v=1759500852&w=1920&h=1080",  date: "2025-10-07" },
  19: { title: "Intel's stock could decline by 35% if it fails to secure a technology deal with TSMC.", img: "https://image.cnbcfm.com/api/v1/image/108199747-1758092929754-gettyimages-2219786637-_r7a2815_upctx9ds.jpeg?v=1759240120&w=1920&h=1080",  date: "2025-10-08" },
  20: { title: "Economic data releases will likely influence the Federal Reserve's upcoming rate cut decisions.", img: "https://image.cnbcfm.com/api/v1/image/108036011-17266821802024-09-18t175528z_1079585413_rc253aa41xjh_rtrmadp_0_usa-fed-stocks.jpeg?v=1728093115&w=1920&h=1080",  date: "2025-10-09" },
  21: { title: "Nvidia's approval to sell chips to the UAE and OpenAI's deal with AMD are driving tech market developments.", img: "",  date: "2025-10-10" },
  22: { title: "Morgan Stanley's wealth management division is broadening access to cryptocurrencies for its clients, starting with Bitcoin funds.", img: "https://image.cnbcfm.com/api/v1/image/107060539-1652391835772-220305_IMG_0726.jpg?v=1696026975&w=1920&h=1080",  date: "2025-10-11" },
  23: { title: "Institutions are expected to increase digital asset allocations to 16% by 2028, according to a State Street survey.", img: "",  date: "2025-10-12" }
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