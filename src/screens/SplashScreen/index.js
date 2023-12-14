import {StyleSheet, Text, View,Image} from 'react-native';
import React, {useEffect} from 'react';
import {colors, fontType} from '../../theme';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    checkToken();
  }, []);
  const checkToken = async () => {
    try {
      // await AsyncStorage.removeItem('userData');
      const userDataJSON = await AsyncStorage.getItem('userData');
      if (userDataJSON) {
        const userData = JSON.parse(userDataJSON);
        const {userToken, expirationTime} = userData;

        if (userToken && expirationTime) {
          const currentTime = new Date().getTime();

          if (currentTime <= expirationTime) {
            setTimeout(() => {
              navigation.replace('MainApp');
            }, 1500);
          } else {
            setTimeout(() => {
              navigation.replace('Login');
            }, 1500);
          }
        } else {
          setTimeout(() => {
            navigation.replace('Login');
          }, 1500);
        }
      } else {
        setTimeout(() => {
          navigation.replace('Login');
        }, 1500);
      }
    } catch (error) {
      console.error('Error retrieving token data:', error);
      setTimeout(() => {
        navigation.replace('Login');
      }, 1500);
    }
  };

  return (
    <View style={styles.container}>
      <Image
          style={styles.pic}
          source={{
            uri : 'https://i.pinimg.com/564x/19/e9/c1/19e9c17c2f768e7d2b6e687f5ff90d61.jpg'
          }}
        />
      <Text style={styles.logo}>R-Music</Text>
      <View style={styles.infoContainer}>
        <Text style={[styles.info, {fontFamily: fontType['Pjs-Regular']}]}>
          The Journey Begins
        </Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.latar(),
    justifyContent: 'center',
  },
  pic: {
    width: 180,
    height: 180,
   left:100,
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    fontSize: 48,
    fontFamily: fontType['Pjs-ExtraBold'],
    color: colors.white(),
    alignSelf: 'center',
  },
  infoContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
  },
  info: {
    fontSize: 12,
    color: colors.white(),
  },
});
