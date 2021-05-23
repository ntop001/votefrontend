import React from 'react'
import { branch } from 'baobab-react/higher-order'
import styles from './index.module.css'
import DataList from './datalist'

import {
    getUserList
} from 'service/utils/user'
import {
    formatTime
} from 'service/utils/util'

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

    componentDidMount() {
        this.props.dispatch(getUserList)
    }

    render() {
        const { users = [], total} = this.props
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
            </div>
        )
    }
}
const binding = {
    users: ["userPage", "data"],
    total: ["userPage", "total"]
}
export default branch(binding, UserPage)