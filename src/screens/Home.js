import React from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import styles from '../styles';
import colors from '../styles/colors';
import {homeButtons} from '../common/Datas';

const Home = ({navigation}) => {
  const button = (data) => (
    <TouchableOpacity onPress={() => navigation.navigate(data.route)}>
      <Image
        source={data.icon}
        style={styles.optionIcons}
        resizeMode="contain"
      />
      <Text style={styles.optionLabel}>{data.label}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} />
      <View style={styles.curve} />
      <View style={styles.flex}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../assets/images/avatar.png')}
            style={styles.profilePic}
          />
          <View style={styles.nameContainer}>
            <Text style={styles.name}>Himanshu Barmola</Text>
            <Text style={styles.number}>9972043977710001</Text>
          </View>
        </View>
        <View style={styles.optionContainer}>
          {homeButtons.map((item) => button(item))}
        </View>
      </View>
      <View style={styles.flex2}>
        <View style={styles.firstCardContainer}>
          <ImageBackground
            source={require('../assets/images/couponbg.png')}
            style={styles.firstCard}>
            <View style={styles.innerCard}>
              <Image
                source={require('../assets/images/mark-coin.png')}
                style={styles.markCoin}
              />
              <View>
                <Text style={styles.redeempoints}>16871</Text>
                <Text style={styles.redeemlabels}>Redeemable Points</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.secondCardContainer}>
          <ImageBackground
            source={require('../assets/images/c1.png')}
            style={styles.secondCard}
          />
        </View>
      </View>
    </View>
  );
};

export default Home;
