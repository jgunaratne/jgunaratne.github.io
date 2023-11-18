class JGLightBox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  addEvents() {
    this.shadowRoot.querySelector('.scrim').addEventListener('click', function () {
      toggleLightbox();
    });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
      @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.1/font/bootstrap-icons.css");

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
        width: calc(100% - 150px);
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
        position: fixed;
        left: 20px;
        top: 20px;
        font-size: 2rem;
        z-index: 101;
      }
      </style>
      <div class="scrim">
        <i class="bi bi-x-circle close"></i>
        <div class="content">
        </div>
      </div>
      
    `;
    this.addEvents();
  }

  set thumbnail(thumbnail) {
    let content = this.shadowRoot.querySelector('.content');
    content.innerHTML = '';
    content.appendChild(thumbnail.cloneNode(true));
  }

  get thumbnail() {
    return this.getAttribute('thumbnail');
  }

}

customElements.define('jg-lightbox', JGLightBox);
