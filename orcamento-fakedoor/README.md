# OPP-012 — Fake-door: Gerador de orçamento PDF

**VERSION:** 0.1.0  
**Experiment:** EXP-012-2026-09-28  
**Status:** READY for local preview (not published)  
**Tipo:** Landing waitlist / fake-door — **não** gera PDF

## O que é

Landing pt-BR que **parece** um produto “em breve”:

- Headline + problema + “Em breve: gere orçamento PDF em minutos”  
- Bullets de features planejadas (não afirmam existência do produto)  
- Formulário: e-mail, tipo de serviço, “Pagaria R$ 29 one-shot?” (sim / não / talvez)

**Não inventa depoimentos nem estatísticas.** Não há gerador funcional.

## Formulário (produção)

No `index.html`:

```html
<form ... action="REPLACE_WITH_FORM_URL" method="POST" target="_blank">
```

| Situação | Comportamento |
|----------|----------------|
| `action` ainda é `REPLACE_WITH_FORM_URL` | JS previne POST; mostra mensagem de sucesso (demo local / UI only — **não grava dados**) |
| `action` = URL Google Form ou Formspree | POST nativo + mensagem de sucesso na página |

**Static hosting não armazena submissions.** Wire obrigatório:

1. Google Forms (recomendado N0, custo 0), **ou**  
2. Formspree free tier, **ou**  
3. Fallback `mailto:REPLACE_WITH_EMAIL?subject=...` (pior UX)

Campos sugeridos no Google Form (alinhar `name` se usar entry IDs):

- `email`  
- `tipo_servico`  
- `pagaria_29` (sim | nao | talvez)

## Critério de sucesso (EXP-012)

≥ **12** e-mails na waitlist **OU** ≥ **3** respostas “Sim” em “pagaria R$ 29” em **7–14 dias**. Sem isso → kill (ver experiment file).

## Como publicar via GitHub Pages

1. Repo novo (ex.: `gabf-opp-012-orcamento`) — parent/humano cria e faz push.  
2. Coloque `index.html` na raiz.  
3. Substitua `REPLACE_WITH_FORM_URL`.  
4. Pages → `main` / root.  
5. Teste submit real no Form.  
6. Tráfego orgânico / outreach — sem ads pagos neste EXP.

### Preview local

```bash
cd products/OPP-012-orcamento-fakedoor
python3 -m http.server 8081
# http://localhost:8081
```

## Arquivos

| Arquivo | Descrição |
|---------|-----------|
| `index.html` | Landing + form fake-door |
| `README.md` | Este arquivo |

## Custo

**max_cost = 0**
