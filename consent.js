/* OceanTribe: consent banner + Contentsquare loader.
   Contentsquare (heatmaps, session replay) sets cookies, so it only loads after a visitor accepts.
   Umami visitor counts stay cookieless and are not affected by this choice.
   The choice is kept in localStorage under "ot-consent" ("granted" or "denied"). */
(function () {
  var KEY = "ot-consent";
  var CS_SRC = "https://t.contentsquare.net/uxa/03f9ea16fea6a.js";

  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function write(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function loadCS() {
    if (document.getElementById("ot-cs")) return;
    var s = document.createElement("script");
    s.id = "ot-cs"; s.async = true; s.src = CS_SRC;
    document.head.appendChild(s);
  }

  var css = "#ot-consent{position:fixed;left:16px;bottom:calc(16px + env(safe-area-inset-bottom,0px));z-index:60;max-width:380px;background:#faf9f4;color:#231f20;border:1px solid #d9d5c8;border-radius:16px;box-shadow:0 12px 36px rgba(35,31,32,.22);padding:18px 18px 16px;font-family:'Bricolage Grotesque',system-ui,sans-serif;font-size:14.5px;line-height:1.5}" +
    "#ot-consent p{margin:0 0 14px}#ot-consent b{font-weight:600;color:#303656}" +
    "#ot-consent .ot-row{display:flex;gap:10px}" +
    "#ot-consent button{flex:1;font:inherit;font-weight:600;font-size:15px;border-radius:999px;padding:11px 16px;cursor:pointer;border:1.5px solid #303656;background:#303656;color:#fff}" +
    "#ot-consent button.ot-no{background:transparent;color:#303656}" +
    "#ot-consent button:focus-visible{outline:3px solid #ff4f8f;outline-offset:3px}" +
    "@media (max-width:560px){#ot-consent{left:12px;right:12px;max-width:none}}";

  function hide() { var el = document.getElementById("ot-consent"); if (el) el.remove(); }

  function show() {
    if (document.getElementById("ot-consent")) return;
    if (!document.getElementById("ot-consent-css")) {
      var st = document.createElement("style");
      st.id = "ot-consent-css"; st.textContent = css;
      document.head.appendChild(st);
    }
    var box = document.createElement("div");
    box.id = "ot-consent";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-label", "Cookie choice");
    box.innerHTML =
      "<p><b>We use cookies.</b> They help us improve your experience and understand how our site is used.</p>" +
      '<div class="ot-row"><button type="button" class="ot-no">Decline</button><button type="button" class="ot-yes">Accept</button></div>';
    box.querySelector(".ot-yes").addEventListener("click", function () { write("granted"); hide(); loadCS(); });
    box.querySelector(".ot-no").addEventListener("click", function () { var was = !!document.getElementById("ot-cs"); write("denied"); hide(); if (was) location.reload(); });
    document.body.appendChild(box);
  }

  function addFooterLink() {
    var col = document.querySelector(".foot-grid > div:last-child");
    if (!col) return;
    var p = document.createElement("p");
    p.innerHTML = '<a href="#" id="ot-consent-open">Cookie choices</a>';
    col.appendChild(p);
    p.firstChild.addEventListener("click", function (e) { e.preventDefault(); show(); });
  }

  function init() {
    addFooterLink();
    var c = read();
    if (c === "granted") loadCS();
    else if (c !== "denied") show();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
