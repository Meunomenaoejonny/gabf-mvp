/* GABF — contador anônimo v3 (2026-10-19). Sem cookies, sem dados pessoais.
   Abacus (https://abacus.jasoncameron.dev), sem cadastro. Respeita Do Not Track.
   v3 separa robô de pessoa, conta engajamento e origem, e registra eventos:
   pv-* (carga) · bot-* (UA de bot) · eng-* (rolou ≥50% ou ficou ≥25s) · ctav-* (CTA de
   captura visível na tela) · ref-<page>-<google|bing|other|direct> · click-* (data-count) ·
   click-cal-* (pôs lembrete na agenda, via data-count) · cap-* (enviou o formulário de 1 campo) · tool-* (usou a ferramenta). */
(function () {
  var NS = "gabf-mvp-meunomenaoejonny";
  var API = "https://abacus.jasoncameron.dev/hit/" + NS + "/";
  var page = "unknown", me = document.currentScript;
  try { page = (me && me.getAttribute("data-page")) || page; } catch (e) {}
  function clean(s) { return String(s).toLowerCase().replace(/[^a-z0-9_.-]/g, "-").slice(0, 60); }
  function hit(key) { try { fetch(API + clean(key), { mode: "cors", credentials: "omit", cache: "no-store", keepalive: true }).catch(function () {}); } catch (e) {} }
  function isBot() {
    var ua = navigator.userAgent || "";
    return navigator.webdriver || /bot|crawl|spider|slurp|bingpreview|googleother|headless|lighthouse|preview/i.test(ua);
  }
  function referrerClass() {
    var r = document.referrer || "";
    if (!r) return "direct";
    try { var h = new URL(r).hostname; } catch (e) { return "other"; }
    if (/\.github\.io$/.test(h)) return null; // navegação interna
    if (/(^|\.)google\./.test(h)) return "google";
    if (/(^|\.)bing\.com$/.test(h)) return "bing";
    return "other";
  }
  try { if (navigator.doNotTrack === "1" || window.doNotTrack === "1") return; if (!/github\.io$/.test(location.hostname)) return; } catch (e) { return; }
  if (isBot()) { hit("bot-" + page); return; }
  hit("pv-" + page);
  var rc = referrerClass(); if (rc) hit("ref-" + page + "-" + rc);
  try { var src = new URLSearchParams(location.search).get("utm_source"); if (src) hit("src-" + page + "-" + clean(src).slice(0, 20)); } catch (e) {}
  var engaged = false;
  function engage() { if (engaged) return; engaged = true; hit("eng-" + page); }
  setTimeout(engage, 25000);
  window.addEventListener("scroll", function () {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (h > 0 && window.scrollY / h >= 0.5) engage();
  }, { passive: true });
  document.addEventListener("click", function (ev) {
    var a = ev.target && ev.target.closest ? ev.target.closest("a[data-count],button[data-count]") : null;
    if (a) hit("click-" + a.getAttribute("data-count"));
  }, true);
  function once(sel, key) {
    var el = document.querySelector(sel); if (!el || !("IntersectionObserver" in window)) return;
    new IntersectionObserver(function (ents, o) { ents.forEach(function (e) { if (e.isIntersecting) { hit(key); o.disconnect(); } }); }, { threshold: 0.5 }).observe(el);
  }
  once("[data-capture]", "ctav-" + page);
  window.gabfHit = hit;
  window.gabfPage = page;
})();
