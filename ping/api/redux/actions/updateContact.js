export const UPDATE_CONTACT = 'UPDATE_CONTACT';

export default function updateContact(contact) {
    return {
        type: UPDATE_CONTACT,
        payload: {
            contact,
        },
    };
}
