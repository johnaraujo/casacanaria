# Casa Canária 🏡

Site de divulgação da **Casa Canária** — casa de praia por temporada em Barra de São Miguel, Alagoas.

🔗 **No ar:** https://casacanaria.com.br/
💬 **Contato:** WhatsApp (82) 99933-7253

---

## O que tem aqui

```
index.html      página em português — a fonte da verdade
en/index.html   versão em inglês   (gerada)
es/index.html   versão em espanhol (gerada)
traduzir.py     gera en/ e es/ a partir do index.html
style.css       estilos, mobile-first — compartilhado pelos três idiomas
script.js       galeria, lightbox e textos dos três idiomas
fotos/          fotos da casa, em duas resoluções (-sm = miniatura)
sitemap.xml     mapa do site com as imagens e os hreflang
robots.txt      libera a indexação e aponta o sitemap
CNAME           domínio próprio do GitHub Pages
```

## Traduções

O `index.html` em português é a fonte da verdade. Depois de editá-lo:

```bash
python3 traduzir.py
```

As pastas `en/` e `es/` são recriadas com o mesmo layout. Se você escrever um
texto novo, acrescente a tradução ao dicionário `TRADUCOES` do `traduzir.py` —
o script avisa quando encontra um trecho sem tradução, então nada passa batido.
As legendas das fotos e a lista de comodidades ficam no `script.js`, nos três
idiomas.

Site estático puro: sem build, sem dependências. É só editar e dar `git push`.

---

## Configurações rápidas

Tudo o que muda com frequência está no topo do `script.js`:

```js
const WHATSAPP = '5582999337253';   // 55 + DDD + número
const MENSAGEM_WHATSAPP = 'Olá! Vi o site da Casa Canária...';
```

Todos os botões da página levam para esse WhatsApp, já com a mensagem pronta.
Com `WHATSAPP` vazio, os botões somem.

Para trocar fotos, legendas ou a ordem da galeria, edite o array `FOTOS` no mesmo arquivo.

---

## Publicar uma atualização

```bash
git add -A && git commit -m "atualiza fotos" && git push
```

O GitHub Pages republica sozinho em cerca de um minuto.

---

## Usar um domínio próprio

1. Compre o domínio (ex.: `casacanaria.com.br` no [registro.br](https://registro.br)).
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
   ./trocar-dominio.sh casacanaria.com.br
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
