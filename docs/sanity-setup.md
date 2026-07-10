# SACERIS CMS - passo a passo

Este projeto pode usar o Sanity como painel para o cliente trocar fotos, nomes, precos e links dos produtos sem mexer em codigo.

## 1. Criar a conta e o projeto

1. Acesse https://www.sanity.io/
2. Crie uma conta ou entre com Google/GitHub.
3. Crie um novo projeto.
4. Use o dataset `production`.
5. Copie o `Project ID` do projeto.

## 2. Configurar localmente

Crie um arquivo `.env` na raiz do projeto com:

```env
VITE_WHATSAPP_NUMBER=5519982214588
VITE_MERCADO_PAGO_URL=https://mpago.la/19P6WnE
VITE_SANITY_PROJECT_ID=COLE_AQUI_O_PROJECT_ID
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2026-07-10
SANITY_STUDIO_PROJECT_ID=COLE_AQUI_O_PROJECT_ID
SANITY_STUDIO_DATASET=production
```

Depois rode:

```bash
npm run studio:dev
```

O painel abre em:

```text
http://127.0.0.1:3333
```

## 3. Liberar o site para ler o Sanity

No terminal, depois de fazer login no Sanity, rode:

```bash
npx sanity cors add http://127.0.0.1:5180
npx sanity cors add https://usesaceris.github.io
```

Isso permite que o site local e o GitHub Pages leiam os produtos publicados.

Importante: para esta vitrine, os produtos publicados podem ficar em dataset publico. Nao coloque dados sensiveis no Sanity, como tokens, senhas, documentos ou informacoes privadas.

## 4. Cadastrar produtos

No Studio, abra `Produtos` e crie uma camiseta preenchendo:

- Nome da camiseta
- Identificador
- Mostrar no site
- Etiqueta
- Preco
- Cores disponiveis
- Link de pagamento
- Foto do produto
- Ordem no site

Produtos com `Mostrar no site` desligado ficam escondidos.

## 5. Configurar textos da home

No Studio, abra `Configuracoes do site` para alterar:

- Texto pequeno do topo
- Titulo principal
- Texto do banner principal
- Mensagens da faixa superior
- Link padrao de compra
- WhatsApp

## 6. Publicar o Studio

Quando estiver tudo ok, rode:

```bash
npm run studio:deploy
```

O Sanity vai pedir um nome de dominio para o painel, normalmente algo como:

```text
saceris.sanity.studio
```

## 7. Publicar no GitHub Pages

No GitHub, no repositorio `usesaceris/saceris`, cadastre em:

```text
Settings > Secrets and variables > Actions > Variables
```

Variaveis:

```text
VITE_SANITY_PROJECT_ID
VITE_SANITY_DATASET
VITE_SANITY_API_VERSION
VITE_WHATSAPP_NUMBER
VITE_MERCADO_PAGO_URL
```

Depois faca commit e push. O GitHub Actions vai gerar o site com a conexao do Sanity.

## Observacao importante

O site continua funcionando mesmo sem Sanity configurado, usando os produtos fixos do codigo como fallback.
