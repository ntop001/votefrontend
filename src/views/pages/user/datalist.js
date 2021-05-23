import React from 'react'
import styles from './datalist.module.css'

import { formatTime } from 'service/utils/util'

export default class DataList extends React.Component {
    handleClickItem = (key, item) => {
        this.props.onClickItem && this.props.onClickItem(key, item)
    }

    render() {
        const TableItem = ({item}) => {
            return (
            <tr className={styles.row}>
                <td>{item.name || '~'}</td>
                <td>{item.mobile} </td>
                <td>{formatTime(item.created_at)}</td>
                <td>{formatTime(item.updated_at)}</td>
            </tr>
            )
        }
        const { data = []} = this.props
        return (
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>用户名</th><th>手机号</th><th>创建时间</th><th>最后更新时间</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map( item => {
                        return <TableItem key={item.id} item={item} />
                    })}
                </tbody>
            </table>
        )
    }
}