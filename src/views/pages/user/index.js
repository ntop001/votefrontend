import React from 'react'
import { branch } from 'baobab-react/higher-order'
import styles from './index.module.css'

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
        const ListItem = ({item}) => {
            return (
                <div className={styles.listitem}>
                    <div className={styles.title}><h3>用户名：{item.name} </h3> </div>
                    <p>
                        手机号: {item.mobile}
                    </p>
                    <p>
                        创建时间：{formatTime(item.created_at)}, 最后更新时间: {formatTime(item.updated_at)}
                    </p>
                </div>
            )
        }
        const { users = [], total} = this.props
        return (
            <div className={styles.page}>
                <div className={styles.search}>
                    <span>用户数：{total}</span>
                    <input name="name" onChange={this.handleInputChange} />
                    <button type="button" onClick={this.handleSearch} >搜索</button>
                </div>
                <div className={styles.datalist}>
                    {users.map( item => {
                        return <ListItem key={item.id} item={item}/>
                    })}
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