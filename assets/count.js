/* GABF — contador de visitas anônimo, sem cookies e sem dados pessoais.
   Usa a API pública e gratuita Abacus (https://abacus.jasoncameron.dev), sem cadastro.
   Conta: visualização por página (pv-*), cliques nos botões de formulário (click-*)
   e a origem utm_source quando presente (src-*). Respeita "Do Not Track". */
(function () {
  var NS = "gabf-mvp-meunomenaoejonny";
  var API = "https://abacus.jasoncameron.dev/hit/" + NS + "/";
  try {
    if (navigator.doNotTrack === "1" || window.doNotTrack === "1" || navigator.webdriver) return;
    if (!/github\.io$/.test(location.hostname)) return;
  } catch (e) { return; }
  function clean(s) { return String(s).toLowerCase().replace(/[^a-z0-9_.-]/g, "-").slice(0, 60); }
  function hit(key) {
    try { fetch(API + clean(key), { mode: "cors", credentials: "omit", cache: "no-store", keepalive: true }).catch(function () {}); } catch (e) {}
  }
  var me = document.currentScript;
  var page = (me && me.getAttribute("data-page")) || "unknown";
  hit("pv-" + page);
  try {
    var src = new URLSearchParams(location.search).get("utm_source");
    if (src) hit("src-" + page + "-" + clean(src).slice(0, 20));
  } catch (e) {}
  document.addEventListener("click", function (ev) {
    var a = ev.target && ev.target.closest ? ev.target.closest("a[data-count]") : null;
    if (a) hit("click-" + a.getAttribute("data-count"));
  }, true);
})();
