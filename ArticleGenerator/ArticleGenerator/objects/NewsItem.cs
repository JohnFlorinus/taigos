using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ArticleGenerator.objects
{
    public class NewsItem
    {
        public string headline { get; set; }
        public string summary { get; set; }
        public string image { get; set; }
    }
}
