/* GABF — widgets v3 (2026-10-23). v2 + (a) bloco de compra [data-buy] com 3 modos (off | kiwify | pix), trocados só na
   constante SHOP abaixo; (b) banner "É escritório contábil?" nas páginas NFS-e; (c) captura de e-mail desligável
   (CAPTURE_ON): o dono não envia e-mails, então nenhum texto promete envio manual. A variante B2B deixa de prometer
   "enviaremos o kit": o kit é entregue pelo checkout. */
(function () {
  /* ======== CONFIG (o único trecho que muda entre fases) ======== */
  var SHOP = {
    mode: "off",            // "off" (sem venda aberta) | "kiwify" (recomendado) | "pix" (plano B)
    kiwify: "",             // ex.: "https://pay.kiwify.com.br/XXXXXXX" (link de checkout do produto)
    pixForm: "",            // plano B: link do Google Form "Já paguei" (a página de confirmação do Form mostra o link de download)
    pixPayload: "00020101021126360014br.gov.bcb.pix0114+5535999140387520400005303986540597.005802BR5916JOAO MARCOS PILZ6008CAMPINAS62130509KITNFSE9763045E38",
    pixQr: "https://meunomenaoejonny.github.io/gabf-mvp/assets/pix-kit-nfse-97.png",
    kitNacional: "https://meunomenaoejonny.github.io/gabf-mvp/nfse-nacional/kit-escritorios-contabeis/",
    kitCampinas: "https://meunomenaoejonny.github.io/gabf-mvp/nfse-campinas/para-escritorios-contabeis/"
  };
  var CAPTURE_ON = false;   // true só se houver quem envie os avisos prometidos (o lembrete da Google Agenda segue ativo)
  /* =============================================================== */
  var FORM = "https://docs.google.com/forms/d/e/1FAIpQLSetAvZJsOs86qdV1pUT5QLOtzPQ0bef2vhWU4--j0qV0chFrQ/formResponse";
  var NOME = "entry.48893674", EMAIL = "entry.840301044", NOTA = "entry.1044716741"; // Nome é obrigatório no Form → marcador fixo ou nome do escritório
  function el(html) { var d = document.createElement("div"); d.innerHTML = html.trim(); return d.firstChild; }
  function hit(k) { if (window.gabfHit) window.gabfHit(k); }
  function page() { return window.gabfPage || "unknown"; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  var AFTER_NOV1 = Date.now() >= new Date("2026-11-01T00:00:00-03:00").getTime();

  /* ---------- agenda de prazos (datas fixas, fontes: RFB + Prefeitura de Campinas via imprensa) ---------- */
  var STEPS = [
    { d: "2026-10-01", t: "1º/10/2026", x: "Campinas, fora do Simples: novo emissor municipal obrigatório para a regra geral do ISS (exceto atividades de dezembro)." },
    { d: "2026-11-01", t: "1º/11/2026", x: "Simples ME/EPP: Emissor Nacional obrigatório e exclusivo (Res. CGSN 191/2026). 2/11 é Finados: 1º dia útil é 3/11." },
    { d: "2026-12-01", t: "1º/12/2026", x: "Campinas, fora do Simples: novo emissor municipal para plataformas, dados/software, conteúdo na internet e transporte coletivo." },
    { d: "2027-01-01", t: "1º/01/2027", x: "Simples: regras de IBS/CBS passam a produzir efeitos no documento fiscal." }
  ];
  function daysUntil(iso) { return Math.ceil((new Date(iso + "T00:00:00-03:00") - Date.now()) / 86400000); }
  document.querySelectorAll("[data-agenda]").forEach(function (box) {
    var next = STEPS.filter(function (s) { return daysUntil(s.d) > 0; })[0];
    var head = next ? '<p class="ag-next">Próxima data: <strong>' + next.t + '</strong> — faltam <strong>' + daysUntil(next.d) + ' dias</strong>. ' + next.x + '</p>' : '<p class="ag-next">Todas as datas deste cronograma já passaram. Confira as fontes oficiais para regras novas.</p>';
    var rows = STEPS.map(function (s) { var n = daysUntil(s.d); return '<li class="' + (n <= 0 ? "ag-done" : "") + '"><strong>' + s.t + '</strong> ' + (n <= 0 ? "(já passou)" : "— em " + n + " dias") + '<br><span>' + s.x + '</span></li>'; }).join("");
    var cal = AFTER_NOV1
      ? { t: "NFS-e Simples: IBS/CBS no documento fiscal (1º/01/2027)", d: "20261228/20261229", x: "Lembrete: a partir de 1º/01/2027 as regras de IBS/CBS produzem efeitos no documento fiscal do Simples. Fontes: https://meunomenaoejonny.github.io/gabf-mvp/nfse-campinas/ — confirme com seu contador.", l: "Pôr lembrete de 28/12 (IBS/CBS) na minha agenda" }
      : { t: "NFS-e: Simples ME/EPP no Emissor Nacional (1º/11)", d: "20261029/20261030", x: "Lembrete: a partir de 1º/11/2026 ME/EPP do Simples emitem NFS-e só pelo Emissor Nacional. 2/11 é Finados. Checklist: https://meunomenaoejonny.github.io/gabf-mvp/nfse-campinas/ — confirme com seu contador.", l: "Pôr lembrete de 29/10 na minha agenda (Google Agenda)" };
    var gcal = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + encodeURIComponent(cal.t) + "&dates=" + cal.d + "&details=" + encodeURIComponent(cal.x);
    box.appendChild(el('<div class="agenda">' + head + '<ul>' + rows + '</ul><p><a class="ag-cal" target="_blank" rel="noopener" data-count="cal-' + page() + '" href="' + gcal + '">' + cal.l + '</a></p><p class="ag-note">Cronograma resumido de fontes oficiais (RFB e Prefeitura de Campinas, via imprensa). Confirme seu enquadramento na Secretaria Municipal de Finanças. Não é assessoria.</p></div>'));
  });

  /* ---------- captura de 1 campo (+ variante B2B) ---------- */
  document.querySelectorAll("[data-capture]").forEach(function (box) {
    if (!CAPTURE_ON) { box.parentNode && box.parentNode.removeChild(box); return; }
    var origem = box.getAttribute("data-capture") || page();
    var b2b = box.getAttribute("data-capture-variant") === "b2b";
    var h = b2b ? "Quer ser avisado da atualização de janeiro/2027 (IBS/CBS)? Deixe o e-mail do escritório."
      : (AFTER_NOV1 ? "Receba um aviso por e-mail sobre as próximas etapas (1º/12 em Campinas e IBS/CBS em 1º/01/2027)."
                    : "Receba um aviso por e-mail antes de 1º/11 (e se o prazo mudar).");
    var extra = b2b ? '<input type="text" class="cap-org" placeholder="Nome do escritório (opcional)" aria-label="Nome do escritório" maxlength="120">' : "";
    var btn = b2b ? "Quero ser avisado" : "Quero o aviso";
    var note = b2b ? "Usamos o e-mail só para esse aviso. Sem lista de spam. Material informativo, que não é assessoria."
      : "Grátis. Só o e-mail, nada mais. Usamos apenas para avisos sobre os prazos da NFS-e. Não é assessoria fiscal.";
    box.appendChild(el(
      '<form class="cap" novalidate>' +
      '<p class="cap-h">' + h + '</p>' +
      '<div class="cap-row">' + extra + '<input type="email" required placeholder="seu@email.com" aria-label="Seu e-mail" maxlength="200">' +
      '<button type="submit">' + btn + '</button></div>' +
      '<p class="cap-note">' + note + '</p>' +
      '<p class="cap-msg" role="status"></p></form>'
    ));
    var form = box.querySelector("form"), msg = box.querySelector(".cap-msg");
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var email = form.querySelector('input[type="email"]').value.trim();
      var org = b2b ? (form.querySelector(".cap-org").value || "").trim().slice(0, 120) : "";
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { msg.textContent = "Digite um e-mail válido."; return; }
      var body = new URLSearchParams();
      body.set(NOME, b2b ? (org || "(b2b site)") : "(captura site)"); body.set(EMAIL, email);
      body.set(NOTA, (b2b ? "captura-b2b|" : "captura-1-campo|") + origem + "|" + location.pathname);
      fetch(FORM, { method: "POST", mode: "no-cors", body: body }).then(function () {
        msg.textContent = b2b ? ("Recebido: " + email + ". O kit completo é entregue na hora pelo botão de compra desta página.")
          : ("Pronto! Você vai receber o aviso em " + email + ". O checklist completo já está nesta página.");
        form.querySelector("button").disabled = true; hit((b2b ? "cap-b2b-" : "cap-") + page());
      }).catch(function () { msg.textContent = "Não foi possível enviar agora. Tente de novo em instantes."; });
    });
  });
  /* ---------- bloco de compra [data-buy] ---------- */
  document.querySelectorAll("[data-buy]").forEach(function (a) {
    var st = a.parentNode && a.parentNode.parentNode ? a.parentNode.parentNode.querySelector("[data-buy-status]") : null;
    if (SHOP.mode === "kiwify" && SHOP.kiwify) {
      a.href = SHOP.kiwify; a.rel = "noopener";
      a.textContent = "Comprar o kit por R$ 97 (PIX ou cartão)";
    } else if (SHOP.mode === "pix") {
      a.href = "#pix"; a.textContent = "Pagar R$ 97 por PIX";
      if (st && !st.querySelector(".pixbox")) st.appendChild(el(
        '<div class="pixbox card" id="pix"><p><strong>1.</strong> Pague <strong>R$ 97,00</strong> por PIX: leia o QR Code no app do banco ou use o "copia e cola".</p>' +
        '<p><img src="' + SHOP.pixQr + '" alt="QR Code PIX de R$ 97,00" width="220" height="220" loading="lazy"></p>' +
        '<p><textarea readonly rows="3" style="width:100%;font-size:.75rem" aria-label="PIX copia e cola">' + esc(SHOP.pixPayload) + '</textarea>' +
        '<button type="button" class="pix-copy">Copiar código PIX</button></p>' +
        '<p><strong>2.</strong> Depois de pagar, <a data-count="pix-ja-paguei-' + page() + '" target="_blank" rel="noopener" href="' + SHOP.pixForm + '">preencha o formulário "Já paguei"</a>: o link de download aparece na tela, na hora.</p>' +
        '<p class="small">Garantia de 7 dias: para reembolso, responda no mesmo formulário com a chave PIX de devolução.</p></div>'));
      var cp = st && st.querySelector(".pix-copy");
      if (cp) cp.addEventListener("click", function () { try { navigator.clipboard.writeText(SHOP.pixPayload); cp.textContent = "Copiado!"; hit("pix-copia-" + page()); } catch (e) {} });
    } else {
      a.removeAttribute("href"); a.removeAttribute("data-count"); a.setAttribute("aria-disabled", "true"); a.style.opacity = ".55"; a.style.cursor = "default";
      a.textContent = "Compra ainda não aberta";
      if (st) st.appendChild(el('<p class="small">A compra automática ainda não foi ativada. Enquanto isso, veja a amostra grátis e os modelos de comunicado.</p>'));
    }
  });

  /* ---------- banner "É escritório contábil?" (páginas NFS-e sem bloco de compra) ---------- */
  (function () {
    var p = location.pathname;
    if (!/\/(nfse-campinas|nfse-nacional)\//.test(p) || document.querySelector("[data-buy]")) return;
    var href = /\/nfse-campinas\//.test(p) ? SHOP.kitCampinas : SHOP.kitNacional;
    var anchor = document.querySelector("nav.related") || document.querySelector("footer");
    if (!anchor) return;
    anchor.parentNode.insertBefore(el('<aside class="card b2b-banner"><strong>É escritório contábil?</strong> Kit pronto para orientar a carteira do Simples na NFS-e Nacional: guia do cliente com a sua marca (DOCX), 4 comunicados, planilha de triagem e folha da primeira semana. R$ 97, garantia de 7 dias. <a data-count="banner-b2b-' + page() + '" href="' + href + '">Ver o kit</a></aside>'), anchor);
  })();
})();
