import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import PropTypes from 'prop-types';

import Theme from '../Theme';


class ContactOption extends React.Component {
    constructor(props) {
        super(props);
        this.state = {expanded: false};
        this._toggleExpand = this._toggleExpand.bind(this);
    }

    _toggleExpand() {
        this.setState({expanded: !this.state.expanded});
    }

    render() {
        return (
            <View style={styles.outer}>
                <TouchableOpacity
                    style={styles.optionContainer}
                    onPress={this._toggleExpand}
                >
                    <View style={styles.textContainer}>
                        <Text style={styles.optionText}>
                            {this.props.option}
                        </Text>
                        <Text style={styles.selectedText}>
                            {this.props.selected}
                        </Text>
                    </View>
                    <Image
                        style={styles.chevron}
                        source={require('../../assets/chevron-right.png')}
                    />
                </TouchableOpacity>
                {this.state.expanded ? this.props.picker() : null}
                {this.props.last ? null : <View style={styles.border}/>}
            </View>
        );
    }
}

ContactOption.propTypes = {
    last: PropTypes.bool,
    option: PropTypes.string.isRequired,
    picker: PropTypes.func.isRequired,
    selected: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    outer: {
        width: '100%',
    },
    optionContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textContainer: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
    },
    optionText: {
        fontSize: 20,
        fontWeight: '500',
    },
    selectedText: {
        fontSize: 18,
        color: Theme.DarkGray,
    },
    chevron: {
        height: 20,
        width: 20,
        marginRight: 20,
    },
    border: {
        width: '90%',
        left: '5%',
        borderBottomWidth: 1,
        borderBottomColor: Theme.Gray,
    },
});

export default ContactOption;