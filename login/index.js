import React, {Component} from 'react';
let firebase = require('firebase');
let config = require('./credentials');
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


firebase.initializeApp(config);


export default class LoginScreen extends Component {
  constructor(props){
    super(props);

    this.state = {
      username: '',
      password: '',
      feedback: '',

      display: 'flex',
      displaynone: 'none'
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleSignup() {
    //console.log(this.state.username, this.state.password);
    const user = this.state.username;
    const pwd = this.state.password;
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(user, pwd);
    promise.then((obj) => {
      //console.log(obj);
      this.setState({ feedback: `Welcome to your account, ${ obj.user.email }` , displaynone: '' , display: 'none' });
      firebase.database().ref('nativeUser/' + obj.user.uid).set({
        userID: obj.user.uid,
        username: obj.user.email,
        password: this.state.password
      });
    }).catch(error => this.setState({ feedback: error.message }) );
  }

  handleLogin() {
    if (this.state.username !== '' && this.state.password !== '') {
      console.log(this.state.username, this.state.password);
      const auth = firebase.auth();
      const promise = auth.signInWithEmailAndPassword(this.state.username, this.state.password);
      promise.then(obj => {
          //console.log(obj);
          this.setState({ feedback: `Hello ${obj.user.email}, You have successfully loggedIn!`, displaynone: '', display: 'none'});
      }).catch(error => this.setState({ feedback: error.message }) );
    } else {
      this.setState({ feedback: `Please enter the details` });
    }
  }

  handleLogout() {
    const auth = firebase.auth();
    auth.signOut();
    this.setState({ feedback: 'You have successfully logged out!', displaynone: 'none', display: '' });
  }

  render() {
    var feed;
    if(this.state.feedback !== '') {
      feed = <Text style={styles.response}> { this.state.feedback } </Text>;
    } else {
      feed = <Text></Text>;
    }
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.bg} source={require('../imgs/login_edit.png')}>
          <View style={styles.logoContainer}>
            <Image style={styles.companyLogo} source={require('../imgs/star.png')}/>
          </View>
          <View style={styles.inputContainer}>
            <View style={{display: this.state.display}}>
              <View style={styles.inputWrapper}>
                <Image style={styles.logo} source={require('../imgs/User.png')}/>
                <TextInput
                  style={styles.input}
                  placeholder="Your username"
                  placeholderTextColor="#000000"
                  onChangeText={ (text) => this.setState({username: text}) }
                />
              </View>
              <View style={styles.inputWrapper }>
                <Image style={styles.logo} source={require('../imgs/Lock.png')}/>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#000000"
                  secureTextEntry={true}
                  onChangeText={ (text) => this.setState({password: text}) }
                />
              </View>
            </View>
            <TouchableOpacity style={{display: this.state.display}}>
              <Text style={styles.forget}>Forget?</Text>
            </TouchableOpacity>

            { feed }

            <View style={styles.loginLogoutButton}>
              <TouchableOpacity
                onPress={this.handleLogin}
                style={{display: this.state.display}}
                >
                <Text style={{color: '#dd3636', fontSize: 20, marginVertical: 10}}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.handleLogout}
                style={{ display: this.state.displaynone }}
                >
                <Text style={{color: '#dd3636', fontSize: 19, marginVertical: 10}}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{
              display: this.state.display,
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              paddingTop: 30
             }}>
            <View style={styles.signupTextWrapper}>
              <Text style={styles.signupText}>No account? </Text>
            </View>
            <TouchableOpacity
              onPress={this.handleSignup}
              style={styles.signupButtonWrapper}
              >
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
  response: {
    textAlign: 'center',
    backgroundColor: '#ffffff'
  },
  loginLogoutButton: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  signupText: {
    fontSize: 17,
  },
  signupButton: {
    backgroundColor: 'transparent',
    fontSize: 18,
    marginHorizontal: 15,
    color: '#DD3636'
  }
});
