// src/pages/home/index.js
import "./pages.css"

export function HomePage() {
  return `
    <div class="page home-page">
      <section class="hero" id="inicio" aria-labelledby="home-title">
        <p class="eyebrow">LENO APP · PRODUTIVIDADE</p>
        <h1 id="home-title">Mais clareza para organizar sua rotina.</h1>
        <p class="hero__text">
          Conheça uma forma simples de reunir ferramentas e informações
          importantes em um só lugar.
        </p>
        <div class="hero__actions">
          <a class="button button--primary" href="/#features" data-link>Conhecer recursos</a>
          <a class="button button--secondary" href="/details" data-link>Ver detalhes</a>
        </div>
      </section>

      <section class="content-section" id="features" aria-labelledby="features-title">
        <p class="eyebrow">RECURSOS</p>
        <h2 id="features-title">Feito para deixar o dia a dia mais organizado.</h2>
        <div class="card-grid">
          <article class="info-card">
            <span class="info-card__number">01</span>
            <h3>Organização</h3>
            <p>Encontre em um só espaço as ferramentas que ajudam na sua rotina.</p>
          </article>
          <article class="info-card">
            <span class="info-card__number">02</span>
            <h3>Praticidade</h3>
            <p>Acesse os recursos principais com uma navegação clara e direta.</p>
          </article>
          <article class="info-card">
            <span class="info-card__number">03</span>
            <h3>Foco</h3>
            <p>Use uma interface simples para manter a atenção no que precisa fazer.</p>
          </article>
        </div>
      </section>

      <section class="content-section content-section--muted" id="preview" aria-labelledby="preview-title">
        <p class="eyebrow">PRÉVIA</p>
        <h2 id="preview-title">Uma experiência pensada para você.</h2>
        <p>
          Esta área fica pronta para receber a captura de tela ou a demonstração
          do aplicativo quando os materiais visuais estiverem definidos.
        </p>
        <a class="text-link" href="/details" data-link>Conheça os detalhes →</a>
      </section>

      <section class="content-section" id="download" aria-labelledby="download-title">
        <p class="eyebrow">COMECE A EXPLORAR</p>
        <h2 id="download-title">Tenha seus recursos sempre à mão.</h2>
        <p>
          Os links de download serão adicionados aqui quando as versões do
          aplicativo estiverem disponíveis.
        </p>
      </section>

      <section class="content-section content-section--contact" id="contato" aria-labelledby="contact-title">
        <div>
          <p class="eyebrow">CONTATO</p>
          <h2 id="contact-title">Fale com a gente.</h2>
          <p>Os canais de contato podem ser incluídos nesta seção.</p>
        </div>
        <a class="button button--secondary" href="/details" data-link>Sobre o Leno App</a>
      </section>
    </div>
  `
}
