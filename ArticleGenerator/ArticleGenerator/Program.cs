using ArticleGenerator.objects;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using static System.Reflection.Metadata.BlobBuilder;

namespace ArticleGenerator
{
    public class Program
    {
        public static string FINNHUB_MARKET_NEWS_URL = "";
        public static string FINNHUB_CRYPTO_NEWS_URL = "";
        public static string CF_API_KEY = "";
        public static string CF_ACCOUNT_ID = "";

        static async Task Main(string[] args)
        {
            // SECRETS LOADING
            var envPath = Path.Combine(Directory.GetCurrentDirectory(), ".env");
            if (File.Exists(envPath))
            {
                foreach (var line in File.ReadAllLines(envPath))
                {
                    if (string.IsNullOrWhiteSpace(line) || line.StartsWith("#"))
                        continue;

                    var parts = line.Split('=', 2, StringSplitOptions.RemoveEmptyEntries);
                    if (parts.Length == 2)
                    {
                        Environment.SetEnvironmentVariable(parts[0].Trim(), parts[1].Trim());
                    }
                }
            } else
            {
                Console.WriteLine("No local secrets found, relying on production environment variables.");
            }


                FINNHUB_MARKET_NEWS_URL = Environment.GetEnvironmentVariable("FINNHUB_MARKET_NEWS_URL");
            FINNHUB_CRYPTO_NEWS_URL = Environment.GetEnvironmentVariable("FINNHUB_CRYPTO_NEWS_URL");
            CF_API_KEY = Environment.GetEnvironmentVariable("CF_API_KEY");
            CF_ACCOUNT_ID = Environment.GetEnvironmentVariable("CF_ACCOUNT_ID");

            Console.WriteLine("Getting previous article to prevent repetition...");
            ArticleItem previousArticle = await WebMod.GetLatestArticle();

            Console.WriteLine("Getting Latest News...");
            string newsContent = await ApiService.GetNews(previousArticle.ImageUrl);

            Console.WriteLine("Generating Article Essay...");
            string articleEssay = await ApiService.AITextGeneration(
                "Write a concise financial article on the following news summaries. Begin directly with the key facts. Write in a neutral, analytic tone and focus on the important points while avoiding repetitions and irrelevant or minor news items." +
                $"Do not include any introductory phrases.\n" +
                $"News summaries:{newsContent}\n" +
                $"The generated article may make references to, but may not be overly similar or repeat the same information as: {previousArticle.Content}");

            Console.WriteLine("Generating Article Summary...");
            string articleSummary = await ApiService.AITextGeneration(
                $"Based on the following article, write a concise summary of 2-3 sentences that captures the most significant points. Do not include any introductory phrases and only write the summary directly." +
                $"Article: {articleEssay}\n");

            Console.WriteLine("Generating Article Title...");
            string articleTitle = await ApiService.AITextGeneration(
                $"Write a very short sentence based on the following text: {articleSummary}\nMake sure that the generated sentence is not similar to {previousArticle.Title}");

            Console.WriteLine("Updating Website...");
            int newArticleCount = await WebMod.IncrementArticleCountAndJSMetadata(articleTitle, ApiService.articleImage);
            await WebMod.WriteHTMLArticle(ApiService.articleImage, newArticleCount, articleEssay, articleSummary);

            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("Article generation complete. Press any key to exit.");
        }
    }
}
