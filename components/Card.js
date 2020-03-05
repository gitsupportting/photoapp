import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import PropTypes, { func } from 'prop-types'
import { StyleSheet, Image, TouchableWithoutFeedback, WebView, Dimensions } from 'react-native'
import { Block, Text, theme } from 'galio-framework'
import { nowTheme } from '../constants'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators as actions } from '../actions/counts'
import { Button } from '../components'
let { width, height } = Dimensions.get('window')
let descriptionHeight;
class Card extends Component {
  componentDidMount() {
    if (width / height <= 0.563) {
      descriptionHeight = 0.5 * height
    } else {
      descriptionHeight = 0.4 * height
    }
  }
  OnArticleDetails(item) {
    this.props.navigation.navigate('Articles')
    this.props.OnArticleDetails(item)
  }
  render() {
    const {
      navigation,
      item,
      horizontal,
      full,
      style,
      ctaColor,
      imageStyle,
      ctaRight,
      titleStyle
    } = this.props
    const imageStyles = [full ? styles.fullImage : styles.horizontalImage, imageStyle]
    const titleStyles = [styles.cardTitle, titleStyle]
    const cardContainer = [styles.card, styles.shadow, style]
    const imgContainer = [
      styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow
    ]
    if (full === undefined) {
      return (
        <Block row={horizontal} card flex style={cardContainer}>
          <TouchableWithoutFeedback onPress={() => this.OnArticleDetails(item)}>
            <Block flex style={imgContainer}>
              <Image
                resizeMode='cover'
                source={{
                  uri:
                    'http://165.227.81.153:3005/uploads/articles/' +
                    item.article_id +
                    '/' +
                    item.mainImage
                }}
                style={imageStyles}
              />
            </Block>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.OnArticleDetails(item)}>
            <Block flex space='between' style={styles.cardDescription}>
              <Block flex>
                <Text
                  style={{ fontFamily: 'montserrat-regular' }}
                  size={14}
                  style={titleStyles}
                  color={nowTheme.COLORS.SECONDARY}
                >
                  {item.title}
                </Text>
              </Block>
              <Block right>
                <Text
                  style={styles.articleButton}
                  size={12}
                  muted={!ctaColor}
                  color={ctaColor || nowTheme.COLORS.ACTIVE}
                  bold
                >
                  View Article
                </Text>
              </Block>
            </Block>
          </TouchableWithoutFeedback>
        </Block>
      )
    } else {
      return (
        <Block row={horizontal} card flex style={cardContainer}>
          <Block flex>
            <Text
              style={{ fontFamily: 'montserrat-regular' }}
              size={18}
              style={titleStyles}
              color={nowTheme.COLORS.SECONDARY}
            >
              {item.title}
            </Text>
          </Block>
          <TouchableWithoutFeedback>
            <Block flex style={imgContainer}>
              <Image
                resizeMode='cover'
                source={{
                  uri:
                    'http://165.227.81.153:3005/uploads/articles/' +
                    item.article_id +
                    '/' +
                    item.mainImage
                }}
                style={imageStyles}
              />
            </Block>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <Block flex space='between' style={styles.cardDescription}>
              <Block flex>
                <WebView
                  useWebKit={true}
                  style={{
                    fontFamily: 'montserrat-regular',
                    textAlign: 'center',
                    padding: 15,
                    height: descriptionHeight,
                  }}
                  startInLoadingState={true}

                  source={{html: '<head><meta name="viewport" content="width=device-width, initial-scale=1"></head><body>'+item.content}}
                />
              </Block>
            </Block>
          </TouchableWithoutFeedback>
        </Block>
      )
    }
  }
}

Card.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
  ctaRight: PropTypes.bool,
  titleStyle: PropTypes.any,
  textBodyStyle: PropTypes.any
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 4
  },
  cardTitle: {
    paddingHorizontal: 9,
    paddingTop: 7,
    paddingBottom: 15
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden'
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 122,
    width: 'auto'
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  fullImage: {
    height: 215
  },
  shadow: {
    shadowColor: '#8898AA',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2
  },
  articleButton: {
    fontFamily: 'montserrat-bold',
    paddingHorizontal: 9,
    paddingVertical: 7
  },
  smallButton: {
    width: 75,
    height: 28
  }
})

function mapStateToProps(state) {
  const { ArticleDetail } = state
  return {
    ArticleDetail
  }
}
function mapDispatchToProps(dispatch) {
  return {
    OnArticleDetails: bindActionCreators(actions.OnArticleDetails, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Card))
// export default withNavigation(Card)
