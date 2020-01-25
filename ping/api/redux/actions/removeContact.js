export const REMOVE_CONTACT = 'REMOVE_CONTACT';

export default function removeContact(contactID) {
    return {
        type: REMOVE_CONTACT,
        payload: {
            contactID,
        },
    };
}