const _ = require('lodash');

import {ADD_CONTACT} from '../actions/addContact';
import {REMOVE_CONTACT} from '../actions/removeContact';
import {SET_CONTACT_PRIORITY} from '../actions/setContactPriority';
import {UPDATE_CONTACT} from '../actions/updateContact';
import * as notifications from '../actions/PingNotifications'

const initialState = [];

export default function contacts(contactsState = initialState, action) {
    switch (action.type) {
        case ADD_CONTACT: {
            const newState = _.cloneDeep(contactsState);
            const {payload} = action;
            newState.push(payload);
            notifications.add(payload.contact);
            return newState;
        }

        case SET_CONTACT_PRIORITY: {
            const newState = _.cloneDeep(contactsState);
            const {payload} = action;
            const {contactID, priority} = payload;

            for (let i = 0; i < newState.length; i++) {
                if (newState[i].contact._id === contactID)
                    newState[i].contact.priority = priority;
            }

            return newState;
        }

        case REMOVE_CONTACT: {
            const newState = _.cloneDeep(contactsState);
            const {payload} = action;
            const {contactID} = payload;
            console.log('ConactID:', contactID);
            let finalState = [];
            for (let i = 0; i < newState.length; i++) {
                let contact = newState[i].contact;
                if (contact._id !== contactID) {
                    finalState.push(newState[i]);
                    notifications.update(newState[i].contact);
                }
            }
            // console.log('REMOVE:',payload);
            // console.log('REMOVE (action)',action);
            // notifications.remove(payload.contact);
            return finalState;
        }

        case UPDATE_CONTACT: {
            const newState = _.cloneDeep(contactsState);
            const {payload} = action;
            const {contact} = payload;

            for (let i = 0; i < newState.length; i++) {
                let oldContact = newState[i].contact;
                if (contact._id === oldContact._id) {
                    newState[i].contact = contact;
                    notifications.update(newState[i].contact);
                }
            }
            return newState;
        }

        default:
            return contactsState;
    }
}
