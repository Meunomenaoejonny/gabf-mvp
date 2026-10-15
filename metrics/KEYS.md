# Chaves de Contagem (Abacus Counter Keys)

Este documento lista todas as chaves usadas pelo contador anônimo Abacus (https://abacus.jasoncameron.dev).

Namespace: `gabf-mvp-meunomenaoejonny`

## Visualizações de Página (pv-*)

| Chave | Página | Caminho |
|-------|--------|---------|
| `pv-hub` | Hub / Página inicial | `/` |
| `pv-mei-limite` | Calculadora de limite MEI | `/mei-limite/` |
| `pv-mei-2027` | Limite MEI 2027 foi aprovado? | `/mei-limite/limite-mei-2027-foi-aprovado/` |
| `pv-nfse` | Kit NFS-e Campinas | `/nfse-campinas/` |
| `pv-nfse-prazos` | Prazos NFS-e Campinas 2026 | `/nfse-campinas/prazos-nfse-campinas-2026/` |
| `pv-nfse-passo` | Emissor Nacional passo a passo | `/nfse-campinas/emissor-nacional-passo-a-passo/` |
| `pv-mei-nfse` | MEI e NFS-e Nacional Campinas | `/nfse-campinas/mei-nfse-nacional-campinas/` |
| `pv-erros-emissor` | Erros no Emissor Nacional | `/nfse-campinas/erros-emissor-nacional-nfse/` |
| `pv-simples-nfse` | NFS-e Campinas Simples Nacional | `/nfse-campinas/nfse-campinas-simples-nacional/` |
| `pv-checklist-print` | Checklist para imprimir | `/nfse-campinas/checklist-migracao-nfse-campinas/` |
| `pv-orcamento` | Orçamento em PDF (waitlist) | `/orcamento-fakedoor/` |

## Cliques em CTA/Formulários (click-*)

| Chave | Descrição | Formulário |
|-------|-----------|------------|
| `click-form-011` | CTA guia obrigações MEI | EXP-011 (mei-limite) |
| `click-form-011-2027` | CTA guia obrigações MEI (página 2027) | EXP-011 (limite-mei-2027) |
| `click-form-012` | CTA waitlist orçamento PDF | EXP-012 (orcamento-fakedoor) |
| `click-form-013` | CTA kit NFS-e Campinas | EXP-013 (nfse-campinas) |
| `click-form-013-prazos` | CTA kit NFS-e (página prazos) | EXP-013 (prazos-nfse-campinas-2026) |
| `click-form-013-passo` | CTA kit NFS-e (página passo a passo) | EXP-013 (emissor-nacional-passo-a-passo) |

## Origem (src-*)

Chaves dinâmicas no formato `src-{page}-{utm_source}` quando o parâmetro `utm_source` está presente na URL.

Exemplos:
- `src-hub-google`
- `src-nfse-linkedin`

## Google Forms (EXP-*)

| ID | URL | Descrição |
|----|-----|-----------|
| EXP-011 | `1FAIpQLSe3uIM0Eo4iqWRlqCdXsjrxDzQm2V6-HjINbQhMQKk2lK_B6Q` | Guia de obrigações MEI |
| EXP-012 | `1FAIpQLSed37MIb1bjk8pfaWKv5vdaVoL6jQsiCLxeNRUR186t09Biew` | Waitlist gerador orçamento |
| EXP-013 | `1FAIpQLSetAvZJsOs86qdV1pUT5QLOtzPQ0bef2vhWU4--j0qV0chFrQ` | Kit NFS-e Campinas |

## Observações

- O contador respeita "Do Not Track" (navigator.doNotTrack)
- Não usa cookies
- Não registra dados pessoais
- Só conta visitas de domínios *.github.io
- Visitas de bots (navigator.webdriver) são ignoradas

---
Atualizado em: 15/10/2026
