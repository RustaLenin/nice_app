import { en } from './en.js';
import { addEventToList } from '../events/events.js';
import { addActionToList } from '../actions/actions.js';

let default_locale = 'en';
let supported_locales = {
    en: true,
    ru: true
};
let App;
let app_language;
let current_locale;

export function initLocale( app ) {
    App = app;
    App.language = {
        'default_locale': default_locale,
        supported_locales: supported_locales,
        'en': en,
    };
    app_language = App.language;

    let locale;

    if ( getLocalStorageLocale() ) {
        locale = getLocalStorageLocale();
    } else {
        locale = getBrowserLocale();
    }

    addEventToList( 'locale_updated', new Event('locale_updated') );
    addActionToList( 'updateLocale', updateLocale );

    if ( supported_locales[locale] ) {
        updateLocale( locale );
    } else {
        updateLocale( default_locale );
    }

}

export function updateLocale( locale ) {
    app_language.current_locale = locale;
    current_locale = locale;

    if ( locale !== getLocalStorageLocale() ){
        localStorage.setItem('app_language', locale );
    }

    if ( !app_language[locale] ) {
        dynamicImportLocale( locale );
    } else {
        App.dispatchEvent( App.events['locale_updated'] );
    }
    return app_language;
}

export function dynamicImportLocale( locale ) {
    let locale_url = `./${locale}.js`;
    import( locale_url ).then(( new_locale ) => {
        app_language[locale] = new_locale[locale];
        App.dispatchEvent( App.events['locale_updated'] );
    });
}

function getBrowserLocale() {
    return navigator.language.substr(0,2);
}

function getLocalStorageLocale() {
    return localStorage.getItem('app_language');
}

export function _t( key ) {
    if ( app_language[current_locale][key] ) {
        return app_language[current_locale][key];
    } else if ( app_language.en[key] ) {
        return app_language.en[key];
    } else {
        return key;
    }
}