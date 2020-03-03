import React from 'react'
import axios from 'axios'
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  AsyncStorage,
  TouchableWithoutFeedback
} from 'react-native'
import { Block, theme, Text } from 'galio-framework'
import { Container, Content, List, ListItem, Left, Right, Icon } from 'native-base'
import { Card, Button } from '../components'
import { nowTheme } from '../constants/'

const { width } = Dimensions.get('screen')
class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      GalleryNames: [],
      GalleryIds: [],
      token: ''
    }
  }
  componentDidMount () {
    AsyncStorage.getItem('userData').then(userData => {
      if (userData === null || userData==='null') {
        this.props.navigation.navigate('Login')
      } else {
        this.setState(
          {
            token: JSON.parse(userData).token
          },
          () => {
            this.onLogin()
          }
        )
      }
    })
    this.getGalleryList();
  }
  onLogin () {
    const { token } = this.state
    const options = {
      headers: {
        'x-pos-user-token': token,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    const url = `http://165.227.81.153:3005/files/images`
    axios.get(url, options).then(res => {
      if (res.data === 'Invalid token') {
        this.props.navigation.navigate('Login')
      }
    })
  }
  getGalleryList = () => {
    let token, userId
    AsyncStorage.getItem('userData').then(userData => {
      token = JSON.parse(userData).token
      userId = JSON.parse(userData).userId
    })
    setTimeout(() => {
      const headers = {
        'Content-Type': 'application/json',
        'x-pos-user-token': token
      }
      axios
        .post(
          `http://165.227.81.153:3005/getdata/galleries`,
          { user_id: userId },
          { headers: headers }
        )
        .then(res => {
          if (res.data === 'Invalid token') {
            this.props.navigation.navigate('Login')
          }
          var GalleryNames_temp = res.data
          var GalleryNames = []
          var GalleryIds = []
          for (let i = 0; i < GalleryNames_temp.length; i++) {
            GalleryNames[i] = GalleryNames_temp[i].GalleryName
            GalleryIds[i] = GalleryNames_temp[i].gallery_id
          }
          this.setState({
            GalleryNames: GalleryNames,
            GalleryIds: GalleryIds
          })
        })
    }, 100)
  }

  renderGalleries = GalleryId => {
    let GalleryName
    const { titleStyle } = this.props
    const titleStyles = [styles.cardTitle, titleStyle]
    for (let i = 0; i < this.state.GalleryIds.length; i++) {
      if (this.state.GalleryIds[i] === GalleryId) {
        GalleryName = this.state.GalleryNames[i]
        break
      }
    }
    return (
      <TouchableWithoutFeedback onPress={() => this.onImages(GalleryId)}>
        <Block flex>
          <Text
            style={{ fontFamily: 'montserrat-regular' }}
            size={20}
            style={titleStyles}
            color={nowTheme.COLORS.SECONDARY}
          >
            {GalleryName}
          </Text>
        </Block>
      </TouchableWithoutFeedback>
    )
  }
  onImages = GalleryId => {
    AsyncStorage.setItem('GalleryId', GalleryId)
    setTimeout(() => {
      this.props.navigation.navigate('GImages')
    }, 100)
  }
  render () {
    const { GalleryIds } = this.state
    return (
      <Block flex style={styles.home}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.articles}>
          <Block flex style={styles.home}>          
            {GalleryIds.map(GalleryId => this.renderGalleries(GalleryId))}
          </Block>
        </ScrollView>
      </Block>
    )
  }
}

const styles = StyleSheet.create({
  home: {
    width: width
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular'
  },
  smallButton: {
    width: 75,
    height: 28
  },
  cardTitle: {
    paddingHorizontal: 9,
    paddingTop: 7,
    paddingBottom: 15
  }
})

export default Home
