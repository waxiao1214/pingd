import React, {Component} from 'react';
import {
    Picker,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Card from '../generic/Card';
import {ContactMethods} from '../ContactUtils';
import ContactOption from './ContactOption';
import ContactViewTop from './ContactViewTop';
import PriorityPicker from './PriorityPicker';
import {Types} from '../ContactUtils';
import Theme from '../Theme';

import setContactPriority from '../../api/redux/actions/setContactPriority';
import updateContact from '../../api/redux/actions/updateContact';
import removeContact from '../../api/redux/actions/removeContact';


class ContactView extends Component {
    constructor(props) {
        super(props);

        let [num, unit] = this._getFrequencyParts(this.props.contact.contactFrequency);
        this.state = {
            priorityPicker: false,
            notes: this.props.contact.notes,
            method: this.props.contact.contactMethod,
            freqNum: num,
            freqUnit: unit,
        };

        this._getContactFreqPicker = this._getContactFreqPicker.bind(this);
        this._onContactFreqNumUpdate = this._onContactFreqNumUpdate.bind(this);
        this._onContactFreqUnitUpdate = this._onContactFreqUnitUpdate.bind(this);
        this._getContactMethodPicker = this._getContactMethodPicker.bind(this);
        this._onContactMethodUpdate = this._onContactMethodUpdate.bind(this);
        this._onNotesChange = this._onNotesChange.bind(this);
        this._setContactPriority = this._setContactPriority.bind(this);
        this._togglePriorityPicker = this._togglePriorityPicker.bind(this);
    }

    _togglePriorityPicker() {
        this.setState({priorityPicker: !this.state.priorityPicker});
    }

    _setContactPriority(priority) {
        console.log("New Priority: ",priority);
        if (priority === Types.Remove){
          console.log('remove contact')
          this.props.removeContact(this.props.contact._id);
          this.props.reset();
        }
        else { this.props.setContactPriority(this.props.contact._id, priority); }
        this._togglePriorityPicker();
    }

    _onContactMethodUpdate(newMethod) {
        this.props.contact.contactMethod = newMethod;
        this.props.updateContact(this.props.contact);
        console.log('CONTACT',this.props.contact);
        this.setState({method: newMethod});
    }

    _recalculateFrequency(num, unit) {
        let newFreq;
        if (unit === 'days') newFreq = num;
        else if (unit === 'weeks') newFreq = num * 7;
        else if (unit === 'months') newFreq = num * 30;

        this.props.contact.contactFrequency = newFreq;
        this.props.updateContact(this.props.contact);
    }

    _onContactFreqNumUpdate(newNum) {
        this._recalculateFrequency(newNum, this.state.freqUnit);
        console.log('CONTACT',this.props.contact);
        this.setState({freqNum: newNum});
    }

    _onContactFreqUnitUpdate(newUnit) {
        this._recalculateFrequency(this.state.freqNum, newUnit);
        this.setState({freqUnit: newUnit});
    }

    _onNotesChange(text) {
        this.setState({notes: text});
        this.props.contact.notes = text;
        this.props.updateContact(this.props.contact);
    }

    _getContactMethodPicker() {
        let items = [];
        for (let i = 0; i < ContactMethods.length; i++) {
            let val = ContactMethods[i];
            items.push(<Picker.Item key={i} label={val} value={val}/>);
        }

        return (
            <View>
                <View style={styles.pickerBorder}/>
                <Picker
                    onValueChange={this._onContactMethodUpdate}
                    selectedValue={this.state.method}
                >
                    {items}
                </Picker>
            </View>
        );
    }

    _getFrequencyParts(freq) {
        let freqNum, freqUnit;

        if (freq % 30 === 0) {
            freqUnit = 'months';
            freqNum = freq / 30;
        } else if (freq % 7 === 0) {
            freqUnit = 'weeks';
            freqNum = freq / 7;
        } else {
            freqUnit = 'days';
            freqNum = freq;
        }

        return [freqNum, freqUnit];
    }

    _getContactFreqPicker() {
        let freqNums = [];
        for (let i = 1; i <= 30; i++)
            freqNums.push(<Picker.Item key={i} label={i.toString()} value={i.toString()}/>);

        return (
            <View>
                <View style={styles.pickerBorder}/>
                <View style={styles.pickerContainer}>
                    <Picker
                        onValueChange={this._onContactFreqNumUpdate}
                        style={styles.halfPicker}
                        selectedValue={this.state.freqNum.toString()}
                    >
                        {freqNums}
                    </Picker>
                    <Picker
                        onValueChange={this._onContactFreqUnitUpdate}
                        style={styles.halfPicker}
                        selectedValue={this.state.freqUnit}
                    >
                        <Picker.Item label="days" value="days"/>
                        <Picker.Item label="weeks" value="weeks"/>
                        <Picker.Item label="months" value="months"/>
                    </Picker>
                </View>
            </View>
        );
    }

    _formatPOCDate(date) {
        if (date === 0)
            return 'N/A';

        var date = new Date(date);
        let dateStr = '';

        let months = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
        dateStr += `${months[date.getMonth()]} `;

        let day = date.getDate();
        dateStr += day;
        if (day % 10 === 1 && day !== 11) dateStr += 'st';
        else if (day % 10 === 2 && day !== 12) dateStr += 'nd';
        else if (day % 10 === 3 && day !== 13) dateStr += 'rd';
        else dateStr += 'th';

        return dateStr;
    }

    render() {
        let contact = this.props.contact;
        let name = `${contact.firstName} ${contact.lastName}`;

        let priorityPicker = (
            <PriorityPicker
                toggle={this._togglePriorityPicker}
                updatePriority={this._setContactPriority}
            />
        );

        return (
            <View style={styles.container}>
                {this.state.priorityPicker ? priorityPicker : null}
                <ContactViewTop
                    image={contact.thumbnail}
                    name={name}
                    picker={this._togglePriorityPicker}
                    priority={contact.priority}
                    reset={this.props.reset}
                />
                <View style={styles.lowerContainer}>
                    <View style={styles.optionsContainer}>
                        <ContactOption
                            option="I will"
                            selected={this.state.method}
                            picker={this._getContactMethodPicker}
                        />
                        <ContactOption last
                            option={`${contact.firstName} every`}
                            selected={`${this.state.freqNum} ${this.state.freqUnit}`}
                            picker={this._getContactFreqPicker}
                        />
                    </View>
                    <View style={styles.LPOCContainer}>
                        <Text style={styles.LPOCText}>
                            last point of contact:
                        </Text>
                        <Card style={styles.LPOCBox}>
                            <Text style={styles.LPOCInnerText}>
                                {this._formatPOCDate(contact.lastContact)}
                            </Text>
                        </Card>
                    </View>
                    <View style={styles.notesContainer}>
                        <Text style={styles.notesTitle}>Notes:</Text>
                        <Card>
                            <TextInput
                                style={styles.notes}
                                multiline={true}
                                onChangeText={this._onNotesChange}
                                value={this.state.notes}
                            />
                        </Card>
                    </View>
                </View>
            </View>
        );
    }
}

ContactView.propTypes = {
    contact: PropTypes.object.isRequired,
    reset: PropTypes.func.isRequired,
    // Redux actions
    setContactPriority: PropTypes.func.isRequired,
    updateContact: PropTypes.func.isRequired,
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
    lowerContainer: {
        width: '100%',
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Theme.DarkLightBlue,
    },
    optionsContainer: {
        width: '100%',
        flexDirection: 'column',
        backgroundColor: Theme.White,
    },
    pickerBorder: {
        width: '90%',
        left: '5%',
        borderBottomWidth: 1,
        borderBottomColor: Theme.Gray,
    },
    pickerContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    halfPicker: {
        width: '50%',
    },
    LPOCContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    LPOCText: {
        fontSize: 18,
        fontWeight: '500',
        marginRight: 8,
    },
    LPOCBox: {
        backgroundColor: Theme.White,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 18,
        paddingRight: 18,
        marginLeft: 8,
    },
    LPOCInnerText: {
        fontSize: 18,
        color: Theme.DarkGray,
    },
    notesContainer: {
        width: '100%',
        height: 250,
        padding: 24,
    },
    notes: {
        width: '100%',
        height: '100%',
        padding: 12,
        paddingTop: 12,
        backgroundColor: Theme.White,
        fontSize: 14,
    },
    notesTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: Theme.DarkGray,
        marginBottom: 10,
    },
});

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
    setContactPriority: (cid, p) => dispatch(setContactPriority(cid, p)),
    updateContact: (c) => dispatch(updateContact(c)),
    removeContact: (c) => dispatch(removeContact(c)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactView);
