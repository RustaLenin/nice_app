import { init } from './bootstrap.js';
import { removeLoader } from './ui/loader/loader.js';
import { _t } from "./languages/locale.js";

class NiceApp extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        let app_name = this.getAttribute('name');
        if ( typeof window[app_name] !== 'undefined' ) {
            throw 'App name cannot be same as reserved global window property';
        } else {
            window[app_name] = this;
        }
        this.addEventListener( 'app_ready', () => {
            removeLoader( this );
            this.addEventListener('locale_updated', () => {
                console.log( _t('App locale set to:') + this.language.current_locale );
            });
        });

        init( this );
    }

    disconnectedCallback() {

    }

}

customElements.define('nice-app', NiceApp );