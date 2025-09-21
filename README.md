# 📰 Autonomous News Aggregator with LLM-Generation - <a href="https://taigos.com">🔗 **Live Demo**</a>

---

## 🌐 Project Overview
This is a fully autonomous **financial news aggregation website** that updates itself **once every 24 hours** with fresh stock market and crypto headlines.  

- ✅ **No database required** → all articles are generated as `.html` files and committed directly to the repo.  
- ✅ **Zero hosting costs** → the site is deployed via **Cloudflare Pages**, leveraging GitHub Actions (GHA) and Wrangler.  
- ✅ **AI summaries** → the daily news is summarized using **Cloudflare Workers AI (LLaMA LLM)**.  
- ✅ **Minimalistic & Screen Responsive frontend** → based on the [Readit Bootstrap Template](https://preview.colorlib.com/theme/readit/).  

⚠️ This **README** was AI-generated for better readability and structure. However, the project itself was manually coded by myself although the frontend was heavily based on a premade HTML5 template.

---

## 🛠️ How It Works

### 🔄 Daily Update Cycle
1. **GitHub Actions Cron Job**  
   - Runs once every 24 hours at 12:30 UTC before the US stock market opens.  
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
Unlike traditional news apps, this project avoids databases entirely:  
- All content is **static HTML + JSON/JS**, version-controlled in GitHub.  
- Updates are just new commits, keeping infrastructure **100% free**.  
- Hosting & deployment handled seamlessly by **Cloudflare Pages**.  

---

## 📂 Tech Stack

- **Backend Logic**:  
  ![C#](https://img.shields.io/badge/C%23%20.NET%209-239120?logo=csharp)<br>
  C# console application for generating new articles.

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

🔑 Environment variable names can be found in the GitHub Actions YAML file.  
