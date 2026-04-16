# Redirect para WhatsApp com log no Google Sheets

Esse projeto cria uma pagina de redirect que:

1. recebe o clique no seu link
2. captura os dados possiveis no navegador
3. envia esses dados para um Web App do Google Apps Script
4. redireciona o usuario para o WhatsApp da vendedora

## O que e possivel captar nativamente

Sem backend proprio, da para registrar com boa confiabilidade:

- data e hora do clique
- identificador unico do clique
- vendedora de destino
- telefone de destino
- URL da pagina
- path da pagina
- referrer
- user agent
- idioma do navegador
- plataforma do dispositivo
- resolucao da tela
- tamanho atual da viewport
- parametros UTM
- `gclid`, `fbclid`, `ttclid`
- parametros customizados da URL, como `src` e `campaign`

## O que nao e possivel captar nativamente com precisao

- IP real do usuario
- cidade/estado precisos
- nome, email ou telefone do usuario sem ele informar

Para captar IP com confiabilidade, voce precisaria de um backend seu entre o clique e a planilha.

## Como configurar

### 1. Ajuste as vendedoras

Edite [redirect.js](/Users/macbook/Desenvolvedor/tf-redirect/redirect.js) no bloco `CONFIG.sellers`:

```js
  sellers: {
    ana: {
      name: "Ana",
      phone: "5585999991111",
    },
  },
```

Use o telefone em formato internacional, sem `+`, espacos ou simbolos.

### 2. Crie a planilha

Crie uma planilha no Google Sheets e copie o ID dela pela URL:

```txt
https://docs.google.com/spreadsheets/d/ESTE_E_O_ID/edit
```

### 3. Publique o Apps Script

1. Abra `script.google.com`
2. Crie um projeto
3. Cole o conteudo de [apps-script/Code.gs](/Users/macbook/Desenvolvedor/tf-redirect/apps-script/Code.gs)
4. Troque `COLE_AQUI_O_ID_DA_PLANILHA` pelo ID real da planilha
5. Clique em `Deploy` > `New deployment`
6. Escolha `Web app`
7. Execute como: `Me`
8. Quem tem acesso: `Anyone`
9. Publique e copie a URL do Web App

### 4. Configure a URL do Apps Script

No arquivo [redirect.js](/Users/macbook/Desenvolvedor/tf-redirect/redirect.js), troque:

```js
appsScriptUrl: "COLE_AQUI_A_URL_DO_WEB_APP",
```

pela URL publicada do Web App.

### 5. Hospede a pagina

Como o projeto e estatico, voce pode hospedar em qualquer opcao simples:

- Netlify
- Vercel
- GitHub Pages
- hospedagem comum com HTML estatico

## Como usar os links

### Exemplo simples

```txt
https://seudominio.com/?seller=ana
```

### Exemplo com UTMs e origem

```txt
https://seudominio.com/?seller=bia&utm_source=instagram&utm_medium=bio&utm_campaign=campanha_maio&src=link-bio
```

### Exemplo com mensagem personalizada

O parametro `text` deve ser enviado URL-encoded:

```txt
https://seudominio.com/?seller=carla&text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20o%20produto
```

## Observacao importante

O envio foi estruturado para ser leve e nao travar o redirect. Em navegadores modernos, o clique costuma ser registrado normalmente via `sendBeacon`. Mesmo assim, como qualquer coleta client-side, pode haver perda pontual em cenarios de rede ruim ou bloqueios do navegador.
