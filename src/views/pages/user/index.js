import React from 'react'
import { branch } from 'baobab-react/higher-order'
import styles from './index.module.css'
import DataList from './datalist'
import client from 'service/client'
import { cookieStore } from 'service/utils/util'

import {
    getUserList, getMoreUser
} from 'service/utils/user'

class UserPage extends React.Component {
    state = {
        query: {}
    }

    handleInputChange = (e) => {
        const { name, value } = e.target
        this.setState({query: {...this.state.query, [name]: value }})
    }

    handleSearch = () => {
        this.setState({query: {...this.state.query, page: 1 }}, () => {
            this.props.dispatch(getUserList, this.state.query)
        })
    }

    handleMore = () => {
        this.props.dispatch(getMoreUser)
    }

    handleClickItem = (key, item) => {
        if (key === "login") {
            client.dangerToken({uid: item.id}).then( data => {
                cookieStore.setItem("token", data.access_token)
                return client.getUserTenant(item.id)
            }).then( data => {
                console.log("get tenants: ", data)
                if (data.length === 0) {
                    alert("没有关联任何公司"); return
                }
                var subdomain = data[0].subdomain
                var host = window.location.host
                var url = `http://${subdomain}.${host}/b/deals`
                if (window.confirm("打开链接：" + url)) {
                    window.location = url
                }
            }).catch( err => {
                console.log("handleClickItem error", err);
            })
        }
    }

    componentDidMount() {
        this.props.dispatch(getUserList)
    }

    render() {
        const { users = [], total, hasmore} = this.props
        return (
            <div className={styles.page}>
                <div className={styles.search}>
                    <span>用户数：{total}</span>
                    <input name="name" onChange={this.handleInputChange} />
                    <button type="button" onClick={this.handleSearch} >搜索</button>
                </div>
                <div className={styles.datalist}>
                    <DataList data={users} onClickItem={this.handleClickItem} />
                </div>
                <div className={styles.loadmore}>
                    {hasmore? (
                        <button onClick={this.handleMore}>加载更多..</button>
                    ): (
                        <span>没有更多数据了..</span>
                    )}
                </div>
            </div>
        )
    }
}
const binding = {
    users: ["userPage", "data"],
    total: ["userPage", "total"],
    hasmore: ["userPage", "hasmore"]
}
export default branch(binding, UserPage)