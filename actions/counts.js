import { ARTICLE_DETAIL } from '../constants/actions'

function OnArticleDetails (item) {
  return {
    type: ARTICLE_DETAIL,
    payload: item
  }
}

const actionCreators = {
  OnArticleDetails,
}

export { actionCreators }
