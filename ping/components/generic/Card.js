import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

import Theme from '../Theme';


const Card = (props) => {
    let cardStyles = [styles.container];
    if (props.style)
        cardStyles.push(props.style);

    return (
        <View style={cardStyles}>
            {props.children}
        </View>
    );
};

Card.propTypes = {
    style: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]),
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]),
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Theme.LightBlue,
        shadowColor: Theme.DarkBlue,
        shadowOpacity: 0.3,
        shadowOffset: {width: 0, height: 3},
        shadowRadius: 6,
    },
});

export default Card;