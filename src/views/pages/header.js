import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
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
                    
                </div>

                <div className={styles.left}>
                    
                </div>
                <div className={styles.right}>
                    <Switch>
                        <Route path="/auth/login" component={LoginTitle} />
                        <Route path="/auth/signup" component={SignupTitle} />
                        <Route path="/auth/reset" component={ResetTitle} />
                    </Switch>
                </div>
            </div>
        )
    }
}
export default branch({ user: ["user"] }, Header)


const LoginTitle = () => (
    <Link to="/auth/signup" >注册</Link>
)

const SignupTitle = () => (
    <Link to="/auth/login" >登录</Link>
)

const ResetTitle = () => (
    <React.Fragment>
        <Link to="/auth/login" >登录</Link>
        <div style={{margin: '0 8px', color: "#333"}}>|</div>
        <Link to="/auth/signup" >注册</Link>
    </React.Fragment>
)
