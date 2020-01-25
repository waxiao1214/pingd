import React from 'react';
import PropTypes from 'prop-types';

import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import Card from '../generic/Card';
import Theme from '../Theme';
import {
    getColorFaded,
    getColorImage,
    getText,
} from '../ContactUtils';


const CloseButton = (props) => (
    <TouchableOpacity style={styles.closeButtonWrapper} onPress={props.close}>
        <Image
            style={styles.closeButton}
            source={require('../../assets/close.png')}
        />
    </TouchableOpacity>
);

CloseButton.propTypes = {
    close: PropTypes.func.isRequired,
};


const ContactViewTop = (props) => {
    let highlightStyle = {
        backgroundColor: getColorImage(props.priority),
    };

    let relationshipStyle = {
        backgroundColor: getColorFaded(props.priority),
    };

    let contactImg = {uri: props.image};
    if (!props.image)
        contactImg = require('../../assets/contact.png');

    return (
        <View style={styles.topContainer}>
            <View style={styles.topMain}>
                <CloseButton close={props.reset}/>
                <Image
                    style={styles.image}
                    source={contactImg}
                />
                <View style={styles.textWrapper}>
                    <Text style={styles.name}>{props.name}</Text>
                    <TouchableOpacity onPress={props.picker}>
                        <Card style={[styles.relationship, relationshipStyle]}>
                            <Text style={styles.relationshipText}>
                                {getText(props.priority)}
                            </Text>
                        </Card>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[styles.topHighlight, highlightStyle]}/>
        </View>
    );
};

ContactViewTop.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    picker: PropTypes.func.isRequired,
    priority: PropTypes.number.isRequired,
    reset: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    closeButtonWrapper: {
        position: 'absolute',
        top: 30,
        right: 10,
    },
    closeButton: {
        position: 'relative',
        resizeMode: 'contain',
        width: 20,
        height: 20,
        borderRadius: 10,
    },
    topContainer: {
        shadowColor: Theme.DarkBlue,
        shadowOpacity: 0.2,
        shadowOffset: {width: 0, height: 3},
        shadowRadius: 6,
    },
    topMain: {
        height: 150,
        backgroundColor: Theme.Blue,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 30,
    },
    topHighlight: {
        height: 4,
    },
    image: {
        resizeMode: 'contain',
        marginLeft: 16,
        width: 92,
        height: 92,
        borderRadius: 46,
        borderWidth: 4,
        borderColor: Theme.White,
        backgroundColor: Theme.FadedBlueContact,
    },
    textWrapper: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 16,
    },
    nameWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    name: {
        fontSize: 26,
        fontWeight: '600',
        color: Theme.White,
    },
    relationship: {
        marginTop: 8,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 3,
    },
    relationshipText: {
        fontSize: 20,
        fontWeight: '500',
        opacity: 0.9,
    },
});

export default ContactViewTop;
