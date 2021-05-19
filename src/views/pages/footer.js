import React from 'react'
import classNames from 'classnames'
import styles from './footer.module.css'

export default class Footer extends React.Component {
    render() {
        return (
            <div className={classNames("container", styles.footer) }>
               © 2020 青桔CRM · 秘密花园
            </div>
        )
    }
}