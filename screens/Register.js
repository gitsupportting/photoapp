import React from 'react'
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import { Block, Checkbox, Text, Button as GaButton, theme } from 'galio-framework'
import axios from 'axios'
import { Button, Icon, Input } from '../components'
import { Images, nowTheme } from '../constants'

const { width, height } = Dimensions.get('screen')

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
)
class Register extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    }
  }
  onLogin = () => {
    this.props.navigation.navigate('Login')
  }
  onRegister = () => {
    if (this.state.name === '') {
      alert('Insert your name')
      return
    }
    if (this.state.email === '') {
      alert('Insert your email')
      return
    }
    if (this.state.phone === '') {
      alert('Insert your phone number')
      return
    }
    if (this.state.password === '') {
      alert('Insert your password')
      return
    }
    if (this.state.confirmPassword === '') {
      alert('Insert your confirmPassword')
      return
    }
    if (this.state.password === this.state.confirmPassword) {
      axios
        .post(`http://165.227.81.153:3005/users/signup`, {
          name: this.state.name,
          email: this.state.email,
          phone: this.state.phone,
          password: this.state.password,
          role: 2
        })
        .then(res => {
          if (res.data.result) {
            this.props.navigation.navigate('Login')
          }
        })
        .catch(error => {
          console.warn(error)
        })
    } else {
      alert('Retype Password')
      return
    }
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
                  <Block flex={0.2} middle style={styles.socialConnect}>
                    <Text
                      style={{
                        fontFamily: 'montserrat-regular',
                        textAlign: 'center'
                      }}
                      color='#333'
                      size={24}
                    >
                      Register
                    </Text>
                  </Block>
                  <Block flex={1} middle space='between'>
                    <Block center flex={0.9}>
                      <Block flex space='between'>
                        <Block>
                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                            <Input
                              placeholder='Name'
                              autoCapitalize='none'
                              style={styles.inputs}
                              value={this.state.name}
                              onChangeText={name => this.setState({ name: name })}
                              iconContent={
                                <Icon
                                  size={16}
                                  color='#ADB5BD'
                                  name='profile-circle'
                                  family='NowExtra'
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                          <Block width={width * 0.8}>
                            <Input
                              placeholder='Email'
                              autoCapitalize='none'
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
                              placeholder='Phone Number'
                              autoCapitalize='none'
                              style={styles.inputs}
                              value={this.state.phone}
                              onChangeText={phone => this.setState({ phone: phone })}
                              iconContent={
                                <Icon
                                  size={16}
                                  color='#ADB5BD'
                                  name='headphones-22x'
                                  family='NowExtra'
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                            <Input
                              placeholder='Password'
                              autoCapitalize='none'
                              style={styles.inputs}
                              value={this.state.password}
                              onChangeText={password => this.setState({ password: password })}
                              secureTextEntry={true}
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
                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                            <Input
                              placeholder='Retype Password'
                              autoCapitalize='none'
                              style={styles.inputs}
                              value={this.state.confirmPassword}
                              onChangeText={confirmPassword =>
                                this.setState({ confirmPassword: confirmPassword })
                              }
                              secureTextEntry={true}
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
                          <Button
                            color='primary'
                            round
                            style={{ marginTop: 0 }}
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
    marginTop: 25
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
    marginHorizontal: 10
  }
})

export default Register
