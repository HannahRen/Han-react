import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ReactSwipe from 'react-swipe'
import { Link } from 'react-router'

import './style.less'

class Category extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
        index: 0,
        data: []
    }
  }
  render() {
    const opt = {
      auto: 2500,
      callback: index => {
        this.setState({
          index: index
        })
      }
    }
    return (
      <div id="home-category">
        <ReactSwipe swipeOptions={opt}>
          <div className="carousel-item">
            <ul className="clear-fix">
              <Link to="/search/restaurant"><li className="float-left restaurant">Restaurants</li></Link>
              <Link to="/search/bar"><li className="float-left bar">Bars</li></Link>
              <Link to="/search/coffee"><li className="float-left coffee">Coffee</li></Link>
              <Link to="/search/shopping"><li className="float-left shopping">Shopping</li></Link>
              <Link to="/search/gas"><li className="float-left gas">Gas Station</li></Link>
              <Link to="/search/travel"><li className="float-left travel">Travel</li></Link>
              <Link to="/search/drugstore"><li className="float-left drugstore">Drugstores</li></Link>
              <Link to="/search/hotel"><li className="float-left hotel">Hotels</li></Link>
            </ul>
          </div>
          <div className="carousel-item">
            <ul className="clear-fix">
              <Link to="/search/restaurant"><li className="float-left restaurant">Restaurants</li></Link>
              <Link to="/search/bar"><li className="float-left bar">Bars</li></Link>
              <Link to="/search/coffee"><li className="float-left coffee">Coffee</li></Link>
              <Link to="/search/shopping"><li className="float-left shopping">Shopping</li></Link>
              <Link to="/search/gas"><li className="float-left gas">Gas Station</li></Link>
              <Link to="/search/travel"><li className="float-left travel">Travel</li></Link>
              <Link to="/search/drugstore"><li className="float-left drugstore">Drugstores</li></Link>
              <Link to="/search/hotel"><li className="float-left hotel">Hotels</li></Link>
            </ul>
          </div>
          <div className="carousel-item">
            <ul className="clear-fix">
              <Link to="/search/restaurant"><li className="float-left restaurant">Restaurants</li></Link>
              <Link to="/search/bar"><li className="float-left bar">Bars</li></Link>
              <Link to="/search/coffee"><li className="float-left coffee">Coffee</li></Link>
              <Link to="/search/shopping"><li className="float-left shopping">Shopping</li></Link>
              <Link to="/search/gas"><li className="float-left gas">Gas Station</li></Link>
              <Link to="/search/travel"><li className="float-left travel">Travel</li></Link>
              <Link to="/search/drugstore"><li className="float-left drugstore">Drugstores</li></Link>
              <Link to="/search/hotel"><li className="float-left hotel">Hotels</li></Link>
            </ul>
          </div>
        </ReactSwipe>
        <div className="index-container">
          <ul>
            <li className={this.state.index === 0 ? "selected" : ''}></li>
            <li className={this.state.index === 1 ? "selected" : ''}></li>
            <li className={this.state.index === 2 ? "selected" : ''}></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Category
