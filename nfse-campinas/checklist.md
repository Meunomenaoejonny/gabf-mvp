# Kit transição NFS-e Nacional / Campinas — Checklist (GABF OPP-013)

**VERSION:** 0.1.0  
**Atualizado:** 2026-09-28 (America/Sao_Paulo)  
**Uso:** copiar para Google Docs / PDF; marcar □ conforme avança.  
**Disclaimer:** isto **não é** contabilidade, assessoria jurídica nem fiscal. Confirme prazos e regras nas fontes oficiais. Regras mudam.

---

## Fontes oficiais (verifique sempre)

| O quê | URL | Status verificação |
|-------|-----|--------------------|
| Obrigatoriedade ME/EPP Simples — Emissor Nacional a partir de **1º/11/2026** (Res. CGSN 191/2026) | https://www.gov.br/receitafederal/pt-br/assuntos/noticias/2026/agosto/simples-nacional-nfs-e-nacional-sera-obrigatoria-para-me-e-epp-a-partir-de-1o-de-novembro-de-2026 | FATO_VERIFICADO (WebFetch 2026-09-28) |
| Cronograma Campinas (out/nov/dez/2026 + IBS/CBS 1/1/2027) | https://sampi.net.br/campinas/noticias/3006919/campinas/2026/09/campinas-muda-emissao-de-notas-fiscais-veja-os-novos-prazos | FATO_VERIFICADO (Sampi 27/09/2026; WebFetch 2026-09-28) |
| Portal NFS-e (gov.br) | https://www.gov.br/nfse/pt-br/pagina-inicial | Oficial |
| Emissor Nacional (Portal do Contribuinte) | https://www.nfse.gov.br/EmissorNacional | Oficial |
| Serviço gov.br — emitir NFS-e padrão nacional | https://www.gov.br/pt-br/servicos/emitir-nota-fiscal-de-servico-eletronica | Oficial |
| Obrigações MEI 2026 (Sebrae RN — contexto MEI) | https://blog.rn.sebrae.com.br/obrigacoes-do-mei-2026/ | Referência |

**Atenção Campinas:** a Prefeitura mantém **dois sistemas** durante a transição. O emissor municipal antigo **não** tem campos IBS/CBS. Identifique **sua** data no cronograma municipal + a regra federal do Simples.

---

## Para quem é este kit

- Prestadores de serviço **ME / EPP** optantes do **Simples Nacional** em Campinas (e interior-SP com lógica similar).  
- **MEI** que já emite (ou deve emitir) NFS-e padrão nacional — use as etapas como revisão de acesso/cadastro.  
- Contadores/donos que precisam de um **roteiro leigo** "o que fazer esta semana", sem mensalidade.

**Não substitui** contador, software de emissão pago, nem orientação da Secretaria Municipal de Finanças.

---

## Visão rápida dos prazos (Campinas + federal)

| Data | O que acontece (resumo de fontes oficiais/imprensa local) |
|------|----------------------------------------------------------|
| **1º/10/2026** | Campinas: novo emissor obrigatório para serviços sujeitos ao ISS na regra geral (exceto atividades com prazo em dez.). |
| **1º/11/2026** | **Federal (Simples ME/EPP):** uso **obrigatório e exclusivo** do **Emissor Nacional** da NFS-e (Res. CGSN 191/2026). Campinas alinha Simples a esta data. |
| **1º/12/2026** | Campinas: plataformas digitais / intermediação, processamento/armazenamento/hospedagem de dados, desenvolvimento de programas, conteúdos pela internet, transporte coletivo municipal (lista da cobertura Sampi). |
| **1º/01/2027** | Simples: passam a produzir efeitos regras **IBS/CBS** no documento fiscal (além de continuar no Emissor Nacional). |

De **1/11/2026 a 31/12/2026** (RFB): emitir pelo Emissor Nacional **sem** necessidade de aplicar regras CBS/IBS no Simples ainda. A partir de **1/1/2027**: continuar no Emissor Nacional **e** observar IBS/CBS quando cabível.

---

## Etapa OUTUBRO/2026 — Preparar acesso e descobrir "qual sistema"

