import React from 'react'
import classnames from 'classnames'
import styles from './login.module.css'
import lang from 'lang'

import { Button } from 'shared/comps'
import message from 'service/utils/message'

export default class SignupPage extends React.Component {
    state = {
        mobile: "", password: "",  counter: 0,
    }

    handleOnChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleCaptcha = (e) => {
        e.preventDefault()

        const { mobile } = this.state
        if (!mobile || !(/^1[3456789]\d{9}$/.test(mobile))) {
            message.error("手机号为空或格式错误!"); return
        }
        // TODO handle request captcha
    }

    startTimer = () => {
        var counter = 60
        this.setState({ counter: counter })
        this.interval = setInterval( () => {
                counter -= 1
                this.setState({counter: counter})
                if (counter === 0) {
                    clearInterval(this.interval)
                }
        }, 1000)
    }

    handleSubmit = () => {
        const { mobile, password, code } = this.state
        if (!mobile || !(/^1[3456789]\d{9}$/.test(mobile))) {
            message.error("手机号为空或格式错误!"); return
        }
        if (!password) {
            message.error("密码为空！"); return
        }
        if (!code) {
            message.error("验证码为空！"); return
        }

        // const data = {
        //     mobile, password, code
        // }
        // TODO handle signup
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }    

    render() {
        const { counter } = this.state
        return (
            <div className={styles.login}>
            <div className={styles.formcontainer}>
                <h1 className={styles.formtitle}>{lang.signup}</h1>
                <form>
                    <div className={styles.formitem}>
                        <input name="mobile" type="text" placeholder={lang.loginph_mobile} onChange={this.handleOnChange}/>
                    </div>
                    <div className={classnames(styles.captcha, styles.formitem)}>
                        <input name="code" type="text" placeholder={lang.loginph_captcha} onChange={this.handleOnChange}/>
                        <Button disabled={counter > 0} onClick={this.handleCaptcha} type="normal">
                            { counter > 0? (`${counter} 秒`) : ("获取验证码") }
                        </Button>
                    </div>
                    <div className={styles.formitem}>
                        <input name="password" type="password" placeholder={lang.loginph_pass} onChange={this.handleOnChange}/>
                    </div>
                    
                    <div className={styles.submit}>
                        <Button onClick={this.handleSubmit} >{lang.signup}</Button>
                    </div>
                </form>
            </div>
        </div>
        )
    }
}