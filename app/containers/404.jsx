import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

class NotFound extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
          <div>
            <img src="https://fthmb.tqn.com/4qMvIZ33Qlf6S9rdbLA-0JZF6rU=/768x0/filters:no_upscale()/shutterstock_325494917-5a68d8403418c600190a3e1f.jpg" width="100%" height="100%" />
          </div>
        )
    }
}

export default NotFound
