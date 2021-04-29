import React from 'react'
import styles from './index.module.css'

export default class BunnyPage extends React.Component {
    handleBack = () => {
        this.props.history.push("/")
    }

    render() {
        return (
            <div className={styles.bunnypage}>
                <div className={styles.back} onClick={this.handleBack}>
                    Back
                </div>
                <div className={styles.detail}>
                    This is detail message...
                </div>
            </div>
        )
    }
}