import LocalRepository from "../../repository/LocalRepository.js";
import Component from "../core/Component.js";

const localRepository = new LocalRepository();
export default class UnauthorizedCard extends Component {
    constructor(options = {}) {
        super();
        this.authorized = localRepository.getFromLocalStorage('authorized');
        this.token = localRepository.getFromLocalStorage('token');
        this.options = {
            text: "Debes iniciar sesión para realizar esta acción",
            redirectDelay: 3000, // ms
            ...options
        };
        this._boundHandleClick = this.handleClick.bind(this);
        this._boundOnKey = this._onKeyDown.bind(this);
        this._redirectTimeout = null;
        this._countdownInterval = null;
    }

    render() {
        const seconds = Math.ceil(this.options.redirectDelay / 1000);
        return `
        <div class="overlay" id="unauthorized-overlay" role="dialog" aria-modal="true">
            <div class="pet-detail-card p-4">
                <h3 class="card-title">Acceso Denegado</h3>
                <p>${this.options.text}</p>
                <p>Serás redirigido al login en <span id="unauth-countdown">${seconds}</span> segundos.</p>
                <div class="flex gap-2">
                  <button class="btn btn-primary" data-action="login">Ir ahora a Iniciar Sesión</button>
                  <button class="btn" data-action="close">Cerrar</button>
                </div>
            </div>
        </div>
        `;
    }

    onMount() {
        if (!this.element) return;
        this.element.addEventListener('click', this._boundHandleClick);
        document.addEventListener('keydown', this._boundOnKey);
        if (!this.authorized && !this.token) {
            this._startRedirectCountdown();
        }
    }

    onUnmount() {
        if (this.element) {
            this.element.removeEventListener('click', this._boundHandleClick);
        }
        document.removeEventListener('keydown', this._boundOnKey);
        this._clearTimers();
    }

    close() {
        this.unmount();
    }

    handleClick(e) {
        const btn = e.target.closest('[data-action]');
        if (!btn) return;
        const action = btn.dataset.action;
        if (action === 'login') {
            this._clearTimers();
            window.location.href = '/login';
            return;
        }
        if (action === 'close') {
            this.close();
            return;
        }
    }

    _onKeyDown(e) {
        if (e.key === 'Escape') {
            this.close();
        }
    }

    _startRedirectCountdown() {
        const delay = Number(this.options.redirectDelay) || 3000;
        let remaining = Math.ceil(delay / 1000);
        const countdownEl = this.element.querySelector('#unauth-countdown');
        if (countdownEl) countdownEl.textContent = String(remaining);
        this._countdownInterval = setInterval(() => {
            remaining -= 1;
            if (countdownEl) countdownEl.textContent = String(Math.max(0, remaining));
        }, 1000);
        this._redirectTimeout = setTimeout(() => {
            this._clearTimers();
            window.location.href = '/login';
        }, delay);
    }

    _clearTimers() {
        if (this._redirectTimeout) {
            clearTimeout(this._redirectTimeout);
            this._redirectTimeout = null;
        }
        if (this._countdownInterval) {
            clearInterval(this._countdownInterval);
            this._countdownInterval = null;
        }
    }
}