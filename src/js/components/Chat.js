class Chat extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <div class="chat">
            <div class="chat-teaser">
                <svg class="chat-icon" style="width: 2rem; height: 2rem;vertical-align: middle;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <path d="M919.192216 976.840649a42.620541 42.620541 0 0 1-21.919135-6.088649l-185.094919-110.675027A560.95827 560.95827 0 0 1 512 896.249081c-274.681081 0-498.162162-192.982486-498.162162-430.190703C13.837838 228.850162 237.318919 35.867676 512 35.867676S1010.162162 228.850162 1010.162162 466.058378c0 104.64173-42.952649 203.637622-121.66227 281.821406l70.379243 168.683243c7.195676 17.269622 2.601514 37.251459-11.374703 49.567135-8.025946 7.084973-18.127568 10.710486-28.312216 10.710487z m-203.277838-208.45319c7.610811 0 15.193946 2.048 21.919136 6.088649l91.108324 54.438054-31.494919-75.443892a43.699892 43.699892 0 0 1 11.623784-49.816216c74.170811-64.345946 115.020108-148.729081 115.020108-237.595676C924.090811 276.756757 739.217297 122.713946 512 122.713946S99.909189 276.756757 99.909189 466.058378c0 189.301622 184.873514 343.344432 412.090811 343.344433 65.785081 0 128.719568-12.647784 187.142919-37.583568 5.369081-2.297081 11.07027-3.431784 16.771459-3.431784zM260.953946 470.154378a56.32 56.32 0 0 1 56.347676-56.015567 56.347676 56.347676 0 0 1 55.794162 56.596757c0 31.135135-24.908108 56.430703-55.794162 56.569081A56.32 56.32 0 0 1 260.981622 471.316757v-1.134703z m186.478703 0c0 31.965405 25.710703 57.897514 57.399351 57.897514a57.648432 57.648432 0 0 0 57.371676-57.897514 57.648432 57.648432 0 0 0-57.371676-57.897513 57.648432 57.648432 0 0 0-57.399351 57.897513z m186.506378 0a56.32 56.32 0 0 1 56.347676-56.015567 56.347676 56.347676 0 0 1 55.794162 56.596757c0 31.135135-24.908108 56.430703-55.794162 56.569081a56.32 56.32 0 0 1-56.347676-56.015568v-1.134703z" />
                </svg>
            </div>
            <div class="chat-window">
                <iframe allow="fullscreen; geolocation; clipboard-read; clipboard-write" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" frameborder="0" src="https://newlook.hellotars.com/conv/Nju2fJ/?_nav&amp;amp;_end_redirect=0" style="border: 0; width: 100%; height: 100%"></iframe>
                <div class="chat-window-close">
                    X
                </div>
            </div>
        </div>
      `;

    // Add a click event listener to the chat teaser
    const chatTeaser = this.querySelector(".chat-teaser");
    const chatCloseButton = this.querySelector('.chat-window-close');
    chatTeaser.addEventListener("click", () => {
      this.toggleChatWindow();
    });
    chatCloseButton.addEventListener("click", () => {
      this.toggleChatWindow();
    });
  }

  toggleChatWindow() {
    // Toggle the .active class and update the chat state
    this.isChatActive = !this.isChatActive;
    const chatElement = this.querySelector(".chat");
    chatElement.classList.toggle("active", this.isChatActive);
  }
}

customElements.define("chat-component", Chat);

export default Chat;
