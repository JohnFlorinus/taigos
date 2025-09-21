using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace ArticleGenerator
{
    public static class WebMod
    {
        public static async Task<int> UpdateArticleJS(string articleTitle, string articleImage)
        {
            // Define file paths
            string jsFilePath = Path.Combine("website", "js", "articles.js");

            // Read the content of the JS file
            string jsContent = File.ReadAllText(jsFilePath);

            // Use a regex to find the current article count
            var match = Regex.Match(jsContent, @"const crntarticlecount = (\d+);");

            if (match.Success)
            {
                int currentCount = int.Parse(match.Groups[1].Value);
                int newCount = currentCount + 1;

                // Update crntarticlecount
                jsContent = jsContent.Replace(
                    $"const crntarticlecount = {currentCount};",
                    $"const crntarticlecount = {newCount};"
                );

                // Find articlesMeta object
                var metaMatch = Regex.Match(jsContent, @"const articlesMeta\s*=\s*{([\s\S]*?)};", RegexOptions.Multiline);

                if (metaMatch.Success)
                {
                    // Sanitize title and image (remove newlines and escape quotes)
                    string safeTitle = articleTitle.Replace("\r", " ").Replace("\n", " ").Replace("\"", "\\\"");
                    string safeImg = articleImage.Replace("\"", "\\\"");
                    string safeDate = DateTime.UtcNow.ToString("yyyy-MM-dd");

                    // Extract current entries
                    string entries = metaMatch.Groups[1].Value.Trim();

                    // Build the new entry
                    string newEntry = $"{newCount}: {{ title: \"{safeTitle}\", img: \"{safeImg}\",  date: \"{safeDate}\" }}";

                    if (string.IsNullOrWhiteSpace(entries))
                    {
                        // articlesMeta = {} → just insert first entry
                        entries = $"  {newEntry}";
                    }
                    else
                    {
                        // Already has entries → append with comma
                        if (!entries.TrimEnd().EndsWith(",")) entries += ",";
                        entries += $"\n  {newEntry}";
                    }

                    // Rebuild the whole block
                    jsContent = Regex.Replace(jsContent,
                        @"const articlesMeta\s*=\s*{([\s\S]*?)};",
                        $"const articlesMeta = {{\n{entries}\n}};",
                        RegexOptions.Multiline);
                }
                else
                {
                    Console.WriteLine("Error: Could not find 'articlesMeta' in articles.js.");
                    Environment.Exit(1);
                    return 0;
                }

                File.WriteAllText(jsFilePath, jsContent);
                Console.WriteLine($"Successfully updated JS for new article");
                return newCount;
            }
            else
            {
                Console.WriteLine("Error: Could not find 'crntarticlecount' in articles.js.");
                Environment.Exit(1);
                return 0;
            }
        }

        public static async Task WriteHTMLArticle(string imageUrl, int newCount, string Essay, string Summary)
        {
            string articlesDirectory = Path.Combine("website", "articles");

            // Create the new HTML filename
            string newFileName = $"{newCount}.html";
            string newFilePath = Path.Combine(articlesDirectory, newFileName);

            // Create the HTML content
            string htmlContent = $@"
<!DOCTYPE html>
<html lang=""en"">
  <head>
    <title>taigos - {DateTime.UtcNow.ToString("yyyy-MM-dd")}</title>
    <meta charset=""utf-8"">
    <meta name=""viewport"" content=""width=device-width, initial-scale=1, shrink-to-fit=no"">
    
    <link href=""https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800,900"" rel=""stylesheet"">

    <link rel=""stylesheet"" href=""../css/open-iconic-bootstrap.min.css"">
    <link rel=""stylesheet"" href=""../css/animate.css"">
    
    <link rel=""stylesheet"" href=""../css/owl.carousel.min.css"">
    <link rel=""stylesheet"" href=""../css/owl.theme.default.min.css"">
    <link rel=""stylesheet"" href=""../css/magnific-popup.css"">

    <link rel=""stylesheet"" href=""../css/aos.css"">

    <link rel=""stylesheet"" href=""../css/ionicons.min.css"">
    
    <link rel=""stylesheet"" href=""../css/flaticon.css"">
    <link rel=""stylesheet"" href=""../css/icomoon.css"">
    <link rel=""stylesheet"" href=""../css/style.css"">

    <script async src=""https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9310926432083809""
     crossorigin=""anonymous""></script>
  </head>
  <body>
    
	  <nav class=""navbar px-md-0 navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light"" id=""ftco-navbar"">
	    <div class=""container"">
	      <a class=""navbar-brand"" href=""../index.html"">taigos</a>

	      <button class=""navbar-toggler"" type=""button"" data-toggle=""collapse"" data-target=""#ftco-nav"" aria-controls=""ftco-nav"" aria-expanded=""false"" aria-label=""Toggle navigation"">
	        <span class=""oi oi-menu""></span> Menu
	      </button>

	      <div class=""collapse navbar-collapse"" id=""ftco-nav"">
	        <ul class=""navbar-nav ml-auto"">
	          <li class=""nav-item""><a href=""../index.html"" class=""nav-link"">Articles</a></li>
	          <li class=""nav-item""><a href=""../about.html"" class=""nav-link"">About Us</a></li>
	          <li class=""nav-item""><a href=""../contact.html"" class=""nav-link"">Contact</a></li>
	        </ul>
	      </div>
	    </div>
	  </nav>
    <!-- END nav -->
    
    <section class=""hero-wrap hero-wrap-2 js-fullheight"" style=""background-image: url('{imageUrl}');"" data-stellar-background-ratio=""0.5"">
      <div class=""overlay""></div>
      <div class=""container"">
        <div class=""row no-gutters slider-text js-fullheight align-items-end justify-content-center"">
          <div class=""col-md-9 ftco-animate pb-5 text-center"">
            <h1 class=""mb-3 bread"" style=""font-size: 8rem"">{DateTime.UtcNow.ToString("yyyy-MM-dd")}</h1>
          </div>
        </div>
      </div>
    </section>

   <section class=""ftco-section ftco-degree-bg"">
      <div class=""container"">
        <div class=""row"">
          <div class=""col-lg-8"">
            <p class=""mb-5"">
              <img src=""{imageUrl}"" class=""img-fluid"">
            </p>
          	<h2>{DateTime.UtcNow.ToString("yyyy-MM-dd")} - Daily News Report</h2>
            <p style=""white-space: pre-line"">
                {Essay}
            </p>
            <p><b>DISCLAIMER - We are not liable for any investments you make with the news we provide you. The purpose of this website is to give you a simple and concise news report every day for staying informed.</b></p>
          </div> <!-- .col-md-8 -->
          <div class=""col-lg-4 sidebar pl-lg-5"">

            <div class=""sidebar-box"">
              <h3>Tags</h3>
              <div class=""tagcloud"">
                <a href=""#"" class=""tag-cloud-link"">market</a>
                <a href=""#"" class=""tag-cloud-link"">finance</a>
                <a href=""#"" class=""tag-cloud-link"">economy</a>
                <a href=""#"" class=""tag-cloud-link"">crypto</a>
                <a href=""#"" class=""tag-cloud-link"">bonds</a>
                <a href=""#"" class=""tag-cloud-link"">investment</a>
                <a href=""#"" class=""tag-cloud-link"">portfolio</a>
                <a href=""#"" class=""tag-cloud-link"">corporate</a>
              </div>
            </div>

            <div class=""sidebar-box"">
              <h3>Report Summary</h3>
              <p>{Summary}</p>
            </div>
          </div>

        </div>
      </div>
    </section> <!-- .section -->

    <footer class=""ftco-footer ftco-bg-dark ftco-section"">
        <div class=""container"">
            <div class=""row mb-5"">
                <div class=""col-md"">
                    <div class=""ftco-footer-widget mb-4"">
                        <h2 class=""logo""><a href=""#"">taigos</a></h2>
                        <p>We collect and highlight up-to-date news on the market and economy <b>every day</b>.</p>
                    </div>
                </div>
                <div class=""col-md"">
                    <div class=""ftco-footer-widget mb-4 ml-md-5"">
                        <h2 class=""ftco-heading-2"">Links</h2>
                        <ul class=""list-unstyled"">
                            <li><a href=""../privacypolicy.html"" class=""py-1 d-block""><span class=""ion-ios-arrow-forward mr-3""></span>Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>
                <div class=""col-md"">
                    <div class=""ftco-footer-widget mb-4"">
                        <h2 class=""ftco-heading-2"">Contact</h2>
                        <div class=""block-23 mb-3"">
                            <ul>
                                <li><a href=""#""><span class=""icon icon-envelope""></span><span class=""text"">info@taigos.com</span></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class=""row"">
                <div class=""col-md-12 text-center"">
                    <p>
                        &copy; <script>document.write(new Date().getFullYear());</script> taigos. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    </footer>
    
  

  <!-- loader -->
  <div id=""ftco-loader"" class=""show fullscreen""><svg class=""circular"" width=""48px"" height=""48px""><circle class=""path-bg"" cx=""24"" cy=""24"" r=""22"" fill=""none"" stroke-width=""4"" stroke=""#eeeeee""/><circle class=""path"" cx=""24"" cy=""24"" r=""22"" fill=""none"" stroke-width=""4"" stroke-miterlimit=""10"" stroke=""#F96D00""/></svg></div>


  <script src=""../js/jquery.min.js""></script>
  <script src=""../js/jquery-migrate-3.0.1.min.js""></script>
  <script src=""../js/popper.min.js""></script>
  <script src=""../js/bootstrap.min.js""></script>
  <script src=""../js/jquery.easing.1.3.js""></script>
  <script src=""../js/jquery.waypoints.min.js""></script>
  <script src=""../js/jquery.stellar.min.js""></script>
  <script src=""../js/owl.carousel.min.js""></script>
  <script src=""../js/jquery.magnific-popup.min.js""></script>
  <script src=""../js/aos.js""></script>
  <script src=""../js/jquery.animateNumber.min.js""></script>
  <script src=""../js/scrollax.min.js""></script>
  <script src=""../js/google-map.js""></script>
  <script src=""../js/main.js""></script>
  <script src=""../js/cookieconsent.js""></script>
</body>
</html>
";

            // Write the HTML to the new file
            File.WriteAllText(newFilePath, htmlContent);
            Console.WriteLine($"Successfully created new article number {newCount}");
        }
    }
}
