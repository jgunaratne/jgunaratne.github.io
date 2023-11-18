class JGMobile extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        .mobile {
          width: 520px;
          height: 1040px;
          position: relative;
        }

        .mobile-content {
          position: absolute;
          top: 55px;
          left: 58px;
          border-radius: 50px;
          background-color: white;
        }
        
        :host(.no-frame) .mobile-content {
          border-radius: 50px;
          border: 1px solid var(--hairline);
          padding: 80px 20px;
          background-color: rgb(35, 33, 35);
        }
        
        .mobile-frame {
          position: absolute;
          width: 520px;
          height: 1040px;
          background-image: url(../img/iphone.png);
          background-size: contain;
          background-repeat: no-repeat;
          top: 0;
          left: 0;
        }

        :host(.no-frame) .mobile-frame {
          display: none;
        }
      </style>
      <div class="mobile">
        <div class="mobile-content">
          <slot name="content"></slot>
        </div>
        <div class="mobile-frame"></div>
      </div>
  `;
  }
}

customElements.define('jg-mobile', JGMobile);
