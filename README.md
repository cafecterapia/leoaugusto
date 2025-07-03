# Leonardo Augusto - Direito Militar

Um site profissional para Leonardo Augusto, especialista em Direito Militar.

## 🚀 Tecnologias Utilizadas

- **Vite** - Build tool e dev server
- **Lenis** - Smooth scrolling
- **Vanilla JavaScript** - Funcionalidades interativas
- **CSS3** - Estilização moderna
- **HTML5** - Estrutura semântica

## 📦 Instalação e Desenvolvimento

```bash
# Clone o repositório
git clone <repository-url>
cd leoaugusto

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev

# Acesse http://localhost:3000
```

## 🏗️ Build e Deploy

### Build Local
```bash
# Build para produção
npm run build

# Preview do build
npm run preview
```

### Deploy no Cloudflare Pages

#### Método 1: Git Integration (Recomendado)
1. Conecte seu repositório ao Cloudflare Pages
2. Configure as seguintes opções:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node.js version**: `18` ou superior

⚠️ **IMPORTANTE**: O arquivo `wrangler.toml` está configurado corretamente para Pages. Se você ver o erro "wrangler.toml file was found but it does not appear to be valid", verifique se o arquivo contém:

```toml
[build]
command = "npm run build"
pages_build_output_dir = "./dist"
```

#### Método 2: Upload Manual
```bash
# Build o projeto
npm run build

# Faça upload da pasta 'dist' no Cloudflare Pages
```

#### Método 3: Wrangler CLI
```bash
# Instale o Wrangler globalmente
npm install -g wrangler

# Faça login no Cloudflare
wrangler login

# Deploy do projeto
wrangler pages deploy dist --project-name=leoaugusto
```

## 🔧 Configurações do Cloudflare Pages

### Variáveis de Ambiente
- Nenhuma variável de ambiente específica é necessária

### Headers de Segurança
O arquivo `public/_headers` inclui:
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- Cache headers otimizados

### Redirects
O arquivo `public/_redirects` gerencia:
- Redirecionamentos de URLs
- Fallbacks para SPA

## 📁 Estrutura do Projeto

```
leoaugusto/
├── public/
│   ├── images/           # Imagens estáticas
│   ├── _headers         # Headers do Cloudflare Pages
│   └── _redirects       # Redirects do Cloudflare Pages
├── dist/                # Build de produção
├── src/
│   ├── main.js         # JavaScript principal
│   └── style.css       # Estilos CSS
├── index.html          # HTML principal
├── vite.config.mjs     # Configuração do Vite
└── package.json        # Dependências e scripts
```

## ✨ Funcionalidades

### Navegação
- Menu mobile responsivo
- Smooth scrolling com Lenis
- Navegação por seções
- Header sticky

### Interações
- Botões de download (PDF e vCard)
- Formulário de contato
- Notificações de feedback
- Animações suaves

### Performance
- Lazy loading de imagens
- CSS e JS minificados
- Assets otimizados
- Cache headers configurados

## 🎨 Customização

### Arquitetura JavaScript
O projeto utiliza uma arquitetura moderna e robusta:

```javascript
// Event Delegation Pattern
document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-action]');
    if (!target) return;
    
    const action = target.getAttribute('data-action');
    // Handle specific actions
});
```

**Vantagens desta abordagem:**
- ✅ Não depende de `onclick` attributes (melhor segurança)
- ✅ Funciona com CSP (Content Security Policy) restritivo
- ✅ Melhor performance (um listener vs muitos)
- ✅ Compatível com componentes dinâmicos

### Cores
As cores principais podem ser alteradas no arquivo `style.css`:
```css
:root {
  --primary-color: #c9a96e;
  --secondary-color: #b8965e;
  --background-dark: #0d1117;
}
```

### Fontes
- **Playfair Display** - Títulos elegantes
- **Inter** - Texto corpo

### Imagens
- Coloque as imagens na pasta `public/images/`
- Use formatos otimizados (WebP quando possível)
- Implemente lazy loading para performance

## 🐛 Troubleshooting

