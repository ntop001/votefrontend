import React from 'react'
import { branch } from 'baobab-react/higher-order'
import Modal from './modal'
import { Button } from 'shared/comps'
import styles from './signup.module.css'

import { userSignUp } from 'service/utils/login'

class SignupModal extends React.Component {
    state = {
        username: "",
        email: "",
        password: "",
    }

    handleForgotPassword = () => {
        console.log("handle forgot password")
    }

    handleUsernameChanged = (e) => {
        this.setState({username: e.target.value})
    }

    handleEmailChanged = (e) => {
        this.setState({email: e.target.value})
    }

    handlePasswordChanged = (e) => {
        this.setState({password: e.target.value})
    }

    handleSignUp = (e) => {
        e.preventDefault();

        const data = { ...this.state }
        this.props.dispatch(userSignUp, data).then( () => {
            console.log("signup success")
            this.closeModal()
        }).catch( err => {
            console.log("err...", err)
        })
    }

    closeModal = () => {
        this.props.onRequestClose()
    }

    render() {
        const { show, onRequestClose } = this.props
        return (
            <div>
                <Modal title="注册" show={show} onRequestClose={onRequestClose}>
                    <div className={styles.signup}>
                        <div className={styles.body}>
                            <form>
                                <input placeholder="用户名" onChange={this.handleUsernameChanged} />
                                <input placeholder="邮箱"    onChange={this.handleEmailChanged} />
                                <input placeholder="密码" onChange={this.handlePasswordChanged} />
                                <Button onClick={this.handleSignUp}>注册账号</Button>
                            </form>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}
export default branch({}, SignupModal)