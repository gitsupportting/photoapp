import React from 'react'
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  AsyncStorage,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import axios from 'axios'
// import AsyncStorage from '@react-native-community/async-storage';
import { Block, Text, Button as GaButton, theme } from 'galio-framework'

import { Button, Icon, Input } from '../components'
import { Images, nowTheme } from '../constants'

const { width, height } = Dimensions.get('screen')

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
)
class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      // email: 'test@7.com',
      // phone: '123',
      // password: '44646',
      email: '',
      phone: '',
      password: ''
    }
  }
  componentDidMount () {
    AsyncStorage.setItem('userData', 'null').then(res => {})
  }
  onLogin = () => {
    if (this.state.email === '') {
      alert('Insert your email')
      return
    }
    if (this.state.phone === '') {
      alert('Insert your phone number')
      return
    }
    if (this.state.password === '') {
      alert('Insert your code')
      return
    }
    axios
      .post(`http://165.227.81.153:3005/users/login`, {
        email: this.state.email,
        phone: this.state.phone,
        code: this.state.password
      })
      .then(res => {
        if (res.data.result === false) {
          alert('You are acount of date')
          return
        }
        AsyncStorage.setItem('userData', JSON.stringify(res.data.data)).then(ress => {          
          this.props.navigation.navigate('Galleries')
        })
      })
      .catch(error => {
        console.warn(error)
      })
  }

  onRegister = () => {
    this.props.navigation.navigate('Account')
  }

  render () {
    return (
      <DismissKeyboard>
        <Block flex middle>
          <ImageBackground
            source={Images.RegisterBackground}
            style={styles.imageBackgroundContainer}
            imageStyle={styles.imageBackground}
          >
            <Block flex middle>
              <Block style={styles.registerContainer}>
                <Block flex space='evenly'>
                  <Block flex={0.4} middle style={styles.socialConnect}>
                    <Block flex={0.2} middle>
                      <Text
                        style={{
                          fontFamily: 'montserrat-regular',
                          textAlign: 'center'
                        }}
                        color='#333'
                        size={24}
                      >
                        Login with your account
                      </Text>
                    </Block>
                  </Block>
                  <Block flex={1} middle space='between'>
                    <Block center flex={0.7}>
                      <Block flex space='between'>
                        <Block>
                          <Block width={width * 0.8}>
                            <Input
                              placeholder='Email'
                              style={styles.inputs}
                              value={this.state.email}
                              onChangeText={email => this.setState({ email: email })}
                              iconContent={
                                <Icon
                                  size={16}
                                  color='#ADB5BD'
                                  name='email-852x'
                                  family='NowExtra'
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                          <Block width={width * 0.8}>
                            <Input
                              placeholder='Phone'
                              style={styles.inputs}
                              value={this.state.phone}
                              onChangeText={phone => this.setState({ phone: phone })}
                              iconContent={
                                <Icon
                                  size={16}
                                  color='#ADB5BD'
                                  name='email-852x'
                                  family='NowExtra'
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                            <Input
                              placeholder='Code'
                              style={styles.inputs}
                              value={this.state.password}
                              secureTextEntry={true}
                              onChangeText={password => this.setState({ password: password })}
                              iconContent={
                                <Icon
                                  size={16}
                                  color='#ADB5BD'
                                  name='caps-small2x'
                                  family='NowExtra'
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                        </Block>
                        <Block center>
                          <Button
                            color='primary'
                            round
                            style={styles.createButton}
                            onPress={this.onLogin}
                          >
                            <Text
                              style={{ fontFamily: 'montserrat-bold' }}
                              size={14}
                              color={nowTheme.COLORS.WHITE}
                            >
                              Login
                            </Text>
                          </Button>
                          <Button
                            color='primary'
                            round
                            style={styles.createButton}
                            onPress={this.onRegister}
                          >
                            <Text
                              style={{ fontFamily: 'montserrat-bold' }}
                              size={14}
                              color={nowTheme.COLORS.WHITE}
                            >
                              Register
                            </Text>
                          </Button>
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </Block>
          </ImageBackground>
        </Block>
      </DismissKeyboard>
    )
  }
}

const styles = StyleSheet.create({
  imageBackgroundContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  imageBackground: {
    width: width,
    height: height
  },
  registerContainer: {
    marginTop: 55,
    width: width * 0.9,
    height: height < 812 ? height * 0.8 : height * 0.8,
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 4,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: 'hidden'
  },
  socialConnect: {
    backgroundColor: nowTheme.COLORS.WHITE
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderColor: "rgba(136, 152, 170, 0.3)"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: '#fff',
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: nowTheme.COLORS.PRIMARY,
    fontWeight: '800',
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5
  },
  passwordCheck: {
    paddingLeft: 2,
    paddingTop: 6,
    paddingBottom: 15
  },
  createButton: {
    width: width * 0.5,
    marginTop: 45,
    marginBottom: 0
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
    marginHorizontal: 10
  }
})

export default Login
