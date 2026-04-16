# Guia de parametros na URL

Este documento explica como montar os links do redirect com parametros na URL, quais campos o sistema reconhece e como padronizar isso para o time comercial e de marketing.

## Estrutura basica

Uma URL com parametros segue este formato:

```txt
https://redirecttf.vercel.app/?parametro1=valor1&parametro2=valor2&parametro3=valor3
```

Regras:

- o primeiro parametro vem depois de `?`
- os proximos parametros sao separados por `&`
- cada parametro segue o formato `nome=valor`
- os nomes dos parametros precisam estar escritos corretamente

## Parametros aceitos hoje

O projeto atual le estes parametros em [redirect.js](/Users/macbook/Desenvolvedor/tf-redirect/redirect.js):

- `seller`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_id`
- `utm_term`
- `utm_content`
- `gclid`
- `fbclid`
- `ttclid`
- `src`
- `campaign`
- `text`

## Parametro obrigatorio

### `seller`

Define para qual vendedora o usuario sera enviado.

Hoje, os valores configurados no projeto sao:

- `rafa`
- `nicaele`

Exemplo:

```txt
https://redirecttf.vercel.app/?seller=rafa
```

Se o `seller` vier com nome diferente do que esta configurado no codigo, o redirect nao encontra a vendedora correta.

## Parametros de UTM

As UTMs servem para identificar a origem do clique.

### `utm_source`

Indica a origem do trafego.

Exemplos comuns:

- `instagram`
- `facebook`
- `google`
- `youtube`
- `whatsapp`
- `email`

Exemplo:

```txt
utm_source=instagram
```

### `utm_medium`

Indica o meio do trafego.

Exemplos comuns:

- `bio`
- `story`
- `cpc`
- `social`
- `email`
- `grupo`

Exemplo:

```txt
utm_medium=story
```

### `utm_campaign`

Indica o nome da campanha.

Boas praticas:

- usar letras minusculas
- trocar espacos por `_` ou `-`
- manter um padrao consistente

Exemplos:

- `campanha_maio`
- `black_friday_2026`
- `lancamento_torre_a`

Exemplo:

```txt
utm_campaign=campanha_maio
```

### `utm_id`

Serve para identificar uma campanha com um codigo interno.

Exemplo:

```txt
utm_id=meta-0426
```

### `utm_term`

Muito usada em campanhas pagas para identificar termo, publico ou palavra-chave.

Exemplo:

```txt
utm_term=apartamento_3_quartos
```

### `utm_content`

Serve para diferenciar criativos, botoes ou variacoes do mesmo anuncio.

Exemplos:

- `video_a`
- `imagem_1`
- `botao_principal`
- `cta_topo`

Exemplo:

```txt
utm_content=botao_principal
```

## Parametros extras aceitos

### `gclid`

Identificador do Google Ads. Normalmente entra automaticamente em campanhas quando a plataforma esta configurada para isso.

### `fbclid`

Identificador associado ao ecossistema Meta.

### `ttclid`

Identificador associado ao TikTok.

### `src`

Campo livre para controle interno da origem do link.

Exemplos:

- `src=link-bio`
- `src=site-rodape`
- `src=qr-evento`

### `campaign`

Campo livre complementar. Pode ser usado para naming interno quando a equipe quiser separar do padrao UTM.

Exemplo:

```txt
campaign=acao_comercial_abril
```

### `text`

Mensagem que sera pre-preenchida no WhatsApp.

Esse valor precisa estar codificado em URL.

Exemplo:

```txt
text=Ol%C3%A1%2C%20quero%20mais%20informa%C3%A7%C3%B5es
```

## Exemplos prontos

### Link simples

```txt
https://redirecttf.vercel.app/?seller=rafa
```

### Link com UTM basica

```txt
https://redirecttf.vercel.app/?seller=rafa&utm_source=instagram&utm_medium=bio&utm_campaign=campanha_maio
```

### Link com varias UTMs

```txt
https://redirecttf.vercel.app/?seller=nicaele&utm_source=facebook&utm_medium=cpc&utm_campaign=lancamento_torre_b&utm_id=meta-001&utm_content=video_1&utm_term=investimento
```

### Link com controle interno

```txt
https://redirecttf.vercel.app/?seller=rafa&utm_source=instagram&utm_medium=story&utm_campaign=campanha_maio&src=link-bio&campaign=acao_comercial_abril
```

### Link com mensagem personalizada no WhatsApp

```txt
https://redirecttf.vercel.app/?seller=nicaele&utm_source=site&utm_medium=botao&utm_campaign=contato_direto&text=Ol%C3%A1%2C%20vim%20do%20site%20e%20quero%20falar%20com%20a%20equipe
```

## Como montar sem erro

Use esta ordem:

1. comece com a URL base
2. adicione `?seller=...`
3. adicione as UTMs com `&`
4. adicione parametros extras se precisar
5. se houver mensagem em `text`, codifique antes

Exemplo montado passo a passo:

```txt
https://redirecttf.vercel.app/
```

```txt
https://redirecttf.vercel.app/?seller=rafa
```

```txt
https://redirecttf.vercel.app/?seller=rafa&utm_source=instagram&utm_medium=bio&utm_campaign=campanha_maio
```

```txt
https://redirecttf.vercel.app/?seller=rafa&utm_source=instagram&utm_medium=bio&utm_campaign=campanha_maio&utm_content=botao_principal&src=link-bio
```

## Padrao recomendado para o time

Para evitar bagunca nos relatórios, recomendo este padrao:

- `utm_source`: plataforma de origem
- `utm_medium`: formato ou posicao
- `utm_campaign`: nome da campanha
- `utm_content`: variacao da peca ou CTA
- `src`: apelido interno do ponto de entrada

Exemplo padronizado:

```txt
https://redirecttf.vercel.app/?seller=rafa&utm_source=instagram&utm_medium=story&utm_campaign=lancamento_abril&utm_content=video_a&src=story-dia-01
```

## Erros comuns

### 1. Esquecer o `seller`

Errado:

```txt
https://redirecttf.vercel.app/?utm_source=instagram&utm_medium=bio
```

Certo:

```txt
https://redirecttf.vercel.app/?seller=rafa&utm_source=instagram&utm_medium=bio
```

### 2. Usar nome de vendedora diferente do configurado

Errado:

```txt
https://redirecttf.vercel.app/?seller=ana
```

Hoje o codigo reconhece `rafa` e `nicaele`.

### 3. Colocar espacos sem codificar

Errado:

```txt
https://redirecttf.vercel.app/?seller=rafa&text=Olá, quero falar com vocês
```

Certo:

```txt
https://redirecttf.vercel.app/?seller=rafa&text=Ol%C3%A1%2C%20quero%20falar%20com%20voc%C3%AAs
```

### 4. Duplicar parametros sem necessidade

Evite:

```txt
https://redirecttf.vercel.app/?seller=rafa&utm_source=instagram&utm_source=facebook
```

Use apenas um valor por parametro.

## Como gerar texto codificado para o WhatsApp

Se voce quiser transformar uma mensagem comum em valor seguro para URL, pode usar o console do navegador:

```js
encodeURIComponent("Olá, vim do Instagram e quero saber mais")
```

Resultado esperado:

```txt
Ol%C3%A1%2C%20vim%20do%20Instagram%20e%20quero%20saber%20mais
```

## Sugestao de links por canal

### Instagram bio

```txt
https://redirecttf.vercel.app/?seller=rafa&utm_source=instagram&utm_medium=bio&utm_campaign=institucional
```

### Instagram story

```txt
https://redirecttf.vercel.app/?seller=rafa&utm_source=instagram&utm_medium=story&utm_campaign=institucional
```

### Facebook ads

```txt
https://redirecttf.vercel.app/?seller=nicaele&utm_source=facebook&utm_medium=cpc&utm_campaign=geracao_leads
```

### Google ads

```txt
https://redirecttf.vercel.app/?seller=nicaele&utm_source=google&utm_medium=cpc&utm_campaign=pesquisa_marca
```

### QR code de evento

```txt
https://redirecttf.vercel.app/?seller=rafa&utm_source=offline&utm_medium=qrcode&utm_campaign=feirao_abril&src=totem_principal
```

## Resumo pratico

Se quiser o minimo para funcionar:

```txt
https://redirecttf.vercel.app/?seller=rafa
```

Se quiser o minimo com rastreio:

```txt
https://redirecttf.vercel.app/?seller=rafa&utm_source=instagram&utm_medium=bio&utm_campaign=campanha_maio
```

Se quiser rastreio mais organizado:

```txt
https://redirecttf.vercel.app/?seller=nicaele&utm_source=facebook&utm_medium=cpc&utm_campaign=lancamento_abril&utm_content=video_a&src=anuncio-01
```
