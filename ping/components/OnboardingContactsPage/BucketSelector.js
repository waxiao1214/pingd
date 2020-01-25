import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import PropTypes from 'prop-types';

import Theme from '../Theme';
import {Types} from '../ContactUtils';


const Selector = (props) => {
    let text = '';
    let bgColor = '';

    if (props.friend) {
        bgColor = props.selected ? Theme.Green : Theme.FadedGreen;
        text = 'Friend';
    } else if (props.acquaintance) {
        bgColor = props.selected ? Theme.Blue : Theme.FadedBlue;
        text = 'Acquaintance';
    } else if (props.touchpoint) {
        bgColor = props.selected ? Theme.Purple : Theme.FadedPurple;
        text = 'Touchpoint';
    }

    return (
        <TouchableOpacity style={{flex: 1}} onPress={props.setPriority}>
            <View style={[styles.selector, {backgroundColor: bgColor}]}>
                <Text style={styles.selectorText}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
};

Selector.propTypes = {
    selected: PropTypes.bool.isRequired,
    friend: PropTypes.bool,
    acquaintance: PropTypes.bool,
    touchpoint: PropTypes.bool,
    setPriority: PropTypes.func.isRequired,
};


class BucketSelector extends Component {
    constructor(props) {
        super(props);
        this.select = this.select.bind(this);
    }

    select(priority) {
        this.setState({selected: priority});
        this.props.setPriority(priority);
        this.props.expand();
    }

    render() {
        let priority = this.props.priority;
        return (
            <View style={styles.container}>
                <Selector friend
                    selected={priority < 0 || priority === Types.Friend}
                    setPriority={() => this.select(Types.Friend)}
                />
                <Selector acquaintance
                    selected={priority < 0 || priority === Types.Acquaintance}
                    setPriority={() => this.select(Types.Acquaintance)}
                />
                <Selector touchpoint
                    selected={priority < 0 || priority === Types.Touchpoint}
                    setPriority={() => this.select(Types.Touchpoint)}
                />
            </View>
        );
    }
}

BucketSelector.propTypes = {
    priority: PropTypes.number.isRequired,
    expand: PropTypes.func.isRequired,
    setPriority: PropTypes.func.isRequired,
    style: PropTypes.array,
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selector: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    selectorText: {
        fontSize: 12,
        color: Theme.White,
        margin: 10,
    },
});

export default BucketSelector;