class Hero extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
        <div class="hero">
            <picture class="hero__image">
                <img src="https://picsum.photos/1280/400" alt="random image" />
            </picture>
            <picture class="hero__blur" alt="random immage blurred">
                <img src="https://picsum.photos/1280/400" alt="random image blurred" />
            </picture>
            <div class="hero__content">
                <div class="hero__box">
                    <div class="hero__title">
                        <h1>
                            Frequently asked questions
                        </h1>
                        <p>
                        Welcome to our FAQ section! Here, you'll find answers to common questions, a search filter for quick information, and a chatbot for additional support. If you still have questions, our contact form is always available for personalized assistance. Happy exploring!
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
  