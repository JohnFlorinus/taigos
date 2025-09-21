# 📈 Autonomously-Updated Financial News Aggregator with LLM-Generation

![GitHub Workflow](https://img.shields.io/github/actions/workflow/status/JohnFlorinus/taigos/daily.yml?label=Daily%20Update)  
![Made with C#](https://img.shields.io/badge/Made%20with-C%23-239120?logo=c-sharp&logoColor=white)  
![Cloudflare](https://img.shields.io/badge/Powered%20by-Cloudflare-orange?logo=cloudflare)

🔗 **Live Demo**: [https://taigos.com](https://taigos.com)

---

## 🌐 Project Overview
**Taigos** is a fully autonomous **financial news aggregation website** that updates itself **once every 24 hours** with fresh stock market and crypto headlines.  

- ✅ **No database required** → all articles are generated as `.html` files and committed directly to the repo.  
- ✅ **Zero hosting costs** → the site is deployed via **Cloudflare Pages**, leveraging GitHub Actions (GHA) and Wrangler.  
- ✅ **AI summaries** → every article is summarized using **Cloudflare Workers AI (LLaMA LLM)**.  
- ✅ **Minimalistic & Screen Responsive frontend** → based on the [Readit Bootstrap Template](https://preview.colorlib.com/theme/readit/).  

---

## 🛠️ How It Works

### 🔄 Daily Update Cycle
1. **GitHub Actions Cron Job**  
   - Runs every 24 hours (`schedule: cron`).  
   - Executes the compiled **C# .NET 9 console application**.  

2. **Fetch Financial News**  
   - Retrieves latest stock & crypto news via the **Finnhub API**.  

3. **Summarization with AI**  
   - Sends raw article text to **Cloudflare Workers AI**.  
   - Uses a **LLaMA-based LLM** to generate:  
     - ✍️ A rewritten article.  
     - 📌 A short summary.
     - 🏷️ A concise title.

4. **Static File Generation**  
   - Creates new `.html` article pages.  
   - Updates a **JavaScript index file** (regex-based) so that articles dynamically load into `index.html`.  

5. **Commit & Deploy**  
   - The app runs `git add/commit/push`.  
   - Push triggers **Wrangler + Cloudflare Pages CI/CD**, publishing updates instantly.  

---

## ⚡ Why No Database?
Unlike traditional news apps, **Taigos avoids databases entirely**:
- All content is **static HTML + JSON/JS**, version-controlled in GitHub.  
- Updates are just new commits, keeping infrastructure **100% free**.  
- Hosting & deployment handled seamlessly by **Cloudflare Pages**.  

---

## 📂 Tech Stack

- **Backend Logic**:  
  ![.NET](https://img.shields.io/badge/.NET%209-512BD4?logo=dotnet&logoColor=white)  
  C# console application for fetching & processing news.  

- **AI Summarization**:  
  ![Cloudflare Workers](https://img.shields.io/badge/Cloudflare%20Workers%20AI-orange?logo=cloudflare)  
  LLaMA LLM models via Cloudflare Workers AI API.  

- **Frontend**:  
  ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)  
  ![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?logo=bootstrap&logoColor=white)  
  Based on the [Readit template](https://preview.colorlib.com/theme/readit/).  

- **Automation & Deployment**:  
  ![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?logo=github-actions&logoColor=white)  
  ![Cloudflare Pages](https://img.shields.io/badge/Cloudflare%20Pages-F38020?logo=cloudflare&logoColor=white)  
  CICD pipeline ensures daily updates & automatic deployments.  

---

## 🚀 How to use

### Prerequisites
- [.NET 9 SDK](https://dotnet.microsoft.com/)  
- [Git](https://git-scm.com/)  
- API keys for:
  - Finnhub (news source)  
  - Cloudflare Workers AI (summarization)
    Names for environment variables can be found in the GHA YAML file.
