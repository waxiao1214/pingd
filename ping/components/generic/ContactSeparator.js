import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import PropTypes from 'prop-types';

import Theme from '../Theme';


const ContactSeparator = (props) => (
    <View style={styles.separator}>
        <View style={styles.separatorLine}/>
        <View style={styles.separatorTextWrapper}>
            <Text style={styles.separatorText}>
                {props.letter}
            </Text>
        </View>
    </View>
);

ContactSeparator.propTypes = {
    letter: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    separator: {
        height: 24,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    separatorTextWrapper: {
        position: 'absolute',
        left: 20,
        width: 22,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Theme.White,
    },
    separatorText: {
        fontSize: 18,
        fontWeight: '600',
        color: Theme.DarkBlue,
        textTransform: 'uppercase',
    },
    separatorLine: {
        borderBottomColor: `${Theme.DarkBlue}50`,
        borderBottomWidth: 1,
    },
});

export default ContactSeparator;
