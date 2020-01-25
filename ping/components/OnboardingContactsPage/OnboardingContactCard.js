import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import addContact from '../../api/redux/actions/addContact';
import removeContact from '../../api/redux/actions/removeContact';
import setContactPriority from '../../api/redux/actions/setContactPriority';

import BucketSelector from './BucketSelector';
import ContactCard from '../generic/ContactCard';
import {ContactFreqs} from '../ContactUtils';
import Theme from '../Theme';


class OnboardingContactCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contact: {},
            expanded: false,
            priority: -1,
        };

        this.expand = this.expand.bind(this);
        this.setPriority = this.setPriority.bind(this);
    }

    expand() {
        this.setState({expanded: !this.state.expanded});
    }

    _getInitialContactTime(priority) {
        let freq = ContactFreqs[priority];
        let start = Math.floor(freq / 2);

        let rand = Math.floor(Math.random() * freq) - start;
        let days = start + rand + 1;

        let today = Math.round(new Date().getTime());
        let toc = today + (days * 24 * 60 * 60 * 1000);
        return new Date(toc);
    }

    setPriority(priority) {
        // selecting the same priority removes the contact
        if (priority === this.state.priority) {
            this.props.removeContact(this.state.contact._id);
            this.setState({
                contact: {},
                priority: -1,
            });
        // selecting a new priority updates the contact
        } else if (this.state.priority >= 0) {
            let newContact = this.state.contact;
            newContact.priority = priority;

            this.props.setContactPriority(this.state.contact._id, priority);
            this.setState({
                contact: newContact,
                priority: priority,
            });
        } else {
            const contact = {
                _id: this.props.contactID,
                firstName: this.props.firstName,
                lastName: this.props.lastName,
                phoneNumber: this.props.phoneNumber,
                thumbnail: this.props.thumbnail,
                priority: priority,
                contactFrequency: ContactFreqs[priority],
                contactMethod: 'contact',
                lastContact: 0,
                nextContact: this._getInitialContactTime(priority),
                notes: '',
            };

            this.props.addContact(contact);

            this.setState({
                contact: contact,
                priority: priority,
            });
        }
    }

    _getBorderStyle() {
        let style = {
            borderColor: '',
            borderWidth: 4,
            shadowColor: '',
            shadowOpacity: 0.3,
        };

        if (this.state.priority >= 0)
            style.shadowOpacity = 0.8;

        if (this.state.priority === 0) {
            style.borderColor = Theme.Green;
            style.shadowColor = Theme.Green;
        } else if (this.state.priority === 1) {
            style.borderColor = Theme.Blue;
            style.shadowColor = Theme.Blue;
        } else if (this.state.priority === 2) {
            style.borderColor = Theme.Purple;
            style.shadowColor = Theme.Purple;
        }

        return style;
    }

    render() {
        let name;
        if (this.props.firstName !== '')
            name = `${this.props.firstName} ${this.props.lastName}`;
        else
            name = this.props.lastName;

        let phoneNumber = this.props.phoneNumber;  // TODO: format?

        let cardStyle = [styles.card];
        if (this.state.priority >= 0)
            cardStyle.push(this._getBorderStyle());

        let selector = null;
        if (this.state.expanded)
            selector = (
                <BucketSelector
                    style={cardStyle}
                    priority={this.state.priority}
                    expand={this.expand}
                    setPriority={this.setPriority}
                />
            );

        return (
            <TouchableOpacity style={styles.container} onPress={this.expand}>
                <ContactCard
                    style={cardStyle}
                    name={name}
                    phoneNumber={phoneNumber}
                    thumbnail={this.props.thumbnail}
                >
                    {selector}
                </ContactCard>
            </TouchableOpacity>
        );
    }
}

OnboardingContactCard.propTypes = {
    contactID: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    // Redux actions
    addContact: PropTypes.func.isRequired,
    removeContact: PropTypes.func.isRequired,
    setContactPriority: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginBottom: 10,
    },
    card: {
        margin: 0,
        padding: 0,
    },
});


const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
    addContact: (c) => dispatch(addContact(c)),
    removeContact: (cid) => dispatch(removeContact(cid)),
    setContactPriority: (cid, p) => dispatch(setContactPriority(cid, p)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingContactCard);
