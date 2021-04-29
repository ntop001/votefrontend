import React from 'react'
import './button.css'

export default class Button extends React.Component {
    render() {
        const type = this.props.type || "green"
        return (
            <button onClick={this.props.onClick} {...this.props} type="button" className={`button button-${type}`}>
                {this.props.icon}
                {this.props.children && (
                    <span>{this.props.children}</span>
                )}
                {this.props.righticon}
            </button>
        )
    }
}