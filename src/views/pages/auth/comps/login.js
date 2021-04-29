import React from 'react'
import { Link } from 'react-router-dom'
import styles from './login.module.css'
import lang from 'lang'

import { Button } from 'shared/comps'
import message from 'service/utils/message'

export default class LoginPage extends React.Component {
    state = {
        mobile: "", password: "", loading: false
    }

    handleOnChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleSubmit = () => {
        const { mobile, password } = this.state
        if (!mobile) {
            message.error("手机号为空!"); return
        }
        if (!password) {
            message.error("密码为空!"); return
        }
        // TODO handle submit
    }

    render() {
        return (
            <div className={styles.login}>
                <div className={styles.formcontainer}>
                    <h1 className={styles.formtitle}>{lang.login}</h1>
                    <form>
                        <div className={styles.formitem}>
                            <input name="mobile" type="text" placeholder={lang.loginph_mobile} onChange={this.handleOnChange}/>
                        </div>
                        <div className={styles.formitem}>
                            <input name="password" type="password" placeholder={lang.loginph_pass} onChange={this.handleOnChange}/>
                        </div>
                        <div>
                            <Link to="/auth/reset">{lang.login_forgotpass}</Link>
                        </div>
                        <div className={styles.submit}>
                            <Button onClick={this.handleSubmit}>{lang.login}</Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}