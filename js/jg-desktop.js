class JGDesktop extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        .crop {
          overflow: hidden;
          position: absolute;
          top: 118px;
          left: 196px;
          height: 630px;
        }
        
        .desktop {
          position: relative;
          width: 520px;
          height: 1040px;
          left: -120px;
          transition: all 0.5s ease-in-out;
          box-shadow: 0 5px 20px rgba(255, 255, 255, 0.1);
          cursor: zoom-in;
        }
        
        .desktop:has(.desktop-content:hover) {
          left: -520px;
          transition: all 0.5s ease-in-out;
        }
        
        .desktop-frame {
          position: absolute;
          width: 1400px;
          height: 865px;
          background-image: url(../img/macbook.png);
          background-size: contain;
          background-repeat: no-repeat;
          top: 0;
          left: 0;
          overflow: hidden;
        }      
      </style>
      <div class="desktop">
        <div class="crop">
          <slot name="content"></slot>
        </div>
        <div class="desktop-frame"></div>
      </div>
  `;
  }
}

customElements.define('jg-desktop', JGDesktop);
