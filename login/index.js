import React, {Component} from 'react';
//import styles from './styles';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  Button,
  TouchableOpacity
} from 'react-native';


export default class LoginScreen extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.bg} source={require('../imgs/login_edit.png')}>
          <View style={styles.logoContainer}>
            <Image style={styles.companyLogo} source={require('../imgs/star.png')}/>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Image style={styles.logo} source={require('../imgs/User.png')}/>
              <TextInput
                style={styles.input}
                placeholder="Your username"
                placeholderTextColor="#000000"
              />
            </View>
            <View style={styles.inputWrapper}>
              <Image style={styles.logo} source={require('../imgs/Lock.png')}/>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#000000"
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity>
              <Text style={styles.forget}>Forget?</Text>
            </TouchableOpacity>
            <View style={styles.signinButton}>
              <Button
                title="Sign In"
                color="#DD3636"
              />
            </View>
          </View>
          <View style={styles.signupContainer}>
            <View style={styles.signupTextWrapper}>
              <Text style={styles.signupText}>No account? </Text>
            </View>
            <TouchableOpacity style={styles.signupButtonWrapper}>
              <Text style={styles.signupButton}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },
  logoContainer: {
    flex: 1,
    marginVertical: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  companyLogo: {
    width: 150,
    height: 150,
    resizeMode: 'contain'
  },
  inputContainer: {
    flex: 2,
    justifyContent: 'center'
  },
  inputWrapper: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#a7a7a7',
    padding: 10
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain'
  },
  input: {
    fontSize: 20,
    marginHorizontal: 15,
  },
  forget: {
    fontSize: 15,
    color: '#e35e5e',
    textAlign: 'right',
    marginHorizontal: 10,
    padding: 17
  },
  signinButton: {
    marginVertical: 15,
    paddingVertical: 10,
    /*backgroundColor: '#DD3636'*/
  },
  signupContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 30
  },
  signupText: {
    fontSize: 17,
  },
  signupButton: {
    backgroundColor: 'transparent',
    fontSize: 17,
    marginHorizontal: 15,
    color: '#DD3636'
  }
});
