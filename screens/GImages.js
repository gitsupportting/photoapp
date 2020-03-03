import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  AsyncStorage,
  TouchableWithoutFeedback
} from 'react-native'
import axios from 'axios'
// Galio components
import { Block, Text, Button as GaButton, theme } from 'galio-framework'

// Now UI themed components
import { Images, nowTheme } from '../constants'
import { Button, Header, Switch } from '../components'
import { $CombinedState } from 'redux'

const { width } = Dimensions.get('screen')

const thumbMeasure = (width - 48 - 32) / 3

class GImages extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      'switch-2': false,
      GalleryId: '',
      token: '',
      user_id: '',
      imagesources: [],
      imagesources_id: [],
      imagesources_id_set: [],
      setAllImages: false,
      isUploaded: false
    }
  }
  componentDidMount () {
    AsyncStorage.getItem('userData').then(userData => {
      this.setState({
        token: JSON.parse(userData).token,
        user_id: JSON.parse(userData).userId
      })
    })

    AsyncStorage.getItem('GalleryId').then(res => {
      this.setState(
        {
          GalleryId: res
        },
        () => {
          this.getImages(this.state.GalleryId, this.state.token, this.state.user_id)
        }
      )
    })
  }

  getImages = (GalleryId, token, user_id) => {
    const options = {
      headers: {
        'x-pos-user-token': token,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    const url = `http://165.227.81.153:3005/files/images`
    axios.get(url, options).then(res => {
      if (res.data === 'Invalid token') {
        this.props.navigation.navigate('Home')
      }
      var usersDatas = res.data
      if (usersDatas.length > 0) {
        var imagesource_temp = [],
          imagesource_temp_id = [],
          imagesources_id_set = []
        let j = 0
        for (let i = 0; i < usersDatas.length; i++) {
          if (
            usersDatas[i].user_id === user_id &&
            usersDatas[i].gallery_id === GalleryId &&
            usersDatas[i].imageStatus !== true
          ) {
            imagesource_temp[j] = usersDatas[i].filename
            imagesource_temp_id[j] = usersDatas[i].image_id
            imagesources_id_set[j] = false
            j = j + 1
          }
        }
      }
      this.setState({
        imagesources: imagesource_temp,
        imagesources_id: imagesource_temp_id,
        imagesources_id_set: imagesources_id_set,
        isUploaded: true
      })
    })
  }

  renderSwitches = () => {
    return (
      <Block row space='between' style={{ margin: 20, marginTop: 20, marginBottom: 20 }}>
        <Block row middle left space='between'>
          <Text style={{ fontFamily: 'montserrat-regular' }} size={14} color={nowTheme.COLORS.TEXT}>
            Select All
          </Text>
          <Switch value={this.state.setAllImages} onValueChange={() => this.onSelectAllImage()} />
        </Block>
        <Block flex right>
          <Button
            textStyle={{ fontFamily: 'montserrat-regular', fontSize: 15 }}
            center
            color='info'
            shadowless
            style={styles.smallButton}
            onPress={() => this.onConfirm()}
          >
            Confirm
          </Button>
        </Block>        
      </Block>
    )
  }
  onSelectAllImage () {
    let imagesources_id_set_temp = []
    this.setState(
      {
        setAllImages: !this.state.setAllImages
      },
      () => {
        if (this.state.setAllImages) {
          for (let i = 0; i < this.state.imagesources_id_set.length; i++) {
            imagesources_id_set_temp[i] = true
          }
          this.setState({ imagesources_id_set: imagesources_id_set_temp })
        } else {
          for (let i = 0; i < this.state.imagesources_id_set.length; i++) {
            imagesources_id_set_temp[i] = false
          }
          this.setState({ imagesources_id_set: imagesources_id_set_temp })
        }
      }
    )
  }
  renderAlbums = imagesource => {
    let imagesource_id, imagesource_id_setted
    for (let i = 0; i < this.state.imagesources.length; i++) {
      if (this.state.imagesources[i] === imagesource) {
        imagesource_id = this.state.imagesources_id[i]
        imagesource_id_setted = this.state.imagesources_id_set[i]
        break
      }
    }
    return (
      <Block>
        <Switch
          value={imagesource_id_setted}
          onValueChange={() => this.OnSelectImage(imagesource_id)}
        />
        <TouchableWithoutFeedback
          key={`viewed-${imagesource}`}
          style={styles.shadow}
          onPress={() => this.OnSelectImage(imagesource_id)}
        >
          <Image
            resizeMode='cover'
            source={{
              uri:
                'http://165.227.81.153:3005/uploads/' +
                this.state.user_id +
                '/' +
                this.state.GalleryId +
                '/' +
                imagesource
            }}
            style={styles.albumThumb}
          />
        </TouchableWithoutFeedback>
      </Block>
    )
  }
  OnSelectImage (imagesource_id) {
    let imagesources_id_set_temp = []
    for (let i = 0; i < this.state.imagesources_id_set.length; i++) {
      if (this.state.imagesources_id[i] === imagesource_id) {
        imagesources_id_set_temp[i] = !this.state.imagesources_id_set[i]
      } else {
        imagesources_id_set_temp[i] = this.state.imagesources_id_set[i]
      }
    }
    this.setState({
      imagesources_id_set: imagesources_id_set_temp
    })
  }

  onConfirm () {
    const { imagesources_id, imagesources_id_set, token, GalleryId, user_id } = this.state
    const url = 'http://165.227.81.153:3005/getdata/setImages'
    const headers = {
      'Content-Type': 'application/json',
      'x-pos-user-token': token
    }
    axios
      .post(
        url,
        {
          imagesources_id: imagesources_id,
          imagesources_id_set: imagesources_id_set,
          gallery_id: GalleryId,
          user_id: user_id
        },
        { headers: headers }
      )
      .then(res => {
        // if (res.data === 'Invalid token') {
        //   this.props.navigation.navigate('Home')
        // }
        if (res.data) {
          this.getImages(this.state.GalleryId, this.state.token, this.state.user_id)
        }
      })
  }

  render () {
    const { imagesources } = this.state
    return (
      <Block flex center>
        {/* <Block row space='between' style={{ margin: 10, marginBottom: 0, marginTop:50 }}>
          <Block flex left>
            <Text size={20} style={styles.title}>
              Images
            </Text>
          </Block>
          <Block flex right>
            <Button
              textStyle={{ fontFamily: 'montserrat-regular', fontSize: 15 }}
              center
              color='info'
              shadowless
              style={styles.smallButton}
              onPress={() => this.props.navigation.navigate('Galleries')}
            >
              Galleries
            </Button>
          </Block>
        </Block> */}
        {this.renderSwitches()}
        {imagesources != [] && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
          >
            <Block flex style={[styles.group, { paddingBottom: theme.SIZES.BASE * 5 }]}>
              <Block
                row
                space='between'
                style={{ marginTop: theme.SIZES.BASE * 0, flexWrap: 'wrap' }}
              >
                {imagesources.map((imagesource, index) => this.renderAlbums(imagesource))}
              </Block>
            </Block>
          </ScrollView>
        )}
      </Block>
    )
  }
}

const styles = StyleSheet.create({
  smallButton: {
    width: 75,
    height: 28
  },
  group: {
    // paddingTop: theme.SIZES.BASE * 2
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 2
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2
  },
  albumThumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure
  }
})

export default GImages
