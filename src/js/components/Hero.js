class Hero extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
        <div class="hero">
            <picture class="hero__image">
                <img src="https://picsum.photos/1280/600" alt="random image" />
            </picture>
            <picture class="hero__blur" alt="random immage blurred">
                <img src="https://picsum.photos/1280/600" alt="random image blurred" />
            </picture>
            <div class="hero__content">
                <div class="hero__box">
                    <div class="hero__title">
                        <h1>
                            Frequently asked questions
                        </h1>
                        <p>
                            Welcome to our Frequently Asked Questions (FAQ) section. Whether you're a new customer or a returning visitor, this page is designed to provide you with quick and informative answers to common queries.
                        </p>
                    </div>
                </div>
		    </div>
        </div>
      `;
    }
  }
  
  customElements.define("hero-component", Hero);
  
  export default Hero;
  