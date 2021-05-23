import React from 'react'
import { branch } from 'baobab-react/higher-order'
import styles from './index.module.css'
import ChargeModal from './charge'
import DataList from './datalist'

import {
    getTenantList, getMoreTenant, updateTenant
} from 'service/utils/tenant'

class TenantPage extends React.Component {
    state = {
        query: {}
    }

    handleInputChange = (e) => {
        const { name, value } = e.target
        this.setState({query: {...this.state.query, [name]: value }})
    }

    handleSearch = () => {
        this.setState({query: {...this.state.query, page: 1 }}, () => {
            this.props.dispatch(getTenantList, this.state.query)
        })
    }

    handleCharge = (item) => {
        this.setState({ show: true, current: item })
    }

    handleChargeSubmit = (data) => {
        const { current } = this.state
        if (current) {
            this.props.dispatch(updateTenant, current.id, data).then( () => {
                this.setState({show: false })
            })
        }
    }

    handleMore = () => {
        this.props.dispatch(getMoreTenant)
    }

    componentDidMount() {
        this.props.dispatch(getTenantList)
    }

    render() {
        const { tenants = [], total} = this.props
        const { show, current } = this.state
        return (
            <div className={styles.page}>
                <div className={styles.search}>
                    <span>租户数：{total}</span>
                    <input name="name" onChange={this.handleInputChange} />
                    <button type="button" onClick={this.handleSearch} >搜索</button>
                </div>
                <div className={styles.datalist}>
                    <DataList data={tenants}/>
                </div>
                <div className={styles.loadmore}>
                    <button onClick={this.handleMore}>加载更多..</button>
                </div>
                <ChargeModal show={show} item={current} onSubmit={this.handleChargeSubmit} onRequestClose={ () => this.setState({show: false})} />
            </div>
        )
    }
}
const binding = {
    tenants: ["tenantPage", "data"],
    total: ["tenantPage", "total"],

}
export default branch(binding, TenantPage)