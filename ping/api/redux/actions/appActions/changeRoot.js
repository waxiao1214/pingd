export const ROOT_CHANGED = 'ROOT_CHANGED';

/**
 * @typedef {Object} ChangeAppRootAction
 * @param {string} root - Indicates what stage the app should transition to.
 * @return {changeAppRootAction}
 */
export function changeAppRoot(root) {
  return {
    type: ROOT_CHANGED,
    root,
  };
}

/*
 * App has been started for the first time, and the onboarding
 * screens should appear.
 */
export function appInitialized() {
    return async function(dispatch) {
        /*
         * App initialization code here
         */
        dispatch(changeAppRoot('login'));
    };
}

/*
 * Transition from onboarding to importing contacts.
 */
export function login() {
    return async function(dispatch) {
        /*
         * Any login logic will go here
         */
        dispatch(changeAppRoot('importing'));
    };
}

/*
 * Adding New Contacts
 */
export function addNew() {
    return async function(dispatch) {
        /*
         * Any login logic will go here
         */
        dispatch(changeAppRoot('addNew'));
    };
}

/*
 * Indicates that the user was done importing contacts and
 * the main app should now be displayed.
 */
export function contactsDoneImporting() {
    return async function(dispatch) {
        dispatch(changeAppRoot('app'));
    };
}
