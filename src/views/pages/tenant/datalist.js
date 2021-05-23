import React from 'react'
import styles from './orderlist.module.css'
import Status from './status'

import { formatTableTime } from 'service/utils/util'

export default class DataList extends React.Component {
    handleClickItem = (key, item) => {
        this.props.onClickItem && this.props.onClickItem(key, item)
    }

    render() {
        const TableItem = ({item}) => {
            return (
            <tr className={styles.row}>
                <td>{formatTableTime(item.created_at)}</td>
                <td>{item.name} </td>
                <td>￥{item.value}.0 </td>
                <td>支付宝</td>
                <td><Status status ={item.status} /></td>
                <td className={styles.actions}>
                    {/* eslint-disable-next-line */}
                    {item.status === 1 && (<a onClick={ () => this.handleClickItem("pay", item)}>继续支付</a>)}

                    {/* eslint-disable-next-line */}
                    {item.status === 0 && (<a onClick={() => this.handleClickItem("invoice", item)}>合同/发票</a>) }

                    {/* eslint-disable-next-line */}
                    <a onClick={() => this.handleClickItem("detail", item)}>详情</a>
                </td>
            </tr>
            )
        }
        const { orders = []} = this.props
        return (
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>日期</th><th>内容</th><th>金额</th><th>支付方式</th><th>订单状态</th><th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map( item => {
                        return <TableItem key={item.id} item={item} />
                    })}
                </tbody>
            </table>
        )
    }
}