import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class CityList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div className="city-list-container">
                <h3>Choose Your City: </h3>
                <ul className="clear-fix">
                    <li>
                        <span onClick={this.clickHandle.bind(this, 'Ottawa')}>Ottawa</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandle.bind(this, 'Toronto')}>Toronto</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandle.bind(this, 'Montreal')}>Montreal</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandle.bind(this, 'Gatineau')}>Gatineau</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandle.bind(this, 'Kanata')}>Kanata</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandle.bind(this, 'Kingston')}>Kingston</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandle.bind(this, 'Calgary')}>Calgary</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandle.bind(this, 'Winnipeg')}>Winnipeg</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandle.bind(this, 'Vancouver')}>Vancouver</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandle.bind(this, 'Oshawa')}>Oshawa</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandle.bind(this, 'London')}>London</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandle.bind(this, 'Edmonton')}>Edmonton</span>
                    </li>
                </ul>
            </div>
        )
    }
    clickHandle(cityName) {
        const changeFn = this.props.changeFn
        changeFn(cityName)
    }
}

export default CityList
