class JGMobile extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>       
        @media only screen and (min-width: 1024px) {
          .mobile {
            width: 520px;
            height: 1040px;
            position: relative;
            cursor: zoom-in;
          }

          /* The frame image paints over the content, but its screen aperture
             is transparent, so square media corners show through it. Clip
             them to the aperture: 56px is the largest circular radius that
             stays inside the frame's squircle corners, so no page background
             leaks through and the trimmed corner hides under the bezel. */
          .mobile-content {
            position: absolute;
            top: 54px;
            left: 58px;
            overflow: hidden;
            border-radius: 56px;
          }

          /* Slotted media is inline, and the line box's descender space would
             leave the wrapper 4px taller than the media, dropping the rounded
             corners below the screen. */
          ::slotted(*) {
            display: block;
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
            background-image: url(/img/iphone.png);
            background-size: contain;
            background-repeat: no-repeat;
            top: 0;
            left: 0;
          }

          :host(.no-frame) .mobile-frame {
            display: none;
          }
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
