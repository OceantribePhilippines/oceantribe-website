/* OceanTribe: Umami click events for WhatsApp, registration form, Google Maps and Instagram.
   Needs the Umami script loaded on the page. One delegated listener, so links added by script.js are covered too. */
document.addEventListener("click", function (e) {
  var a = e.target.closest && e.target.closest("a[href]");
  if (!a || !window.umami) return;
  var h = a.href, ev = null;
  if (h.indexOf("wa.me") > -1) ev = "whatsapp";
  else if (h.indexOf("tally.so") > -1) ev = "registration-form";
  else if (h.indexOf("google.com/maps") > -1 || h.indexOf("maps.app") > -1) ev = "google-maps";
  else if (h.indexOf("instagram.com") > -1) ev = "instagram";
  if (!ev) return;
  var item = "general";
  if (ev === "whatsapp") {
    var t = "";
    try { t = decodeURIComponent((h.split("text=")[1] || "").replace(/\+/g, " ")); } catch (err) {}
    var m = t.match(/(?:book the |book: )(.+?)\. My/);
    if (m) item = m[1];
    else if (/question/i.test(t)) item = "question";
    else if (/mooring/i.test(t)) item = "mooring line";
    else if (/book a course/i.test(t)) item = "course (not chosen)";
  }
  umami.track(ev, { item: item, page: location.pathname });
});
