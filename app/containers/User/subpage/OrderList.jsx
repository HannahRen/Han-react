import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getOrderListData, postComment } from '../../../fetch/user/orderlist'

import OrderListComponent from '../../../components/OrderList'

import './style.less'

class OrderList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            data: []
        }
    }
    render() {
        return (
            <div className="order-list-container">
                <h2>Your Orders</h2>
                {
                    this.state.data.length
                    ? <OrderListComponent data={this.state.data} submitComment={this.submitComment.bind(this)}/>
                    : <div>Loading ... </div>
                }
            </div>
        )
    }
    componentDidMount() {
        // get order data
        const username = this.props.username
        if (username) {
            this.loadOrderList(username)
        }
    }
    loadOrderList(username) {
        const result = getOrderListData(username)
        result.then(res => {
            return res.json()
        }).then(json => {
            this.setState({
                data: json
            })
        }).catch(ex => {
            if (__DEV__) {
                console.error('Something wrong in getting order list, ', ex.message)
            }
        })
    }
    // submit comment
    submitComment(id , value, star, callback) {
        const result = postComment(id, value, star)
        result.then(res => {
            return res.json()
        }).then(json => {
            if (json.errno === 0) {
                // submit comment and refresh
                callback()
            }
        })
    }
}

export default OrderList
