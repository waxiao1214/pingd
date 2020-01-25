export const SET_CONTACT_PRIORITY = 'SET_CONTACT_PRIORITY';

export default function setContactPriority(contactID, priority) {
    return {
        type: SET_CONTACT_PRIORITY,
        payload: {
            contactID,
            priority,
        },
    };
}
