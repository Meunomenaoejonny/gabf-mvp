/* GABF — widgets v1 (2026-10-19). Agenda de prazos (contagem regressiva + link Google Agenda) + captura de 1 campo.
   Envia para um Google Form existente (EXP-013) só os campos e-mail + origem.
   Não coleta nome, não pergunta preço, não promete entrega automática. */
(function () {
  var FORM = "https://docs.google.com/forms/d/e/1FAIpQLSetAvZJsOs86qdV1pUT5QLOtzPQ0bef2vhWU4--j0qV0chFrQ/formResponse";
  var NOME = "entry.48893674", EMAIL = "entry.840301044", NOTA = "entry.1044716741"; // Nome é obrigatório no Form → enviamos marcador fixo
  function el(html) { var d = document.createElement("div"); d.innerHTML = html.trim(); return d.firstChild; }
  function hit(k) { if (window.gabfHit) window.gabfHit(k); }
  function page() { return window.gabfPage || "unknown"; }

  /* ---------- agenda de prazos (datas fixas, sem regra fiscal nova) ---------- */
  var STEPS = [
    { d: "2026-10-01", t: "1º/10/2026", x: "Campinas: novo emissor para a regra geral do ISS (exceto atividades com prazo em dezembro)." },
    { d: "2026-11-01", t: "1º/11/2026", x: "Simples ME/EPP: Emissor Nacional obrigatório e exclusivo (Res. CGSN 191/2026)." },
    { d: "2026-12-01", t: "1º/12/2026", x: "Campinas: plataformas, dados/software, conteúdo na internet e transporte coletivo." },
    { d: "2027-01-01", t: "1º/01/2027", x: "Simples: regras de IBS/CBS passam a produzir efeitos no documento fiscal." }
  ];
  function daysUntil(iso) { return Math.ceil((new Date(iso + "T00:00:00-03:00") - Date.now()) / 86400000); }
  document.querySelectorAll("[data-agenda]").forEach(function (box) {
    var next = STEPS.filter(function (s) { return daysUntil(s.d) > 0; })[0];
    var head = next ? '<p class="ag-next">Próxima data: <strong>' + next.t + '</strong> — faltam <strong>' + daysUntil(next.d) + ' dias</strong>. ' + next.x + '</p>' : '<p class="ag-next">Todas as datas deste cronograma já passaram. Confira as fontes oficiais para regras novas.</p>';
    var rows = STEPS.map(function (s) { var n = daysUntil(s.d); return '<li class="' + (n <= 0 ? "ag-done" : "") + '"><strong>' + s.t + '</strong> ' + (n <= 0 ? "(já passou)" : "— em " + n + " dias") + '<br><span>' + s.x + '</span></li>'; }).join("");
    var gcal = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + encodeURIComponent("NFS-e: Simples ME/EPP no Emissor Nacional (1º/11)") + "&dates=20261029/20261030&details=" + encodeURIComponent("Lembrete: a partir de 1º/11/2026 ME/EPP do Simples emitem NFS-e só pelo Emissor Nacional. Checklist: https://meunomenaoejonny.github.io/gabf-mvp/nfse-campinas/ — confirme com seu contador.");
    box.appendChild(el('<div class="agenda">' + head + '<ul>' + rows + '</ul><p><a class="ag-cal" target="_blank" rel="noopener" data-count="cal-' + page() + '" href="' + gcal + '">Pôr lembrete de 29/10 na minha agenda (Google Agenda)</a></p><p class="ag-note">Cronograma resumido de fontes oficiais (RFB e Prefeitura de Campinas, via imprensa). Confirme seu enquadramento na Secretaria Municipal de Finanças. Não é assessoria.</p></div>'));
  });

  /* ---------- captura de 1 campo ---------- */
  document.querySelectorAll("[data-capture]").forEach(function (box) {
    var origem = box.getAttribute("data-capture") || page();
    box.appendChild(el(
      '<form class="cap" novalidate>' +
      '<p class="cap-h">Receba um aviso por e-mail antes de 1º/11 (e se o prazo mudar).</p>' +
      '<div class="cap-row"><input type="email" required placeholder="seu@email.com" aria-label="Seu e-mail" maxlength="200">' +
      '<button type="submit">Quero o aviso</button></div>' +
      '<p class="cap-note">Grátis. Só o e-mail, nada mais. Usamos apenas para avisos sobre o prazo da NFS-e. Não é assessoria fiscal.</p>' +
      '<p class="cap-msg" role="status"></p></form>'
    ));
    var form = box.querySelector("form"), msg = box.querySelector(".cap-msg");
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var email = form.querySelector("input").value.trim();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { msg.textContent = "Digite um e-mail válido."; return; }
      var body = new URLSearchParams();
      body.set(NOME, "(captura site)"); body.set(EMAIL, email); body.set(NOTA, "captura-1-campo|" + origem + "|" + location.pathname);
      fetch(FORM, { method: "POST", mode: "no-cors", body: body }).then(function () {
        msg.textContent = "Pronto! Você vai receber o aviso em " + email + ". O checklist completo já está nesta página.";
        form.querySelector("button").disabled = true; hit("cap-" + page());
      }).catch(function () { msg.textContent = "Não foi possível enviar agora. Tente de novo em instantes."; });
    });
  });
})();
