import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import styles from '../styles';

const DrawerButton = ({onPress, title}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={require('../assets/images/menu_white.png')}
        style={styles.headerLeft}
      />
    </TouchableOpacity>
  );
};

export default DrawerButton;
