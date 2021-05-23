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
                <td>
                    {item.name || '~'}/{item.subdomain}
                </td>
                <td>{`${item.plan}版/${item.seats}人`} </td>
                <td>{formatTime(item.due_time)}</td>
                <td>{formatTime(item.created_at)}</td>
                <td>{formatTime(item.updated_at)}</td>

                <td className={styles.actions}>
                    {/* eslint-disable-next-line */}
                    <a onClick={() => this.handleClickItem("edit", item)}>充值</a>
                </td>
            </tr>
            )
        }
        const { data = []} = this.props
        return (
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>公司</th><th>付费计划</th><th>到期时间</th><th>创建时间</th><th>最后更新时间</th><th></th>
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