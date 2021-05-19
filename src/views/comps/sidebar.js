import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './sidebar.module.css'

export default class Sidebar extends React.Component {
    render() {
        const ListItem = (props) => {
        return <NavLink {...props} className={styles.listtem} activeClassName={styles.active}>{props.name}</NavLink>
        }
        return (
            <div className={styles.sidebar}>
                <ListItem to="/tenants" name="租户列表"/>
                <ListItem to="/users" name="用户列表"/>
            </div>
        )
    }
}