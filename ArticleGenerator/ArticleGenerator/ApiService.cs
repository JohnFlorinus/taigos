using ArticleGenerator.objects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace ArticleGenerator
{
    public static class ApiService
    {
        private static readonly HttpClient client = new HttpClient();
        private const string LLM = "meta/llama-4-scout-17b-16e-instruct";
        public static string articleImage = "Empty";


        public static async Task<string> GetNews(string previousImage)
        {
            string newsToAnalyze = "";

            try
            {
                string jsonString = await client.GetStringAsync(Program.FINNHUB_MARKET_NEWS_URL);
                var newsItems = JsonSerializer.Deserialize<List<NewsItem>>(jsonString);

                if (newsItems != null && newsItems.Count > 0)
                {
                    foreach (var item in newsItems)
                    {
                        if (!item.image.Contains("market_watch") && articleImage == "Empty" && item.image != previousImage)
                        {
                            articleImage = item.image;
                        }
                        newsToAnalyze += $"~{item.headline}@{item.summary}";
                    }
                }
                else
                {
                    Console.WriteLine("No news items found.");
                }
            }
            catch (Exception e)
            {
                Console.WriteLine($"An unexpected error occurred: {e.Message}");
                Console.ReadKey();
                Environment.Exit(1);
            }

            try
            {
                string jsonString = await client.GetStringAsync(Program.FINNHUB_CRYPTO_NEWS_URL);
                var newsItems = JsonSerializer.Deserialize<List<NewsItem>>(jsonString);

                if (newsItems != null && newsItems.Count > 0)
                {
                    foreach (var item in newsItems)
                    {
                        newsToAnalyze += $"~{item.headline}@{item.summary}";
                    }
                }
                else
                {
                    Console.WriteLine("No news items found.");
                }
            }
            catch (Exception e)
            {
                Console.WriteLine($"An unexpected error occurred: {e.Message}");
            }

            return newsToAnalyze;
        }



        public static async Task<string> AITextGeneration(string prompt)
        {
            // For Agree on Model - curl.exe https://api.cloudflare.com/client/v4/accounts/{CFAccountID}/ai/run/@cf/meta/llama-3.2-3b-instruct -X POST -H "Authorization: Bearer {CFAIKEY}" --data-binary "@C:\Users\mohammed\Desktop\repos\taigos\CurlExp\ye.json"
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Program.CF_API_KEY);

            var request = new
            {
                messages = new[]
                {
            new { role = "system", content = "You are a objective financial analyst. You write articles for a professional audience. Do not include any introductory phrases such as 'here is' or 'as a financial analyst'." },
            new { role = "user", content = prompt
            }
        },
                max_tokens = 2000,
                top_p = 0.9,
                temperature = 0.3
            };

            try
            {
                var jsonRequest = JsonSerializer.Serialize(request);
                var content = new StringContent(jsonRequest, Encoding.UTF8, "application/json");

                var response = await client.PostAsync($"https://api.cloudflare.com/client/v4/accounts/{Program.CF_ACCOUNT_ID}/ai/run/@cf/{LLM}", content);
                response.EnsureSuccessStatusCode();

                var jsonResponse = await response.Content.ReadAsStringAsync();
                using var doc = JsonDocument.Parse(jsonResponse);
                string generated = doc.RootElement
                    .GetProperty("result")
                    .GetProperty("response")
                    .GetString();

                if (!string.IsNullOrWhiteSpace(generated))
                {
                    return generated;
                }
                else
                {
                    Console.WriteLine("No essay text generated.");
                    Console.ReadKey();
                    Environment.Exit(1);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine($"An unexpected error occurred during OpenRouter call: {e}");
                Console.ReadKey();
                Environment.Exit(1);
            }
            return "Empty";
        }
    }
}
