import React from 'react'
import { branch } from 'baobab-react/higher-order'
import styles from './header.module.css'

class Header extends React.Component {
    handleSignin = () => {
        this.props.dispatch( tree => {
            tree.set("showLogin", true)
        })
    }

    handleSignup = () => {
        this.props.dispatch( tree => {
            tree.set("showSignup", true)
        })
    }

    render() {
        return (
            <div className={styles.header}>
                <div className={styles.logo}>
                    青桔CRM - 秘密花园
                </div>

                <div className={styles.left}>
                    
                </div>
                <div className={styles.right}>
                    
                </div>
            </div>
        )
    }
}
export default branch({ user: ["user"] }, Header)