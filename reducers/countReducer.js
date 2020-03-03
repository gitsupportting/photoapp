import { ARTICLE_DETAIL } from '../constants/actions'

const TIMER_DURATION = 6

//initial state

const initialState = {
  ArticleDetail: {}
}

//Helper Functions

function applyArticleDetail (state, payload) {
  return {
    ...state,
    ArticleDetail: payload
  }
}

function reducer (state = initialState, action) {
  switch (action.type) {
    case ARTICLE_DETAIL:
      return applyArticleDetail(state, action.payload)
    default:
      return state
  }
}
export default reducer
