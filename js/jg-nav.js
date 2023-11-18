class JGNav extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.1/font/bootstrap-icons.css");

        :host(.open) .nav {
          left: 0;
        }

        a {
          color: black;
          text-decoration: none;
        }
        
        h3 {
          margin: 0 0 10px 0;
          font-size: 1.8rem;
          font-weight: 200;
          color: var(--blue);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        h4 {
          font-size: 1.2rem;
          margin: 0;
        }

        h5 {
          font-size: 1.2rem;
          font-weight: 200;
          margin: 0;
        }

        .nav {
          border-right: 1px solid var(--light-purple);
          position: fixed;
          width: 240px;
          left: -240px;
          height: 100%;
          overflow: auto;
          background: rgba(255, 255, 255, 0.95);
          z-index: 1;
          transition: all 0.2s ease-in-out;
          display: flex;
          flex-direction: column;
        }
        
        .nav ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        
        .nav li {
          padding: 0;
          padding: 20px 0;
          margin: 20px 30px;
          border-bottom: 1px solid var(--hairline);
        }

        i.bi {
          font-size: 1.4rem;
          position: relative;
          top: 1px;
          color: var(--light-blue);
        }

        i.bi.menu-control {
          font-size: 32px;
          color: black;
          margin: 24px 24px 0 24px ;
          display: block;
          cursor: pointer;
        }
      </style>
      <div class="nav">
        <i class="bi bi-list menu-control"></i>
        <ul>
          <li>
            <h5>Featured Projects</h5>
          </li>
          <li>
            <h3><span>01</span> <i class="bi bi-google"></i></h3>
            <h4><a href="#bard">Google I/O Bard Preview</a></h4>
          </li>
          <li>
            <h3><span>02</span>  <i class="bi bi-reddit"></i></h3>
            <h4><a href="#reddit">Reddit Home and Post Details</a></h4>
          </li>
          <li>
            <h3><span>03</span>  <i class="bi bi-google"></i></h3>
            <h4><a href="#ads-ml">Google Ads + ML</a></h4>
          </li>
          <li>
            <h3><span>04</span>  <i class="bi bi-google"></i></h3>
            <h4><a href="#material">Material Design</a></h4>
          </li>
        </ul>
      </div>
  `;
  }
}

customElements.define('jg-nav', JGNav);