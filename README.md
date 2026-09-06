# Casa Caju 🥥

Site de divulgação da **Casa Caju** — casa de praia por temporada em Barra de São Miguel, Alagoas.

🔗 **No ar:** https://johnaraujo.github.io/casacaju/
🏠 **Anúncio oficial:** https://www.airbnb.com.br/rooms/33034679

---

## O que tem aqui

```
index.html      página única (HTML semântico + dados estruturados Schema.org)
style.css       estilos, mobile-first
script.js       galeria, lightbox e configuração (Airbnb / WhatsApp)
fotos/          33 fotos do anúncio, em duas resoluções (-sm = miniatura)
sitemap.xml     mapa do site com as imagens, para o Google
robots.txt      libera a indexação e aponta o sitemap
```

Site estático puro: sem build, sem dependências. É só editar e dar `git push`.

---

## Configurações rápidas

Tudo o que muda com frequência está no topo do `script.js`:

```js
const AIRBNB   = 'https://www.airbnb.com.br/rooms/33034679';
const WHATSAPP = '';   // 55 + DDD + número, ex.: '5582999998888'
```

Com `WHATSAPP` vazio, o botão de WhatsApp simplesmente não aparece.

Para trocar fotos, legendas ou a ordem da galeria, edite o array `FOTOS` no mesmo arquivo.

---

## Publicar uma atualização

```bash
git add -A && git commit -m "atualiza fotos" && git push
```

O GitHub Pages republica sozinho em cerca de um minuto.

---

## Usar um domínio próprio

1. Compre o domínio (ex.: `casacaju.com.br` no [registro.br](https://registro.br)).
2. No painel de DNS do domínio, crie os registros:

   | Tipo  | Nome | Valor |
   |-------|------|-------|
   | A     | @    | `185.199.108.153` |
   | A     | @    | `185.199.109.153` |
   | A     | @    | `185.199.110.153` |
   | A     | @    | `185.199.111.153` |
   | CNAME | www  | `johnaraujo.github.io` |

3. Rode o script abaixo com o seu domínio — ele atualiza o `CNAME`, o `sitemap.xml`,
   o `robots.txt` e todas as URLs absolutas do `index.html`:

   ```bash
   ./trocar-dominio.sh casacaju.com.br
   git add -A && git commit -m "aponta para domínio próprio" && git push
   ```

4. Em **Settings → Pages** do repositório, informe o domínio em *Custom domain*
   e marque **Enforce HTTPS** (o certificado leva alguns minutos para sair).

---

## SEO — o que já está pronto

- `<title>` e meta description com as palavras-chave de busca ("casa de praia
  Barra de São Miguel", "aluguel por temporada", "casa com piscina Alagoas")
- Dados estruturados JSON-LD: `VacationRental`, `LodgingBusiness`, `FAQPage` e
  `WebSite`, com nota, comodidades, geolocalização e horários
- Open Graph e Twitter Card (miniatura bonita ao compartilhar no WhatsApp/Instagram)
- `sitemap.xml` com todas as fotos + `robots.txt`
- HTML semântico, um único `<h1>`, textos alternativos descritivos em todas as imagens
- Imagens com `width`/`height` e `loading="lazy"` (nota alta no Core Web Vitals)
- Seção de perguntas frequentes visível na página, casada com o `FAQPage`

### Depois de publicar

1. Cadastre o site no [Google Search Console](https://search.google.com/search-console)
   e envie o `sitemap.xml`.
2. Faça o mesmo no [Bing Webmaster Tools](https://www.bing.com/webmasters).
3. Valide os dados estruturados no
   [Teste de Resultados Aprimorados](https://search.google.com/test/rich-results).
4. Crie um perfil no **Google Meu Negócio** (categoria "Casa de temporada") — é o
   que mais traz busca local.
