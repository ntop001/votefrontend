import React from 'react'
import { Link } from 'react-router-dom'
import { branch } from 'baobab-react/higher-order'
import styles from './index.module.css'

import {
    getHomeList
} from 'service/utils/home'

class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(getHomeList)
    }

    render() {
        const ListItem = ({item}) => {
            return (
                <div className={styles.listitem}>
                    <Link to={`/bunnys/${item.id}`}>
                        <span>{item.id}</span> <span>{item.name}</span>
                    </Link>
                </div>
            )
        }
        const { data = [] } = this.props
        return (
            <div className={styles.homepage}>
                {data.map( (item) => {
                    return <ListItem key={item.id} item={item} />
                })}
            </div>
        )
    }
}
const binding = {
    data: ["homePage", "data"]
}
export default branch(binding, HomePage)