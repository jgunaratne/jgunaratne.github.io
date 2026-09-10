// The copyright year had drifted out of sync across pages because it was
// hardcoded six times. Rendering a real <footer> in the light DOM keeps the
// landmark semantics and lets the site stylesheet reach it as before.
class JGFooter extends HTMLElement {
  connectedCallback() {
    const footer = document.createElement('footer');
    footer.textContent = `© ${new Date().getFullYear()} · Junius Gunaratne`;
    this.replaceChildren(footer);
  }
}

customElements.define('jg-footer', JGFooter);
