import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { postComment } from '../../../fetch/user/orderlist.js'
import Star from '../../Star'

import './style.less'

class Item extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            commentState: 2,  // commentState  0-no comment 1-submmiting 2-done
            stars: 0
        }
    }
    render() {
        const data = this.props.data

        return (
            <div className="order-item-container">
                <div className="clear-fix">
                    <div className="order-item-img float-left">
                        <img src={data.img}/>
                    </div>
                    <div className="order-item-comment float-right">
                        {
                            this.state.commentState === 0
                            // no comment
                            ? <button className="btn" onClick={this.showComment.bind(this)}>Review</button>
                            :
                                this.state.commentState === 1
                                // submmiting
                                ? ''
                                // done
                                : <button className="btn unseleted-btn">Done</button>
                        }
                    </div>
                    <div className="order-item-content">
                        <span>Business: {data.title}</span>
                        <span>Quantity: {data.count}</span>
                        <span>Price: ${data.price}</span>
                    </div>
                </div>
                {
                    // input modal
                    this.state.commentState === 1
                    ? <div className="comment-text-container">
                        <textarea style={{width: '100%', height: '80px', border: '1px solid rgb(233, 32, 61)'}} className="comment-text" ref="commentText"></textarea>
                        <div style={{paddingTop: '10px', paddingBottom: '10px'}}>
                            <Star star="0" clickCallback={this.starClickCallback.bind(this)}/>
                        </div>
                        <button className="btn" onClick={this.submit.bind(this)}>Submit</button>
                        &nbsp;
                        <button className="btn unseleted-btn" onClick={this.hideComment.bind(this)}>Cancel</button>
                    </div>
                    : ''
                }
            </div>
        )
    }
    componentDidMount() {
        this.setState({
            commentState: this.props.data.commentState
        })
    }
    showComment() {
      //show comment modal
        this.setState({
            commentState: 1
        })
    }
    submit() {
        const submitComment = this.props.submitComment
        const id = this.props.data.id
        const star = this.state.star
        const commentText = this.refs.commentText
        const value = commentText.value.trim()
        if (!value) {
          alert("Please input your review!")
          return
        }

        submitComment(id, value, star, this.commentOk.bind(this, value, star))
    }
    commentOk(value, star) {
        // submit comment, change the state
        this.setState({
            commentState: 2
        })
        alert('Submit successfully, and your comment: ' + value + ', star rating: ' + star)
    }
    hideComment() {
        // hide comment modal
        this.setState({
            commentState: 0
        })
    }
    starClickCallback(star) {
        this.setState({
            star: star
        })
    }
}

export default Item
