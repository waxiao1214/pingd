import React, {Component} from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import Swiper from 'react-native-swiper';

import {connect} from 'react-redux';
import Theme from '../Theme';
import * as appActions from '../../api/redux/actions/appActions/changeRoot';

class Onboarding extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.toggleNavBar({
            to: 'hidden',
            animated: false,
        });

        this._startApp = this._startApp.bind(this);
    }

    _startApp = () => {
        this.props.startAppImporting();
    }

    render() {
        fillerImage = require('../../assets/contact.png');
        return (
            <Swiper loop={false}>
                <View style={styles.slide1}>
                    <Text style={styles.text}>
                      <Text style={styles.b}>Social Relationships</Text> are like flowers in your garden
                    </Text>
                    <Image
                        style={styles.image}
                        source={require('../../assets/flower_party.png')}
                    />
                    <Text style={styles.text}>
                      Given time and care, they <Text style={styles.b}> flourish</Text> {"\n\n"}
                    Deprived of attention, they <Text style={styles.b}> wither</Text>
                    </Text>
                </View>
                <View style={styles.slide2}>
                    <Text style={styles.text}>
                      <Text style={styles.b}>
                        Pingd</Text> is here to help you<Text style={styles.b}> cultivate </Text>this garden and ensure your relationships
                          <Text style={styles.b}> thrive</Text>
                    </Text>
                    <Image
                        style={styles.image2}
                        source={require('../../assets/water.png')}
                    />
                </View>
                <View style={styles.slide1}>
                    <Text style={styles.text}>
                      Simply choose the contacts you want to <Text style={styles.b}> stay in touch </Text>with and Pingd will notify you when it’s time to <Text style={styles.b}>reconnect</Text>
                    </Text>
                    <Image
                        style={styles.image2}
                        source={require('../../assets/clock.png')}
                    />
                </View>
                <View style={styles.slide3}>
                    <Text style={styles.text}>
                      The secret to a meaningful life is meaningful relationships
                    </Text>
                    <Image
                        style={styles.image}
                        source={require('../../assets/smile_flowers.png')}
                    />
                    <Text style={styles.text}>
                      <Text style={styles.b}>Pingd:</Text> Helping your relationships bloom
                    </Text>
                    <TouchableOpacity style={styles.buttonBorder} onPress={this._startApp}>
                      <Text style={styles.buttonText}> Let's Grow Together </Text>
                    </TouchableOpacity>
                </View>
            </Swiper>
        );
    }
}

Onboarding.propTypes = {
    navigator: PropTypes.object,
    startAppImporting: PropTypes.func,
};


const mapStateToProps = () => {
    return { };
};

const mapDispatchToProps = (dispatch) => {
    return {
        startAppImporting: () => dispatch(appActions.login()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Onboarding);


const styles = StyleSheet.create({
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    image:{
    width: 250,
    height: 250,
    },
    image2:{
    width: 350,
    height: 350,
    },
    text: {
      fontSize: 22,
      fontWeight: '500',
      color: Theme.LightBlue,
      margin: '10%',
      textAlign: 'center',
    },
    b: {
      fontSize: 26,
      fontWeight: 'bold',
      color: Theme.Blue,
    },
    buttonBorder:{
      borderRadius: 15,
      backgroundColor: 'white',
    },
    buttonText:{
      fontSize:22,
      padding: '3%',
      color: Theme.Blue
    }
});
