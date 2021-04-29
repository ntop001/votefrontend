import React from 'react'
import classnames from 'classnames'
import tree from 'model/state'
import { branch } from 'baobab-react/higher-order'

import { ReactComponent as CloseSvg } from 'shared/images/close.svg'
import styles from './message.module.css'

import { ReactComponent as SuccessSvg } from 'shared/images/info_succ.svg'
import { ReactComponent as WarningSvg } from 'shared/images/info_warn.svg'
import { ReactComponent as ErrorSvg } from 'shared/images/info_error.svg'

class Group extends React.Component {
    render() {
        const { messages = [] } = this.props
        return (
            <div className={styles.group}>
                {messages.map( item => {
                    return <Message key={item.id} item={item} />
                })}
            </div>
        )
    }
}
const binding = () => {
    return {
        messages: ["messages", "data"],
    }
}
export default branch(binding, Group)

export class Message extends React.Component {
    state = {
        show: false, 
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ show: true, tid: setTimeout(this.handleClose, 3000) })
        }, 50)
    }

    handleClose = () => {
        clearTimeout(this.state.tid)
        this.setState({ show: false}, () => {
            setTimeout(() => {
                const id = this.props.item.id
                const cursor = tree.select("messages", "data")
                cursor.set(
                    cursor.get().filter( item => item.id !== id )
                )
            }, 300)           
        })
    }

    render() {
        const { item } = this.props
        const joinClass = this.state.show? classnames(styles.message, styles.show): styles.message
        const IconMapping = {
            "success": <SuccessSvg />, "warn": <WarningSvg />, "error": <ErrorSvg />,
        }
        return (
            <div className={joinClass}>
                <div className={styles.inner}>
                    <div className={styles.icon}>
                        { IconMapping[item.type] }
                    </div>
                    <div className={styles.body}>
                        {item.content}
                    </div>
                    <div className={styles.close} onClick={this.handleClose}>
                        <CloseSvg />
                    </div>
                </div>
            </div>
        )
    }
}