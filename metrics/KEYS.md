# Chaves de Contagem (Abacus Counter Keys)

Este documento lista todas as chaves usadas pelo contador anônimo Abacus (https://abacus.jasoncameron.dev).

Namespace: `gabf-mvp-meunomenaoejonny`

## Contador v3 (a partir de 19/10/2026)

O contador v3 separa robô de pessoa, conta engajamento e origem, e registra eventos de captura e ferramentas.

### Visualizações de Página (pv-*)

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
| `pv-meu-prazo` | Ferramenta "Meu prazo" | `/nfse-campinas/meu-prazo-nfse-campinas/` |
| `pv-ti-nfse` | TI, software e plataformas | `/nfse-campinas/nfse-campinas-ti-software-plataformas/` |
| `pv-orcamento` | Orçamento em PDF (waitlist) | `/orcamento-fakedoor/` |

### Detecção de Bot (bot-*)

| Chave | Descrição |
|-------|-----------|
| `bot-{page}` | Visita detectada como bot (navigator.webdriver ou UA de bot) |

### Engajamento (eng-*)

| Chave | Descrição |
|-------|-----------|
| `eng-{page}` | Usuário engajou na página (rolou ≥50% ou ficou ≥25s) |

### CTA de Captura Visível (ctav-*)

| Chave | Descrição |
|-------|-----------|
| `ctav-{page}` | Widget de captura ficou visível (≥50% na tela) |

### Captura de E-mail (cap-*)

| Chave | Descrição |
|-------|-----------|
| `cap-{page}` | Usuário enviou e-mail pelo formulário de 1 campo |

### Clique no Lembrete de Agenda (click-cal-*)

| Chave | Descrição |
|-------|-----------|
| `click-cal-{page}` | Usuário clicou em "Pôr lembrete na agenda" |

### Clique no Link do Kit (click-kit-*)

| Chave | Descrição |
|-------|-----------|
| `click-kit-{slug}` | Usuário clicou em link para o hub do kit NFS-e Campinas |

### Uso de Ferramentas (tool-*)

| Chave | Descrição |
|-------|-----------|
| `tool-meu-prazo` | Usuário usou a ferramenta "Meu prazo" |

### Origem do Tráfego (ref-*)

| Chave | Descrição |
|-------|-----------|
| `ref-{page}-google` | Visita vinda do Google |
| `ref-{page}-bing` | Visita vinda do Bing |
| `ref-{page}-other` | Visita vinda de outro referrer externo |
| `ref-{page}-direct` | Visita direta (sem referrer) |

### UTM Source (src-*)

Chaves dinâmicas no formato `src-{page}-{utm_source}` quando o parâmetro `utm_source` está presente na URL.

Exemplos:
- `src-hub-google`
- `src-nfse-linkedin`

## Chaves Antigas (v1/v2, compatibilidade)

As chaves `pv-*` continuam com o mesmo nome (série histórica preservada).
As chaves `click-form-*` param de subir conforme o widget substitui o Google Form direto.

| Chave | Descrição | Formulário |
|-------|-----------|------------|
| `click-form-011` | CTA guia obrigações MEI | EXP-011 (mei-limite) |
| `click-form-011-2027` | CTA guia obrigações MEI (página 2027) | EXP-011 (limite-mei-2027) |
| `click-form-012` | CTA waitlist orçamento PDF | EXP-012 (orcamento-fakedoor) |
| `click-form-013` | CTA kit NFS-e Campinas (descontinuado) | EXP-013 |
| `click-form-013-prazos` | CTA kit NFS-e (página prazos, descontinuado) | EXP-013 |
| `click-form-013-passo` | CTA kit NFS-e (página passo a passo, descontinuado) | EXP-013 |

## Google Forms (EXP-*)

| ID | URL | Descrição |
|----|-----|-----------|
| EXP-011 | `1FAIpQLSe3uIM0Eo4iqWRlqCdXsjrxDzQm2V6-HjINbQhMQKk2lK_B6Q` | Guia de obrigações MEI |
| EXP-012 | `1FAIpQLSed37MIb1bjk8pfaWKv5vdaVoL6jQsiCLxeNRUR186t09Biew` | Waitlist gerador orçamento |
| EXP-013 | `1FAIpQLSetAvZJsOs86qdV1pUT5QLOtzPQ0bef2vhWU4--j0qV0chFrQ` | Kit NFS-e Campinas (usado pelo widget de 1 campo) |

## Observações

- O contador v3 respeita "Do Not Track" (navigator.doNotTrack)
- Não usa cookies
- Não registra dados pessoais
- Só conta visitas de domínios *.github.io
- Visitas de bots (navigator.webdriver ou UA de bot) são separadas em `bot-*`
- Chaves nascem no Abacus no primeiro hit, sem cadastro prévio

---
Atualizado em: 19/10/2026
