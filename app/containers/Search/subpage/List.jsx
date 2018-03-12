import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'

import ListComponent from '../../../components/List'
import LoadMore from '../../../components/LoadMore'

import { getSearchData } from '../../../fetch/search/search'

const initialState = {
  data: [],
  hasMore: false,
  isLoadingMore: false,
  page: 1
}
class SearchList extends React.Component {
  constructor(props, context) {
      super(props, context);
      this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
      this.state = initialState
  }
  render() {
    return (
      <div>
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
    const cityName = this.props.userinfo.cityName
    const keyword = this.props.keyword || ''
    const category = this.props.category
    const result = getSearchData(0, cityName, category, keyword)
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
      if (__DEV__) {
        console.error('Something wrong getting search list, ', ex.message)
      }
    })
  }
  loadMoreData() {
    this.setState({
      isLoadingMore: true
    })
    const cityName = this.props.userinfo.cityName
    const page = this.state.page
    const keyword = this.props.keyword || ''
    const category = this.props.category
    const result = getSearchData(page, cityName, category, keyword)
    this.resultHandle(result)

    this.setState({
      isLoadingMore: false,
      page: page + 1
    })
  }

  // deal with repeat Search
  componentDidUpdate(prevProps, prevState) {
    const keyword = this.props.keyword
    const category = this.props.category

    if (keyword === prevProps.keyword && category === prevProps.category) {
      return
    }

    this.setState(initialState)

    this.loadFirstPageData()
  }
}

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchList)
