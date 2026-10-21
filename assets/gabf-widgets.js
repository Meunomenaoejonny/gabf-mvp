/* GABF — widgets v2 (2026-10-21). Agenda de prazos (contagem regressiva + link Google Agenda) + captura de 1 campo.
   v2: (a) textos sensíveis à data (antes/depois de 1º/11/2026); (b) 1º/10 e 1º/12 descritos como "novo emissor municipal,
   fora do Simples" (correção factual: só o Simples vai ao Emissor Nacional em 1º/11); (c) variante B2B (escritórios),
   com nome do escritório opcional. Envia para o Google Form existente (EXP-013), marcando a origem no campo de nota. */
(function () {
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
    var origem = box.getAttribute("data-capture") || page();
    var b2b = box.getAttribute("data-capture-variant") === "b2b";
    var h = b2b ? "Receba o kit e as condições de lançamento no e-mail do escritório."
      : (AFTER_NOV1 ? "Receba um aviso por e-mail sobre as próximas etapas (1º/12 em Campinas e IBS/CBS em 1º/01/2027)."
                    : "Receba um aviso por e-mail antes de 1º/11 (e se o prazo mudar).");
    var extra = b2b ? '<input type="text" class="cap-org" placeholder="Nome do escritório (opcional)" aria-label="Nome do escritório" maxlength="120">' : "";
    var btn = b2b ? "Quero o kit" : "Quero o aviso";
    var note = b2b ? "Usamos o e-mail só para enviar o kit e as condições. Sem lista de spam. Material informativo, que não é assessoria."
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
        msg.textContent = b2b ? ("Recebido! Enviaremos o kit e as condições para " + email + " em até 1 dia útil.")
          : ("Pronto! Você vai receber o aviso em " + email + ". O checklist completo já está nesta página.");
        form.querySelector("button").disabled = true; hit((b2b ? "cap-b2b-" : "cap-") + page());
      }).catch(function () { msg.textContent = "Não foi possível enviar agora. Tente de novo em instantes."; });
    });
  });
})();
