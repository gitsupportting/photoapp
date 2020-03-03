import React from 'react'
import axios from 'axios'
import { StyleSheet, Dimensions, ScrollView } from 'react-native'
import { Block, theme, Text } from 'galio-framework'

import { Card, Button } from '../components'

const { width } = Dimensions.get('screen')
class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      articleList: []
    }
  }
  componentDidMount () {
    this.getArticleList()
  }

  getArticleList = () => {
    axios.get('http://165.227.81.153:3005/getdata/articles').then(res => {
      const articleList = res.data
      let articleListTemp = []
      for (let i = 0; i < articleList.length; i++) {
        if (articleList[i].status_b !== '3') {
          articleListTemp.push(articleList[i])
        }
      }
      this.setState({ articleList: articleListTemp })
    })
  }

  renderArticles = article => {
    return <Card item={article} horizontal />
  }

  render () {
    const { articleList } = this.state
    return (
      <Block flex center style={styles.home}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.articles}>
          <Block flex center style={styles.home}>
            {articleList.map(article => this.renderArticles(article))}
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
  }
})

export default Home