- [ ] Confirmar se sou **MEI**, **ME** ou **EPP** e se sou optante do **Simples Nacional**.  
- [ ] Listar os tipos de serviço que presto (CNAE / descrição) e se há ISS municipal.  
- [ ] Ler a notícia RFB da Res. CGSN 191/2026 (link acima).  
- [ ] Ler o cronograma Campinas (Sampi / Prefeitura) e marcar **minha** data de obrigatoriedade.  
- [ ] Criar/atualizar conta **gov.br** (nível **Prata ou Ouro** costuma ser exigido no serviço nacional — confirme no portal).  
- [ ] Testar login no [Emissor Nacional](https://www.nfse.gov.br/EmissorNacional) (gov.br ou certificado).  
- [ ] Guardar print/PDF das telas de acesso ok (para suporte depois).  
- [ ] Se uso software/contador: perguntar se já emite via **API/Emissor Nacional** ou só municipal.  
- [ ] **Lembrete Calendar:** "Revisar sistema NFS-e Campinas" — **15/10/2026 09:00**.  
- [ ] **Lembrete Calendar:** "Simples → Emissor Nacional obrigatório amanhã" — **31/10/2026 17:00**.

---

## Etapa NOVEMBRO/2026 — Virada Simples (1º/11)

- [ ] A partir de **1º/11/2026**, se ME/EPP Simples prestador de serviço sujeito a NFS-e: emitir **somente** pelo **Emissor Nacional** (web ou API).  
- [ ] Não emitir no sistema municipal antigo **se** minha obrigação já for o nacional (risco de nota no lugar errado).  
- [ ] Fazer **1 emissão teste** (valor simbólico / rascunho conforme permitido) e validar DANFSE/XML.  
- [ ] Atualizar dados do tomador (cliente PJ/PF) e descrição do serviço.  
- [ ] Conferir com contador se há particularidade municipal Campinas ainda no ISS.  
- [ ] **Lembrete Calendar:** "Checklist pós-virada NFS-e Nacional" — **03/11/2026 09:00**.  
- [ ] **Lembrete Calendar:** "Revisão mensal emissões NFS-e" — **28/11/2026 09:00**.

---

## Etapa DEZEMBRO/2026 — Grupos com prazo municipal + fechar o ano

- [ ] Se minha atividade está na lista de **1º/12/2026** (plataformas, dados, software, conteúdo internet, transporte coletivo municipal — ver Sampi): migrar/confirmar novo emissor nessa data.  
- [ ] Revisar todas as notas de nov–dez: sistema usado × obrigação do meu enquadramento.  
- [ ] Separar arquivos XML/DANFSE em pasta do ano (Drive/PC).  
- [ ] Planejar com contador a virada **IBS/CBS** de janeiro/2027 (informação no documento fiscal).  
- [ ] **Lembrete Calendar:** "Prazo Campinas grupo dez/2026" — **30/11/2026 17:00**.  
- [ ] **Lembrete Calendar:** "Preparar IBS/CBS no Emissor Nacional" — **20/12/2026 09:00**.

---

## Etapa JANEIRO/2027 — IBS / CBS no Simples

- [ ] A partir de **1º/01/2027**: continuar no Emissor Nacional **e** observar destaques/informações **IBS e CBS** quando a regulamentação exigir.  
- [ ] Não assumir que "2026 já cobria IBS/CBS no Simples" — RFB separa as datas (nov/2026 = emissor; jan/2027 = IBS/CBS).  
- [ ] Emitir 1ª nota de janeiro e revisar campos novos com contador.  
- [ ] Atualizar este checklist se a Prefeitura/RFB publicar mudança.  
- [ ] **Lembrete Calendar:** "Virada IBS/CBS Simples — conferir nota" — **02/01/2027 09:00**.

---

## Como criar os lembretes no Google Calendar (manual, 2 min)

1. Abrir [Google Calendar](https://calendar.google.com).  
2. Criar evento com o título sugerido acima.  
3. Ativar notificação (pop-up + e-mail) **1 dia antes** e **1 hora antes**.  
4. Opcional: calendário só "Fiscal MEI/ME" compartilhado com o contador.

*(Este kit não cria eventos automaticamente — você copia as datas.)*

---

## Mini FAQ (não é assessoria)

**MEI já era obrigado?**  
O portal NFS-e indica obrigação de MEI prestador ao padrão nacional desde **01/09/2023**. Mesmo assim, use outubro para validar login e fluxo.

**Posso continuar no emissor da Prefeitura de Campinas?**  
Depende do **seu** enquadramento e da **data** do cronograma. Simples ME/EPP: a partir de **1/11/2026**, a cobertura RFB + reportagem Campinas apontam para **Emissor Nacional exclusivo**. Em dúvida: Secretaria Municipal de Finanças + contador.

**Isto garante conformidade?**  
**Não.** É um checklist operacional com links oficiais.

---

## Entrega do kit (produto GABF)

- Este markdown / Docs  
- Landing: waitlist Form (sem checkout neste ciclo — DESCONHECIDO)  
- Preço alvo futuro: ESTIMATIVA R$ 27–67 (**não validado**)

GABF · OPP-013 · EXP-013-2026-09-28 · VERSION 0.1.0
