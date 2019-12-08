import { _t } from '../languages/locale.js';

export const actions = {};

/**
 * Function user to add new Events to the list of app supported Events
 * @param key { string } - Action name
 * @param action {function } - JS function link
 **/
export function addActionToList( key, action ) {
    if ( actions[key] ) {
        throw _t('Such action all ready exist');
    } else {
        actions[key] = action;
    }
}