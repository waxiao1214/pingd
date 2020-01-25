import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import PropTypes from 'prop-types';

import Card from '../generic/Card';
import {Types} from '../ContactUtils';
import Theme from '../Theme';


const PriorityPicker = (props) => (
    <Card style={styles.picker}>
        <Text style={styles.pickerTitle}>Change relationship?</Text>
        <TouchableOpacity
            onPress={() => props.updatePriority(Types.Friend)}
        >
            <View style={[styles.pickerSelect, styles.pickerFriend]}>
                <Text style={styles.pickerText}>Friend</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => props.updatePriority(Types.Acquaintance)}
        >
            <View style={[styles.pickerSelect, styles.pickerAcq]}>
                <Text style={styles.pickerText}>Acquaintance</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => props.updatePriority(Types.Touchpoint)}
        >
            <View style={[styles.pickerSelect, styles.pickerTpoint]}>
                <Text style={styles.pickerText}>Touchpoint</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.updatePriority(Types.Remove)}>
            <View style={[styles.pickerSelect, styles.pickerRemove]}>
                <Text style={styles.pickerText}>Remove</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.toggle}>
            <View style={[styles.pickerSelect, styles.pickerCancel]}>
                <Text style={styles.pickerText}>Cancel</Text>
            </View>
        </TouchableOpacity>
    </Card>
);

PriorityPicker.propTypes = {
    toggle: PropTypes.func.isRequired,
    updatePriority: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 20,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    picker: {
        position: 'absolute',
        zIndex: 21,
        width: '70%',
        top: 200,
        left: '15%',
        borderRadius: 3,
    },
    pickerTitle: {
        fontSize: 20,
        fontWeight: '500',
        width: '100%',
        textAlign: 'center',
        margin: 0,
        paddingTop: 20,
        paddingBottom: 20,
        color: Theme.DarkBlue,
    },
    pickerSelect: {
        width: '100%',
        margin: 0,
        paddingTop: 20,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pickerFriend: {
        backgroundColor: Theme.Green,
    },
    pickerAcq: {
        backgroundColor: Theme.Blue,
    },
    pickerTpoint: {
        backgroundColor: Theme.Purple,
    },
    pickerRemove: {
        backgroundColor: 'black',
    },
    pickerCancel: {
        backgroundColor: '#66666650',
    },
    pickerText: {
        fontSize: 16,
        fontWeight: '500',
        color: Theme.White,
        margin: 0,
    },
});

export default PriorityPicker;
