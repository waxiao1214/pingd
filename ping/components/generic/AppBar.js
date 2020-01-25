import React from 'react';
import {
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import PropTypes from 'prop-types';

import Theme from '../Theme';


const AppBar = (props) => {
    let style = [styles.appBarMain];
    if (props.height)
        style.push({height: props.height});

    return (
        <View style={styles.appBar}>
            <StatusBar barStyle="light-content"/>
            <View style={style}>
                {props.children}
            </View>
            <View style={styles.appBarHighlight}/>
        </View>
    );
};

AppBar.propTypes = {
    height: PropTypes.number,
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]),
};

const styles = StyleSheet.create({
    appBar: {
        zIndex: 10,
        shadowColor: Theme.DarkBlue,
        shadowOpacity: 0.2,
        shadowOffset: {width: 0, height: 3},
        shadowRadius: 6,
    },
    appBarMain: {
        zIndex: 12,
        height: 80,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Theme.Blue,
    },
    appBarHighlight: {
        zIndex: 10,
        height: 4,
        backgroundColor: Theme.DarkBlue,
    },
});

export default AppBar;
