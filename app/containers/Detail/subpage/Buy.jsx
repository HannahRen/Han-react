import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { hashHistory } from 'react-router'

import * as storeActionsFromFile from '../../../actions/store'

import BuyAndStore from '../../../components/BuyAndStore'

class Buy extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            isStore: false
        }
    }
    render() {
        return (
            <BuyAndStore isStore={this.state.isStore} buyHandle={this.buyHandle.bind(this)} storeHandle={this.storeHandle.bind(this)}/>
        )
    }
    componentDidMount() {
        this.checkStoreState()
    }
    // Saved or not
    checkStoreState() {
        const id = this.props.id
        const store = this.props.store

        store.forEach(item => {
            if (item.id === id) {
                this.setState({
                    isStore: true
                })
                return false
            }
        })
    }
    // login or not
    loginCheck() {
        const id = this.props.id
        const userinfo = this.props.userinfo
        if (!userinfo.username) {
            // After login, it can jump back.
            hashHistory.push('/Login/' + encodeURIComponent('/detail/' + id))
            return false
        }
        return true
    }
    // Buy
    buyHandle() {
        // if not login, return
        const loginFlag = this.loginCheck()
        if (!loginFlag) {
            return
        }

        // Jump to User
        hashHistory.push('/User')
    }
    // Save
    storeHandle() {
        // if not login, return
        const loginFlag = this.loginCheck()
        if (!loginFlag) {
            return
        }

        const id = this.props.id
        const storeActions = this.props.storeActions
        if (this.state.isStore) {
            // if saved, cancel save
            storeActions.remove({id: id})
        } else {
            // if not save, saved
            storeActions.add({id: id})
        }
        this.setState({
            isStore: !this.state.isStore
        })
    }
}

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo,
        store: state.store
    }
}

function mapDispatchToProps(dispatch) {
    return {
        storeActions: bindActionCreators(storeActionsFromFile, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Buy)
