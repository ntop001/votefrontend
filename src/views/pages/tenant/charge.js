import React from 'react'
import styles from './charge.module.css'
import { Modal } from 'views/comps'

export default class ChargeModal extends React.Component {
    state = {
        plan: "solo", seats: 0, days: 0, 
    }

    handleInputChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleSubmit = () => {
        const { plan, seats, days } = this.state
        const data = {
            plan, seats: parseInt(seats) || 0, days: parseInt(days) || 0,
        }
        if(window.confirm(`账户修改, 付费方案:${plan}, 人数: ${seats}, 天数: ${days}`)) {
            this.props.onSubmit && this.props.onSubmit(data)
        }
    }

    componentDidUpdate() {
        if (this.state.item !== this.props.item) {
            const { item } = this.props
            this.setState({item, plan: item.plan, seats: item.seats, days: 0})
        }
    }

    render() {
        const { show, onRequestClose } = this.props
        const { plan, seats, days } = this.state
        return (
            <Modal title="账户充值" show={show} onRequestClose={onRequestClose} onSubmit={this.handleSubmit}>
                <div className={styles.body}>
                    <select name="plan" value={plan} onChange={this.handleInputChange}>
                        <option value="solo">小微版</option>
                        <option value="basic">标准版</option>
                    </select>
                    <input name="seats" value={seats} placeholder="席位数.." onChange={this.handleInputChange}/>
                    <input name="days" value={days} placeholder="充值天数.." onChange={this.handleInputChange}/>
                </div>
            </Modal>
        )
    }
}