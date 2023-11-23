class JGPassword extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  addEvents() {
    let self = this;
    this.shadowRoot.querySelector('.continue').addEventListener('click', function () {
      let passwd = self.shadowRoot.querySelector('input');
      if (passwd.value == 'Seattle') {
        document.querySelector('jg-password').classList.remove('hide');
      } else {
        let label = self.shadowRoot.querySelector('label')
        label.classList.add('error');
        label.innerHTML = 'Incorrect password. Please try again.';
        setTimeout(function () {
          label.classList.remove('error');
          label.innerHTML = 'Please enter password to view this case study.';
        }, 5000);
      }      
    });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
    <style>
    @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.1/font/bootstrap-icons.css");

    :host(.hide) .scrim {
      display: flex;
    }

    .button-group {
      display: flex;
      gap: 20px;
      width: 100%;
      justify-content: flex-end;
    }

    a.button,
    button {
      font-family: "Sarabun", sans-serif;
      color: white;
      background: var(--blue);
      padding: 8px 25px 10px 25px;
      margin: 0;
      border: none;
      font-size: 18px;
      border-radius: 40px;
      cursor: pointer;
      display: inline-block;
    }

    a.button.outline {
      font-family: "Sarabun", sans-serif;
      color: var(--blue);
      background: white;
      padding: 8px 25px 10px 25px;
      margin: 0;
      border: 1px solid var(--blue);
      font-size: 18px;
      border-radius: 40px;
      cursor: pointer;
      display: inline-block;
      text-decoration: none;
    }

    .scrim {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
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

    .dialog {
      width: 480px;
      background-color: white;
      border-radius: 10px;
      display: flex;
      gap: 30px;
      flex-direction: column;
      padding: 40px;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
    }

    .error {
      color: red;
    }

    input {
      font-family: "Sarabun", sans-serif;
      font-size: 18px;
      border: 1px solid var(--hairline-strong);
      border-radius: 5px;
      padding: 10px;
      font-size: 1.2rem;
      width: calc(100% - 20px);
    }

    label {
      font-size: 1.2rem;
      width: 100%;
      text-align: left;
    }

    video, img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    </style>
    <div class="scrim">
      <div class="content">
        <div class="dialog">
          <label>Please enter password to view this case study.</label>
          <input type="password"></input>
          <div class="button-group">
            <a href="index.html" class="button outline">Cancel</a>
            <button class="continue">Continue</button>
          </div>
        </div>
      </div>
    </div>
  `;
  this.addEvents();
  }
}

customElements.define('jg-password', JGPassword);
