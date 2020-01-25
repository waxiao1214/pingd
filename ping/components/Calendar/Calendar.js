import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';
import AppBar from '../generic/AppBar';
import Theme from '../Theme';

export default class CalendarPage extends Component {
  constructor(props) {
      super(props);
      this.props.navigator.toggleNavBar({
          to: 'hidden',
          animated: false,
      });

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
                <View>
                  <Text style={styles.soonText}>Calendar Coming Soon!</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    logo: {
        resizeMode: 'contain',
        height: 64,
        marginTop: 20,
    },
    soonText: {
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 14,
      color: Theme.Blue,
      alignSelf:'center',
    },
});
