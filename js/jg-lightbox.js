class JGLightBox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._onKeyDown = this._onKeyDown.bind(this);
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
      :host(.open) .scrim {
        display: flex;
      }

      .scrim {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        background-color: rgba(0, 0, 0, 0.8);
        z-index: 100;
        display: none;
        align-items: center;
        justify-content: center;
      }

      .content {
        display: flex;
        align-items: center;
        justify-content: center;
        width: calc(100% - 50px);
        height: calc(100% - 150px);
        overflow: hidden;
      }

      video, img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }

      .close {
        color: white;
        background: none;
        border: none;
        padding: 10px;
        position: fixed;
        left: 20px;
        top: 20px;
        font-size: 2rem;
        line-height: 1;
        cursor: pointer;
        z-index: 101;
      }

      .close:focus-visible {
        outline: 2px solid white;
        outline-offset: 2px;
        border-radius: 4px;
      }
      </style>
      <div class="scrim">
        <button class="close" type="button" aria-label="Close">&times;</button>
        <div class="content"></div>
      </div>
    `;
    this.shadowRoot.querySelector('.scrim').addEventListener('click', () => this.close());
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this._onKeyDown);
  }

  _onKeyDown(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  /**
   * Show an enlarged copy of the <video> or <img> inside `source`.
   * The clone is forced to play even where the original is paused,
   * which is the case on small screens and with reduced motion.
   */
  open(source) {
    const media = source.querySelector('video, img');
    if (!media) return;

    const content = this.shadowRoot.querySelector('.content');
    const clone = media.cloneNode(true);
    content.replaceChildren(clone);

    if (clone.tagName === 'VIDEO') {
      clone.muted = true;
      clone.loop = true;
      clone.playsInline = true;
      clone.setAttribute('playsinline', '');
      clone.preload = 'auto';
      clone.play().catch(() => {});
    }

    this.classList.add('open');
    document.addEventListener('keydown', this._onKeyDown);
    this.shadowRoot.querySelector('.close').focus();
  }

  close() {
    this.classList.remove('open');
    document.removeEventListener('keydown', this._onKeyDown);
    this.shadowRoot.querySelector('.content').replaceChildren();
  }
}

customElements.define('jg-lightbox', JGLightBox);

// Anything matching this opens the lightbox, on the home page and the case
// pages alike. Delegation keeps the wiring in one place instead of per page.
const LIGHTBOX_TRIGGERS = '.thumbnail, .figure, jg-mobile, jg-desktop';

document.addEventListener('DOMContentLoaded', function () {
  let lightbox = document.querySelector('jg-lightbox');
  if (!lightbox) {
    lightbox = document.createElement('jg-lightbox');
    document.body.prepend(lightbox);
  }

  document.addEventListener('click', function (event) {
    const trigger = event.target.closest(LIGHTBOX_TRIGGERS);
    if (trigger) {
      lightbox.open(trigger);
    }
  });
});
