import React, {Component} from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import AppBar from '../generic/AppBar';
import PingCard from '../generic/PingCard';


class PingList extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.toggleNavBar({
            to: 'hidden',
            animated: false,
        });

        this._comparePingCards = this._comparePingCards.bind(this);
    }

    _comparePingCards(c1, c2) {
        if (c1.contact.nextContact < c2.contact.nextContact)
            return -1;
        else if (c1.contact.nextContact > c2.contact.nextContact)
            return 1;
        else if (c1.contact.lastName < c2.contact.lastName)
            return -1;
        else if (c1.contact.lastName > c2.contact.lastName)
            return 1;
        else {
            if (c1.contact.firstName < c2.contact.firstName)
                return -1;
            else if (c1.contact.firstName > c2.contact.firstName)
                return 1;
        }

        return 0;
    }

    render() {
        return (
            <View>
                <AppBar height={100}>
                    <Image
                        style={styles.logo}
                        source={require('../../assets/logo.png')}
                    />
                </AppBar>
                <Text style={styles.subtitle}>
                  Swipe Right if you Connected, Swipe Left to Snooze{"\n"}
                  Hold down card to text them Right Now!</Text>
                {
                  this.props.contacts
                  ?
                  <FlatList
                      data={this.props.contacts.sort((c1, c2) => this._comparePingCards(c1,c2))}
                      renderItem={(c) =>
                        <PingCard
                            contact = {c.item.contact}
                        />
                                }
                  />
                  : <Text>no</Text>
                }
            </View>
        );
    }
}

PingList.propTypes = {
    navigator: PropTypes.object,
};

const styles = StyleSheet.create({
    logo: {
        resizeMode: 'contain',
        height: 64,
        marginTop: 20,
    },
    title:{
      marginBottom: 6,
      fontSize: 20,
      height: 22,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    subtitle:{
      marginTop: 6,
      paddingBottom: 10,
      fontSize: 8,
      textAlign: 'center',
    },
});

const mapStateToProps = (state) => {
    return {
        contacts: state.contacts,
    };
};

const mapDispatchToProps = () => {
    return { };
};

export default connect(mapStateToProps, mapDispatchToProps)(PingList);
