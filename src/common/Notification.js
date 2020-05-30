import React from 'react';
import {TouchableOpacity, Image, Text, View} from 'react-native';
import styles from '../styles';
import colors from '../styles/colors';

const DrawerButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={require('../assets/images/notification.png')}
        style={styles.headerRight}
      />
      <View style={styles.notificationBadgeContainer}>
        <Text style={styles.notificationBadge}>2</Text>
      </View>
    </TouchableOpacity>
  );
};

export default DrawerButton;
