import React from 'react'
import { branch } from 'baobab-react/higher-order'
import styles from './index.module.css'

import {
    getTenantList, updateTenant
} from 'service/utils/tenant'
import {
    formatTime
} from 'service/utils/util'

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

    componentDidMount() {
        this.props.dispatch(getTenantList)
    }

    render() {
        const ListItem = ({item}) => {
            return (
                <div className={styles.listitem}>
                    <div className={styles.title}><h3>公司名：{item.name} </h3> <a href="#/" className={styles.edit}>充值</a> </div>
                    <p>域名：<a href="#/">{item.subdomain}.qingjucrm.com</a></p>
                    <p>
                        付费计划: {item.plan}, 席位: {item.seats}, 到期时间：{formatTime(item.due_time)}
                    </p>
                    <p>
                        创建时间：{formatTime(item.created_at)}, 最后更新时间: {formatTime(item.updated_at)}
                    </p>
                </div>
            )
        }
        const { tenants = []} = this.props
        return (
            <div className={styles.page}>
                <div className={styles.search}>
                    搜索： <input name="name" onChange={this.handleInputChange} /> <button type="button" onClick={this.handleSearch} >搜索</button>
                </div>
                <div className={styles.datalist}>
                    {tenants.map( item => {
                        return <ListItem key={item.id} item={item}/>
                    })}
                </div>
            </div>
        )
    }
}
const binding = {
    tenants: ["tenantPage", "data"]
}
export default branch(binding, TenantPage)