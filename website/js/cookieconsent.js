let privacypolicypath = "/privacypolicy.html";
  if (window.location.pathname.includes("/articles/"))
    privacypolicypath = "../privacypolicy.html";


window.addEventListener("load", function(){
  window.cookieconsent.initialise({
    palette: {
      popup: { background: "#000" },
      button: { background: "#f1d600", text: "#000" }
    },
    theme: "classic",
    type: "opt-in",  // 👈 requires explicit Accept
    content: {
      message: "We use cookies to improve your experience and show personalized ads.",
      dismiss: "Decline",
      allow: "Accept",
      link: "Learn more",
      href: privacypolicypath
    },
    onInitialise: function (status) {
      if (status == cookieconsent.status.allow) {
        loadAdsense();
      }
	  else {
		blockAdsense();
	  }
    },
    onStatusChange: function(status) {
      if (status == cookieconsent.status.allow) {
        loadAdsense();
      } else {
        blockAdsense();
      }
    }
  })
});

function loadAdsense() {
  console.log("Adsense loaded due to cookie acceptance");
  // Dynamically load Adsense script only if user consents
  var s = document.createElement('script');
  s.async = true;
  s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
  document.head.appendChild(s);
}

function blockAdsense() {
  console.log("Adsense blocked due to cookie rejection");
}