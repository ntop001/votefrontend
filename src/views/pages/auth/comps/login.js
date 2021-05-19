import React from 'react'
import styles from './login.module.css'
import message from 'service/utils/message'
import tree from 'model/state'
import { userLogin } from 'service/utils/login'

export default class LoginPage extends React.Component {
    state = {
        username: "", password: "", loading: false
    }

    handleOnChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleSubmit = (e) => {
        const { username, password } = this.state
        if (!username) {
            message.error("手机号为空!"); return
        }
        if (!password) {
            message.error("密码为空!"); return
        }
        userLogin(tree, username, password).then( () => {
            this.props.history.push("/tenants")
        })
    }

    render() {
        return (
            <div>
                <div className={styles.title}>
                    请登录
                </div>
                <div className={styles.login}>
                    <div className={styles.formcontainer}>
                        <form>
                            <div className={styles.formitem}>
                                <input name="username" type="text" placeholder="用户名.." onChange={this.handleOnChange}/>
                            </div>
                            <div className={styles.formitem}>
                                <input name="password" type="password" placeholder="密码.." onChange={this.handleOnChange}/>
                            </div>
                            <div className={styles.submit}>
                                <button type="button" onClick={this.handleSubmit}>登录</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}