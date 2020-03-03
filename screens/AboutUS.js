import React from 'react'
import { ScrollView, StyleSheet, Dimensions } from 'react-native'
import axios from 'axios'
//galio
import { Block, Text, theme } from 'galio-framework'
import { nowTheme } from '../constants/'
import { Card } from '../components/'
import { connect } from 'react-redux'
const { width } = Dimensions.get('screen')

class AboutUS extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      articleList: null
    }
  }

  componentDidMount () {
    this.getArticleList()
  }

  getArticleList = () => {
    axios.get('http://165.227.81.153:3005/getdata/aboutusDetail').then(res => {
      articleList = res.data
      if (articleList.status_b === '3') {
        this.setState({
          articleList: articleList
        })
      }
    })
  }

  renderCards = articleList => {
    return (
      <Block style={styles.container}>
        <Card item={articleList} full />
      </Block>
    )
  }

  render () {
    if (this.state.articleList != null) {
      return (
        <Block flex>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.articles}>
            {this.renderCards(this.state.articleList)}
          </ScrollView>
        </Block>
      )
    } else {
      return <Block></Block>
    }
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
    width: width,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular'
  }
})
function mapStateToProps (state) {
  const { ArticleDetail } = state
  return {
    ArticleDetail
  }
}
export default connect(mapStateToProps, null)(AboutUS)
