# Portfólio

Site pessoal em HTML/CSS/JS puro (sem framework, sem build), pronto para ser
publicado na Vercel.

## Estrutura de pastas

- `index.html` — página principal (hero, projetos, sobre, experiência, contato)
- `projetos/` — uma página por case study; `projeto-exemplo.html` é o modelo
  para duplicar a cada novo projeto
- `css/style.css` — todo o estilo visual do site
- `js/main.js` — troca de idioma (PT/EN), scroll suave e outros comportamentos
- `assets/` — imagens, PDF do currículo, etc.

## Como ver o site no seu computador

Não precisa instalar nada. Duas opções:

1. Dê duplo clique em `index.html` para abrir direto no navegador.
2. Ou, se tiver o [Node.js](https://nodejs.org) instalado, rode `npx serve`
   dentro da pasta do projeto e acesse o endereço que aparecer no terminal
   (mais fiel ao que acontece quando o site estiver publicado).

## Como funciona a troca de idioma (PT/EN)

Não existe um arquivo central de traduções. Cada texto do site tem duas
versões lado a lado no próprio HTML:

```html
<span class="i18n" data-lang="pt">Texto em português</span>
<span class="i18n" data-lang="en" hidden>English text</span>
```

O `js/main.js` mostra só a versão do idioma selecionado (o `hidden` some) e
esconde a outra. Para editar um texto, procure o trecho em `index.html` ou na
página do projeto e edite as duas versões (PT e EN) no lugar.

## Como adicionar um novo projeto

1. Duplique `projetos/projeto-exemplo.html` e renomeie o arquivo
   (ex: `projetos/nome-do-projeto.html`).
2. Edite os textos entre colchetes `[assim]`, em português e inglês.
3. Adicione ou remova seções conforme o case pedir — nem todo projeto precisa
   de todas as seções do modelo.
4. Volte no `index.html`, na seção "Projetos selecionados", e duplique um
   `<li>` da lista apontando para o novo arquivo.

## Publicando (GitHub + Vercel)

Depois que o conteúdo estiver pronto, o fluxo é: subir este projeto para um
repositório no GitHub e conectar esse repositório à Vercel, que publica o
site automaticamente a cada alteração. O passo a passo fica registrado na
conversa com a Claude.
