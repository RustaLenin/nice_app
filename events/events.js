import { _t } from '../languages/locale.js';
export const events = {};

events.app_ready = new Event('app_ready');

/**
 * Function user to add new Events to the list of app supported Events
 * @param key {string} - event name
 * @param event {event} - JS Event object
 **/
export function addEventToList( key, event ) {
    if ( events[key] ) {
        throw _t('Event with such name all ready exist');
    } else {
        events[key] = event;
    }
}