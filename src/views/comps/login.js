import React from 'react'
import { branch } from 'baobab-react/higher-order'
import Modal from './modal'
import { Button } from 'shared/comps'
import styles from './login.module.css'

import {
    userLogin
} from 'service/utils/login'
import tree from '../../model/state'

class LoginModal extends React.Component {    
    state = {
        login: "",
        password: ""
    }

    handleLoginChange = (e) => {
       this.setState({login: e.target.value})
    }

    handlePasswordChange = (e) => {
        this.setState({password: e.target.value})
    }

    handleForgotPassword = () => {

    }

    handleSignUp = () => {
        tree.set("showSignup", true)
    }

    // 这里如何把 Tree 传进来，如果用 branch 会导致 ref 失效
    // 如果不 branch 就没有 tree!!
    handleLogin = (e) => {
        e.preventDefault();

        const { login, password } = this.state
        this.props.dispatch(userLogin, login, password).then( () => {
            this.closeModal()
        }).catch( err => {
            console.log(err)
        })
    }

    closeModal = () => {
        this.props.onRequestClose()
    }

    render() {
        const { show, onRequestClose } = this.props
        return (
            <Modal title="登录" show={show} onRequestClose={onRequestClose}>
                <div className={styles.login}>
                    <div className={styles.body}>
                        <form>
                            <input placeholder="用户ID或邮箱地址" onChange={this.handleLoginChange} />
                            <input placeholder="密码" onChange={this.handlePasswordChange} />
                            <Button onClick={this.handleLogin}>登录</Button>
                        </form>
                    </div>
                    <div className={styles.footer}>
                        <div>
                            <a href="#/" onClick={this.handleForgotPassword}>忘记密码?</a>
                        </div>
                        <div>
                            没有账号? <a href="#/" onClick={this.handleSignUp}>注册</a>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}
export default branch({}, LoginModal)