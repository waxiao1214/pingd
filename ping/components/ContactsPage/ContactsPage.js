import React, {Component} from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import AppBar from '../generic/AppBar';
import ContactCard from '../generic/ContactCard';
import ContactSeparator from '../generic/ContactSeparator';
import * as appActions from '../../api/redux/actions/appActions/changeRoot';
import ContactView from './ContactView';
import Theme from '../Theme';

import compareContacts from '../../utils/compareContacts';


class ContactsPage extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.toggleNavBar({
            to: 'hidden',
            animated: false,
        });

        this.state = {
            viewing: null,
        };

        this._renderContactCard = this._renderContactCard.bind(this);
        this._resetContact = this._resetContact.bind(this);
    }

    _addContactSeparators(contacts) {
        let processed = [];
        let lastInitial = null;

        for (let i = 0; i < contacts.length; i++) {
            let contact = contacts[i].contact;
            let initial = contact.lastName[0];
            if (initial != lastInitial) {
                processed.push({isSeparator: true, letter: initial});
                lastInitial = initial;
            }

            processed.push(contact);
        }

        return processed;
    }

    _showContact(contact) {
        this.setState({viewing: contact._id});
    }

    _resetContact() {
        this.setState({viewing: null});
    }

    _renderContactCard(contact) {
        if (contact.item.isSeparator)
            return <ContactSeparator letter={contact.item.letter}/>;
        let name = `${contact.item.firstName} ${contact.item.lastName}`;

        return (
            <TouchableOpacity
                style={styles.cardContainer}
                onPress={this._showContact.bind(this, contact.item)}
            >
                <ContactCard
                    style={[styles.card]}
                    name={name}
                    phoneNumber={contact.item.phoneNumber}
                    priority={contact.item.priority}
                    thumbnail={contact.item.thumbnail}
                />
            </TouchableOpacity>
        );
    }

    render() {
        let contacts = this.props.contacts ? this.props.contacts : [];
        contacts.sort(compareContacts);

        let contact = null;
        if (this.state.viewing !== null) {
            let shown = contacts.find(c => c.contact._id === this.state.viewing);
            contact = <ContactView contact={shown.contact} reset={this._resetContact}/>;
        }

        return (
            <View style={styles.container}>
                {contact}
                <AppBar height={72}>
                    <Text style={styles.title}>Contacts</Text>
                </AppBar>
                <FlatList
                    contentContainerStyle={styles.contactList}
                    data={this._addContactSeparators(contacts)}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this._renderContactCard}
                />
                <TouchableOpacity onPress={() => this.props.addMoreContacts()}
                                  style={styles.addButton}>
                  <Text style={styles.addButtonText}>Add More Contacts</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

ContactsPage.propTypes = {
    contacts: PropTypes.array.isRequired,
    navigator: PropTypes.object,
    addMoreContacts: PropTypes.func,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.White,
    },
    contactList: {
        padding: 20,
    },
    cardContainer: {
        marginTop: 10,
        marginBottom: 10,
    },
    card: {
        height: 80,
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        color: Theme.White,
        marginTop: 24,
    },
    addButton: {
      position: 'absolute',
      bottom:'2%',
      alignSelf:'center',
      right:0,
      left:0,
      bottom:0,
      height:60,
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Theme.White,
    },
    addButtonText: {
      flex:1,
      top:20,
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 14,
      color: Theme.Blue
    }
});

const mapStateToProps = (state) => {
    return {
        contacts: state.contacts,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      addMoreContacts: () => dispatch(appActions.addNew())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsPage);
