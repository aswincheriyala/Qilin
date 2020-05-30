import React, {Component} from 'react';

import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  ScrollView,
  Easing,
  Image,
  InteractionManager,
  ActivityIndicator,
  LayoutAnimation,
} from 'react-native';
import styles from '../styles';
import colors from '../styles/colors';
import {passbookData} from '../common/Datas';

const movingHeight = 100;
let TabBarButtons = ['ALL', 'SEND', 'RECEIVED', 'CLAIMED', 'REDEEMED'];

export default class Passbooks extends Component {
  constructor() {
    super();
    this.state = {active: 0, completeLoaded: false};
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.animation1 = new Animated.Value(0);
      this.rotate = this.animation1.interpolate({
        inputRange: [0, 1],
        outputRange: ['90deg', '180deg'],
      });
      this.animation2 = new Animated.Value(0);
      this.translateY = this.animation2.interpolate({
        inputRange: [0, 1],
        outputRange: [-movingHeight, -2],
        extrapolate: 'clamp',
      });
      this.opacity = this.animation2.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 0, 1],
      });
      this.animValue = {value: 0};
      this.animation1.addListener((val) => (this.animValue = val));
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({completeLoaded: true});
    });
  }

  render() {
    const {completeLoaded} = this.state;
    if (!completeLoaded) {
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    }
    const {toggle, rotate, translateY, opacity} = this;
    return (
      <View style={styles.container2}>
        <View style={styles.togglerContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.transaction}>Transactions (33)</Text>
            <TouchableOpacity onPress={toggle}>
              <Animated.Image
                source={require('../assets/images/toggler.png')}
                style={[styles.toggler, {transform: [{rotate}]}]}
              />
            </TouchableOpacity>
          </View>
          <Animated.View
            style={[
              styles.datePickerContainer,
              {
                height: movingHeight,
                transform: [{translateY}],
              },
            ]}>
            <Animated.View style={[styles.switchContainer, {opacity}]}>
              <Text style={styles.selectDateRange}>Select Date Range</Text>
              <Text style={styles.datepicker}>27-04-2020 - 12-05-2020</Text>
            </Animated.View>

            <Animated.View style={[styles.switchContainer, {opacity}]}>
              {TabBarButtons.map((item, index) =>
                this.returntabBar(item, index),
              )}
            </Animated.View>
          </Animated.View>
        </View>
        <ScrollView
          contentContainerStyle={[styles.mt60, {paddingBottom: movingHeight}]}
          showsVerticalScrollIndicator={false}>
          <Animated.View
            style={{
              transform: [{translateY}],
              marginTop: movingHeight,
            }}>
            {passbookData.map((item) => this.scrollItems(item))}
          </Animated.View>
        </ScrollView>
      </View>
    );
  }

  toggle = () => {
    console.log(this.animValue.value);
    Animated.parallel([
      Animated.spring(this.animation1, {
        toValue: this.animValue.value < 0.5 ? 1 : 0,
        useNativeDriver: true,
      }),
      Animated.timing(this.animation2, {
        toValue: this.animValue.value < 0.5 ? 1 : 0,
        duration: this.animValue.value < 0.5 ? 700 : 250,
        easing: this.animValue.value < 0.5 ? Easing.bounce : Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
  };

  returntabBar = (label, index) => {
    const {active} = this.state;
    return (
      <TouchableOpacity
        style={styles.flex}
        onPress={() => this.setState({active: index})}>
        <Text
          style={[
            styles.tabLabel,
            index === active && {color: colors.primary},
          ]}>
          {label}
        </Text>
        <View
          style={[
            styles.bar,
            index === active && {backgroundColor: colors.primary},
          ]}
        />
      </TouchableOpacity>
    );
  };

  scrollItems = (item) => {
    return (
      <View style={styles.scrollItem}>
        <View style={styles.flexRow}>
          <Image source={item.icon} style={styles.scrollItemIcon} />
          <View>
            <Text style={styles.scrollItemTitle}>{item.title}</Text>
            <Text style={styles.scrollItemDate}>{item.date}</Text>
          </View>
        </View>
        {!item.type ? (
          <View style={styles.alignCenter}>
            <View style={styles.flexRow}>
              <View style={styles.rupeeContainer}>
                <Text style={styles.rupee}>₹</Text>
              </View>
              <Text style={styles.amount}>{item.amount}</Text>
            </View>
            <Text style={styles.approved}>APPROVED</Text>
          </View>
        ) : (
          <View style={styles.alignCenter}>
            <View style={styles.flexRow}>
              <Image
                source={require('../assets/images/coin.jpeg')}
                style={styles.coin}
              />
              <Text style={styles.receivedCB}>
                <Text
                  style={item.type === 1 ? styles.textGreen : styles.textRed}>
                  {item.type === 1 ? '+' : '-'}
                </Text>{' '}
                {item.amount}
              </Text>
            </View>
            {item.type === 1 && (
              <Text style={styles.CB}>
                C/B<Text style={{color: colors.primary}}>13500</Text>
              </Text>
            )}
          </View>
        )}
      </View>
    );
  };
}
