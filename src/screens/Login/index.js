import React, {useState, useEffect} from 'react';
import {
  View,  Text,TextInput,TouchableHighlight,TouchableOpacity,StyleSheet,Alert,ActivityIndicator,Keyboard,TouchableWithoutFeedback,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {colors, fontType} from '../../theme';
import {Eye, EyeSlash,Google} from 'iconsax-react-native';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoginDisabled, setLoginDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    let errorMessage = '';
    setLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
      const userToken = await auth().currentUser.getIdToken();
      const expirationInMilliseconds = 30 * 24 * 60 * 60 * 1000; //hari * jam * menit * detik * milidetik
      const expirationTime = new Date().getTime() + expirationInMilliseconds;
      const dataToStore = {
        userToken,
        expirationTime,
      };
      await AsyncStorage.setItem('userData', JSON.stringify(dataToStore));
      setLoading(false);
      navigation.navigate('MainApp');
    } catch (error) {
      setLoading(false);
      console.log('Login Error:', error.message);
      if (error.code === 'auth/invalid-email') {
        errorMessage = 'Email tidak valid.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Password salah.';
      } else if (error.code === 'auth/invalid-login') {
        errorMessage = 'Email atau password salah, silahkan periksa kembali.';
      } else {
        errorMessage = 'Terjadi kesalahan saat login.';
      }
      Alert.alert('Error', errorMessage);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const updateLoginButtonStatus = () => {
    if (email.trim() && password.trim()) {
      setLoginDisabled(false);
    } else {
      setLoginDisabled(true);
    }
  };
  useEffect(() => {
    updateLoginButtonStatus();
  }, [email, password]);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.Backgroud}>
        <View>
          <View style={styles.headerbesar}>
          <Text style={styles.header}>Log in</Text>
           </View>
          <Text style={styles.caption}>Login With:</Text>
         <View >
           <View style={textinput.container}>
          <Google size={21} color={colors.black()}></Google>
          <Text> Google</Text>
          </View>
         </View>
          <View style={styles.form}>
            <View>
              <Text style={textinput.label}>Email</Text>
              <View style={textinput.container}>
                <TextInput
                  placeholder="Enter your email address"
                  placeholderTextColor={colors.black()}
                  value={email}
                  onChangeText={text => {
                    setEmail(text);
                    updateLoginButtonStatus();
                  }}
                  inputMode="email"
                  keyboardType="email-address"
                  style={textinput.text}
                />
              </View>
            </View>
            <View>
              <Text style={textinput.label}>Password</Text>
              <View
                style={[
                  textinput.container,
                  {
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: 10,
                  },
                ]}>
                <TextInput
                  placeholder="Enter password"
                  placeholderTextColor={colors.black()}
                  value={password}
                  onChangeText={text => {
                    setPassword(text);
                    updateLoginButtonStatus();
                  }}
                  secureTextEntry={!passwordVisible}
                  style={[textinput.text, {flex: 1}]}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  {passwordVisible ? (
                    <Eye variant="Linear" color={colors.grey(0.6)} size={20} />
                  ) : (
                    <EyeSlash
                      variant="Linear"
                      color={colors.grey(0.6)}
                      size={20}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        </View>
        <View style={{gap: 10}}>
          <TouchableHighlight
            style={[
              button.container,
              {
                backgroundColor: isLoginDisabled
                  ? colors.green()
                  : colors.blue(),
              },
            ]}
            underlayColor={colors.blue(0.9)}
            onPress={handleLogin}
            disabled={isLoginDisabled}>
            {loading ? (
              <ActivityIndicator color={colors.white()} />
            ) : (
              <Text style={button.label}>LOG IN</Text>
            )}
          </TouchableHighlight>
          <View style={{flexDirection: 'row', gap: 5, alignSelf: 'center'}}>
            <Text style={[button.label, {color: colors.white()}]}>
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={[button.label, {color: colors.green()}]}>
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.latar(),
    paddingHorizontal: 24,
    paddingVertical: 60,
    justifyContent: 'space-between',
  },
  Backgroud : { 
    backgroundColor : colors.green(),
    borderRadius : 20,
    paddingBottom:110,
  },
  headerbesar:{
flexDirection: 'column',
alignContent: 'center',
left:120,
  },
  header: {
    fontSize: 32,
    fontFamily: fontType['Pjs-ExtraBold'],
    color: colors.white(),
 
  
  },
  caption: {
    fontFamily: fontType['Pjs-Regular'],
    color: colors.black(),
    fontSize: 14,
    marginTop: 5,
    marginBottom: 10,
  },
  form: {
    gap: 20,
  },
});
const textinput = StyleSheet.create({
  label: {
    fontFamily: fontType['Pjs-Medium'],
    fontSize: 14,
    color: colors.black(),
    marginBottom: 5,
  },
  container: {
    backgroundColor: colors.white(),
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
    flexDirection: 'row',
  },
  text: {
    paddingVertical: 0,
    color: colors.black(),
    fontFamily: fontType['Pjs-Regular'],
  },
});
const button = StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 16,
    alignItems: 'center',
  },
  label: {
    color: colors.white(),
    fontSize: 14,
    fontFamily: fontType['Pjs-SemiBold'],
  },
});
