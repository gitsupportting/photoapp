import React from 'react'
import { ScrollView, StyleSheet, Dimensions } from 'react-native'
//galio
import { Block, Text, theme } from 'galio-framework'
import { articles, nowTheme } from '../constants/'
import { Card } from '../components/'
import { connect } from 'react-redux'
import { Button } from '../components'
const { width } = Dimensions.get('screen')
class Articles extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {}

  renderCards = item => {
    return (
      <Block style={styles.container}>
        {/* <Text size={16}>
          {item.title}
        </Text> */}
        <Card item={item} full />
      </Block>
    )
  }

  render () {
    const {
      navigation,
      ArticleDetail,
      horizontal,
      full,
      style,
      ctaColor,
      imageStyle,
      ctaRight,
      titleStyle
    } = this.props
    return (
      <Block flex>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.articles}>
         {this.renderCards(ArticleDetail)}
        </ScrollView>
      </Block>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.SIZES.BASE
  },
  title: {
    fontFamily: 'montserrat-bold',
    paddingBottom: theme.SIZES.BASE,
    marginTop: 44,
    color: nowTheme.COLORS.HEADER
  },
  smallButton: {
    width: 75,
    height: 28
  },
  articles: {
    // width: width - theme.SIZES.BASE * 2,
    width:width,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular',   
  },
})
function mapStateToProps (state) {
  const { ArticleDetail } = state
  return {
    ArticleDetail
  }
}
export default connect(mapStateToProps, null)(Articles)
