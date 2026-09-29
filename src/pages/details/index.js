// src/pages/details/index.js
import "../home/pages.css"

export function DetailsPage() {
  return `
    <div class="page details-page">
      <section class="hero hero--compact" aria-labelledby="details-title">
        <p class="eyebrow">LENO APP</p>
        <h1 id="details-title">Detalhes do aplicativo</h1>
        <p class="hero__text">
          Esta página reúne as informações completas do produto e fica separada
          da Home por uma rota própria.
        </p>
        <div class="hero__actions">
          <a class="button button--primary" href="/#features" data-link>Ver recursos</a>
          <a class="button button--secondary" href="/" data-link>Voltar à Home</a>
        </div>
      </section>

      <section class="content-section" aria-labelledby="details-overview">
        <p class="eyebrow">VISÃO GERAL</p>
        <h2 id="details-overview">Um espaço para apresentar o produto.</h2>
        <p>
          Aqui poderão entrar a descrição final, os recursos, os requisitos e
          outras informações que você decidir publicar sobre o aplicativo.
        </p>
      </section>

      <section class="content-section content-section--muted" aria-labelledby="details-next">
        <p class="eyebrow">PRÓXIMOS PASSOS</p>
        <h2 id="details-next">Conteúdo pronto para evoluir.</h2>
        <p>
          As informações desta página podem ser ajustadas junto com as telas e
          funcionalidades reais do projeto.
        </p>
        <a class="text-link" href="/#contato" data-link>Ir para contato →</a>
      </section>
    </div>
  `
}