### ⚠️ CLOUDFLARE PAGES BUILD FALHA
- ✅ **SOLUÇÃO APLICADA**: Corrigido `wrangler.toml` para usar `pages_build_output_dir`
- ✅ **Build command**: Configurado `npm run build` no wrangler.toml
- ✅ **Output directory**: Configurado `./dist` como pages_build_output_dir

### JavaScript não funciona no Cloudflare Pages
- ✅ **SOLUÇÃO APLICADA**: Removidos onclick attributes e implementado event delegation
- ✅ **CSP Headers**: Content Security Policy foi ajustado para não bloquear JavaScript
- ✅ **Build correto**: Verifique se o build foi executado: `npm run build`
- ✅ **Assets corretos**: Confirme que os assets estão na pasta `dist/`

### Imagens não carregam
- ✅ **SOLUÇÃO APLICADA**: Corrigidos caminhos para `/images/photo.jpg` (sem `public/`)
- ✅ **Vite Configuration**: Configurado para servir assets corretamente
- ✅ **Build process**: Images são copiadas automaticamente para `dist/images/`

### Smooth scrolling não funciona
- ✅ **Lenis atualizado**: Migrado de `@studio-freight/lenis` para `lenis`
- ✅ **ES6 Modules**: Configuração correta para bundling
- ✅ **Fallbacks**: Implementados fallbacks para `prefers-reduced-motion`

### ⚠️ Problemas Técnicos Identificados e Resolvidos

1. **Cloudflare Pages Build Configuration**:
   - ❌ Problema: `wrangler.toml` configurado para Workers, não Pages
   - ✅ Solução: Configurado `pages_build_output_dir` no wrangler.toml

2. **Content Security Policy (CSP)**: 
   - ❌ Problema: CSP bloqueava onclick attributes
   - ✅ Solução: Removido CSP e implementado event delegation

3. **Inline JavaScript**:
   - ❌ Problema: onclick="function()" não é considerado boa prática
   - ✅ Solução: Implementado event delegation com data-attributes

4. **Asset Paths**:
   - ❌ Problema: Paths com `public/` não funcionam após build
   - ✅ Solução: Paths relativos `/images/` processados pelo Vite

5. **ES6 Modules**:
   - ❌ Problema: Import do Lenis deprecated
   - ✅ Solução: Atualizado para package atual `lenis`

## ✅ Checklist de Deploy - Cloudflare Pages

Antes de fazer o deploy, verifique se todos os itens estão corretos:

### Arquivos de Configuração
- [ ] `wrangler.toml` contém `pages_build_output_dir = "./dist"`
- [ ] `package.json` tem script `"build": "vite build"`
- [ ] `vite.config.mjs` está configurado corretamente
- [ ] `public/_headers` existe (opcional, para headers personalizados)
- [ ] `public/_redirects` existe (opcional, para redirects)

### Build Local
- [ ] `npm install` executado sem erros
- [ ] `npm run build` gera pasta `dist/` corretamente
- [ ] Pasta `dist/` contém:
  - [ ] `index.html`
  - [ ] `assets/` com JS e CSS minificados
  - [ ] `images/` com todas as imagens
  - [ ] `_headers` e `_redirects` (se existirem)

### Cloudflare Pages Dashboard
- [ ] Build command: `npm run build`
- [ ] Build output directory: `dist`
- [ ] Node.js version: 18+
- [ ] Variáveis de ambiente (se necessárias)

### Teste Pós-Deploy
- [ ] Site carrega sem erros 404
- [ ] JavaScript funciona (botões respondem)
- [ ] Imagens carregam corretamente
- [ ] Smooth scrolling funciona
- [ ] Formulário de contato funciona
- [ ] Menu mobile funciona

## 📞 Suporte

Para problemas técnicos ou dúvidas sobre o projeto, verifique:
1. Console do navegador para erros JavaScript
2. Network tab para recursos que falharam ao carregar
3. Logs do Cloudflare Pages para erros de build

## 📄 Licença

Este projeto é propriedade de Leonardo Augusto - Direito Militar.