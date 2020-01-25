import React, {Component} from 'react';
const _ = require('lodash');
import {
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    View,
    Text,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import updateContact from '../../api/redux/actions/updateContact';
import Communications from 'react-native-communications';

import Theme from '../Theme';
import {ContactFreqs, SnoozeFreqs} from '../ContactUtils';
import Swipeable from 'react-native-swipeable-row';


class PingCard extends Component {
    constructor(props) {
        super(props);

        swipeable = null;
        var oldDate = new Date(this.props.contact.nextContact);
        difTime = oldDate.getTime() - new Date().getTime();

        this.state = {
            daysUntil: Math.floor(difTime / (1000 * 60 * 60 * 24)),
        };
    }

    sendText(){


      Communications.textWithoutEncoding(this.props.contact.phoneNumber, `Hey ${this.props.contact.firstName}! It's been a while, would love to catch up`);
      console.log('texted');


    }

    handleUserBeganScrollingParentView() {
      this.swipeable.recenter();
    }

    getSwipeStyle(color){
      var style = {
          marginBottom: 10,
          backgroundColor: color,
          flex:1,
          justifyContent: 'center',
      };

      return style;
    }

    getSubtitle(){
      var oldDate = new Date(this.props.contact.nextContact);
      difTime = oldDate.getTime() - new Date().getTime();
      daysUntil = Math.floor(difTime / (1000 * 60 * 60 * 24));

      if (daysUntil == 1){
        daysLeft = `(Tomorrow's ping)`;
      }
      else if (daysUntil == 0){
        daysLeft = `(Today's ping)`;
      }
      else if (daysUntil < 0){
        days = Math.abs(daysUntil);
        daysLeft = `(${days} days overdue...)`;
      }
      else{
        daysLeft = `(${daysUntil} days)`
      }

      var subtitle  = <Text>
                        <Text>Ping Date: {oldDate.toDateString()}</Text>
                        <Text style={{fontWeight: "bold"}}> {daysLeft}</Text>
                      </Text>;

      return subtitle;

    }

    getSwipeStyle(color){
      var style = {
          margin: 10,
          marginLeft:0,
          marginRight:0,
          backgroundColor: color,
          flex:1,
          justifyContent: 'center',
      };

      return style;
    }

    getCardStyle() {


        var style = {
            height: 80,
            flex: 1,
            margin: 10,
            borderWidth: 0.5,
            borderRadius: 5,
            borderColor: Theme.Gray,
            backgroundColor: Theme.LightBlue,
        };

        // if (this.state.daysUntil < 0) {
        //   style.borderWidth = 4;
        //   style.borderColor = '#C7070F';
        //
        // }



        return style;
    }

    _changeDays(type){
      var oldDate = new Date(this.props.contact.nextContact);
      var days = oldDate.getDate();

      var updatedContact = _.cloneDeep(this.props.contact);

      console.log('ORIGINAL CONTACT DATE:', updatedContact.nextContact);

      // Add buffer for pings, later date for snooze
      let snooze = SnoozeFreqs[updatedContact.priority];

      if (type == 'pingd') {
        var freq = ContactFreqs[updatedContact.priority];
        var freq = this.props.contact.contactFrequency
        // console.log('FREQ:',freq);
        // console.log('FreqNum:',this.props.contact.contactFrequency);
        let start = Math.floor(freq / 2);
        let rand = Math.floor(Math.random() * freq) - start;

        var days = start + rand + snooze;

        var today = Math.round(new Date().getTime());

        updatedContact.lastContact = today;
      }
      else if (type == 'snooze') {
        // All contacts are snoozed 3 days
        var today = Math.round(oldDate.getTime());
        var days = snooze;
      }

      let toc = today + (days * 24 * 60 * 60 * 1000);
      var newPingDate =  new Date(toc);
      updatedContact.nextContact = newPingDate;


      this.props.updateContact(updatedContact);
    }

    render() {

        const leftContent = <View style={this.getSwipeStyle('#53d769')}>
                                <View style={{marginRight: '1%', marginLeft: '65%'}}>
                                  <Text style={styles.swipeText}>Connected!</Text>
                                </View>
                              </View>;

        const rightContent = <View style={this.getSwipeStyle('#fd9426')}>
                                <View style={{marginLeft: '1%', marginRight: '65%'}}>
                                  <Text style={styles.swipeText}>Snooze</Text>
                                </View>
                              </View>;

        let name = `${this.props.contact.firstName} ${this.props.contact.lastName}`;

        return(

          <Swipeable onRef={ref => this.swipeable = ref}
                     leftContent={leftContent}
                     onLeftActionRelease={() => this._changeDays('pingd')}
                     rightContent={rightContent}
                     onRightActionRelease={() => this._changeDays('snooze')}>
              <View style = {this.getCardStyle()}>
                <TouchableOpacity onLongPress={() => this.sendText(this.props.contact.phone)}>
                  <Text style={styles.title}>{name}</Text>
                  <Text style={styles.subtitle}> {this.getSubtitle()} </Text>
                </TouchableOpacity>
              </View>
          </Swipeable>
        )
    }
}

PingCard.propTypes = {
    changeDays: PropTypes.func,
};

const styles = StyleSheet.create({
    container: {
        height: 80,
        flex: 1,
        backgroundColor: '#bdc3c7',
        margin: 10,
        flex: 1,
        paddingTop: 22
    },
    swipeText:{
      textAlign:'center',
      fontWeight: 'bold',
      color:Theme.White
    },
    card:{
      borderWidth: 4,
      marginBottom: 10,
    },
    title: {
      padding: 10,
      paddingBottom: 0,
      fontSize: 18,
      height: 44,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    subtitle: {
      paddingTop: 2,
      paddingBottom: 10,
      fontSize: 9,
      height: 22,
      textAlign: 'center',
    },
});

const mapStateToProps = () => {
    return { };
};

const mapDispatchToProps = (dispatch) => ({
    updateContact: (c) => dispatch(updateContact(c)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PingCard);
