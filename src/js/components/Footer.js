class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <footer>
            <section class="footer">
            <div class="footer-wrapper">
                <h2>Could your question not be answered yet? </br>Contact our customer support directly.</h2>
                <div class="contact-form">
                <form action="">
                    <div class="contact-inputs">
                        <div class="contact-info">
                            <label for="name">Name</label>
                            <input type="text" name="name" />
                            <label for="email">Email</label>
                            <input type="email" name="email" />
                        </div>
                        <div class="contact-message">
                            <label for="message">Your Message</label>
                            <textarea
                            name="message"
                            id="message"
                            ></textarea>
                        </div>
                    </div>
                    <div class="contact-submit">
                        <input type="checkbox" name="consent" id="consent" value="consent">
                        <label for="consent">I hereby consent to the processing of my data in accordance with the <a href="#">privacy information</a>. </label>
                        <button class="button">
                            Send
                        </button>
                    </div>
                </form>
                </div>
            </section>
            <section class="bottombar">
                <div class="bottombar-wrapper">
                <div class="links">
                    <ul>
                    <li><a href="#">Legal Notice</a></li>
                    <li><a href="#">Privacy</a></li>
                    </ul>
                </div>
                <div class="copyright">
                    <p>© 2024 Chi Thanh Pham for <a href="#">Kaufland Global Marketplace</a></p>
                </div>
                </div>
            </div>
            </section>
        </footer>
    `;
  }
}

customElements.define("footer-component", Footer);

export default Footer;
