import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getCommentData } from '../../../fetch/detail/detai'

import ListComponent from '../../../components/CommentList'
import LoadMore from '../../../components/LoadMore'

import './style.less'

class Comment extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
        data: [],
        hasMore: false,
        isLoadingMore: false,
        page: 1
    }
  }
  render() {
    return (
      <div className="detail-comment-subpage">
        <h2>Reviews</h2>
        {
          this.state.data.length
          ? <ListComponent data={this.state.data} />
          : <div>Loading ... </div>
        }
        {
          this.state.hasMore
          ? <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)} />
          : ''
        }
      </div>
    )
  }
  componentDidMount() {
    this.loadFirstPageData()
  }
  loadFirstPageData() {
    const id = this.props.id
    const result = getCommentData(0, id)
    this.resultHandle(result)
  }
  resultHandle(result) {
    result.then(res => {
      return res.json()
    }).then(json => {
      const hasMore = json.hasMore
      const data = json.data
      this.setState({
        hasMore: hasMore,
        data: this.state.data.concat(data)
      })
    }).catch(ex => {
      if(__DEV__) {
        console.error('Something error in getting review list, ', ex.message )
      }
    })
  }
  loadMoreData() {
    this.setState({
      isLoadingMore: true
    })
    const id = this.props.id
    const page = this.state.page
    const result = getCommentData(page, id)
    this.resultHandle(result)

    this.setState({
      isLoadingMore: false,
      page: page + 1
    })
  }
}

export default Comment
