# OPP-011 — Calculadora limite MEI

**VERSION:** 0.1.0  
**Experiment:** EXP-011-2026-09-28  
**Status:** READY for local preview (not published)  
**Stack:** HTML + CSS + JS (static, no backend, no paid APIs)

## O que é

Página única (pt-BR) para o MEI informar faturamento acumulado no ano, mês atual e limite anual (editável; padrão **R$ 81.000** — ESTIMATIVA/configurável). Mostra:

- % do limite usado + barra visual
- - Restante até o limite
  - - Projeção linear até dezembro (média mensal informada **ou** média do acumulado ÷ mês atual)
   
    - **Não é contabilidade nem assessoria.** Disclaimer claro na UI.
   
    - ## Limite MEI (não inventar)
   
    - - **Padrão na UI:** R$ 81.000 (MEI padrão).
      - - **Fonte oficial citada:** [Teto do MEI — gov.br/memp](https://www.gov.br/memp/pt-br/teto-do-mei) (publicado 29/06/2026; modificado 16/09/2026): *“Atualmente, o limite de faturamento anual do MEI é de R$ 81 mil.”* PLP 186/2026 propõe aumentos para 2027/2028 — **ainda não em vigor**.
        - - **DASN:** [Declaração Anual de Faturamento](https://www.gov.br/empresas-e-negocios/pt-br/empreendedor/servicos-para-mei/declaracao-anual-de-faturamento).
          - - Campo de limite é **editável**; usuário deve confirmar o valor vigente no Portal do Empreendedor.
            - - **DESCONHECIDO / fora de escopo desta versão:** proporcionalidade mês a mês para abertura mid-year (mencionado em gov.br/memp como regra geral — usuário deve consultar fonte oficial); MEI caminhoneiro e outros regimes especiais.
             
              - ## CTA / formulário
             
              - No `index.html`, o botão aponta para:
             
              - ```
                REPLACE_WITH_FORM_URL
                ```

                **Ação humana obrigatória antes de publicar:** criar Google Form (“Quero o guia de obrigações MEI (PDF)” — e-mail + opcional cidade) e substituir o `href` do `#ctaForm`.

                ## Critério de sucesso (EXP-011)

                ≥ **5** preenchimentos do formulário em **14 dias**. Sem isso → kill/pivot (ver `experiments/EXP-011-2026-09-28.md`).

                ## Como publicar via GitHub Pages

                1. Crie um repositório (ex.: `gabf-opp-011-mei-limite`) — **não** feito por este agente.
                2. 2. Coloque `index.html` na raiz do repo (ou em `/docs`).
                   3. 3. Settings → Pages → Branch `main` (root ou `/docs`).
                      4. 4. Substitua `REPLACE_WITH_FORM_URL` pelo link do Google Form.
                         5. 5. Abra a URL `https://<user>.github.io/<repo>/` e teste no celular.
                            6. 6. Divulgue o experimento (grupos MEI, LinkedIn, etc.) e conte respostas do Form.
                              
                               7. ### Preview local
                              
                               8. ```bash
                                  cd products/OPP-011-mei-limite
                                  python3 -m http.server 8080
                                  # abra http://localhost:8080
                                  ```

                                  Ou abra `index.html` direto no navegador (file://).

                                  ## Arquivos

                                  | Arquivo | Descrição |
                                  |---------|-----------|
                                  | `index.html` | App completo (CSS/JS inline) |
                                  | `README.md` | Este arquivo |

                                  ## Custo

                                  **max_cost = 0** (GitHub Pages gratuito + Google Forms gratuito).
                                  
