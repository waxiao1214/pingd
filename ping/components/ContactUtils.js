/*
 * ContactUtils.js
 * defines constants & utility functions for relationship types
 */

import Theme from './Theme';

const Types = {
    Remove: -1,
    Friend: 0,
    Acquaintance: 1,
    Touchpoint: 2,
};

const ContactFreqs = {
    0: 30, // days (1 month)
    1: 90, // days (1 quarter)
    2: 365, // days (1 year)
};

const SnoozeFreqs = {
    0: 5, // days (5 days)
    1: 10, // days (10 days)
    2: 15, // days (15 days)
};

const ContactMethods = [
    'contact',
    'call',
    'text',
    'email',
    'Facebook message',
];

function getColor(type) {
    if (type === Types.Friend) return Theme.Green;
    else if (type === Types.Acquaintance) return Theme.Blue;
    else if (type === Types.Touchpoint) return Theme.Purple;
}

function getColorFaded(type) {
    if (type === Types.Friend) return Theme.FadedGreen;
    else if (type === Types.Acquaintance) return Theme.FadedBlue;
    else if (type === Types.Touchpoint) return Theme.FadedPurple;
}

function getColorImage(type) {
    if (type === Types.Friend) return Theme.Green;
    else if (type === Types.Acquaintance) return Theme.DarkBlue;
    else if (type === Types.Touchpoint) return Theme.Purple;
}

function getText(type) {
    if (type === Types.Friend) return 'Friend';
    else if (type === Types.Acquaintance) return 'Acquaintance';
    else if (type === Types.Touchpoint) return 'Touchpoint';
}

export {
    Types,
    ContactFreqs,
    SnoozeFreqs,
    ContactMethods,
    getColor,
    getColorFaded,
    getColorImage,
    getText,
};
