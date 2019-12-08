import { updateCssVars } from './ui/css_vars/vars.js';
import { addAndRunLoader } from './ui/loader/loader.js';
import { events } from './events/events.js';
import { initLocale } from './languages/locale.js';
import { actions } from './actions/actions.js';


export function init( app ) {
    loadCSS();
    updateCssVars( app );
    addAndRunLoader( app );
    app.actions = actions;
    app.events = events;
    app.router = {};
    app.services = {};
    app.state = {};
    initLocale( app );
    app.dispatchEvent( events.app_ready );
}

function loadCSS() {
    let cssUrl = `${new URL('./', import.meta.url).href}app.css`; // getting url of app.css file based on this file url
    document.querySelector('head').insertAdjacentHTML('beforeend', `<link href="${cssUrl}" rel="stylesheet"></link>` ); //Insert css in document, so he will start loading
}

