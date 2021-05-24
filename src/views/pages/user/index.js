import React from 'react'
import { branch } from 'baobab-react/higher-order'
import styles from './index.module.css'
import DataList from './datalist'

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
                    <DataList data={users}/>
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