import client from 'service/client'
import message from 'service/utils/message'
import { cookieStore } from './util'

export const userLogin = (tree, name, pw) => {
    return new Promise( (res, rej) => {
        message.showLoading(true)
        client.login(name, pw).then( resp => {
            console.log("login resp:", resp)
            tree.set(['token', 'value'], resp.access_token)
            res(resp)
            message.success("登录成功！")
        }).catch( err => {
            console.log(err)
            rej(err)
            if (err.status === 400) {
                message.error("登录失败, 用户名或密码错误！")
            } else {
                message.error("登录失败", err.status)
            }
        }).finally( () => {
            message.showLoading(false)
        })
    })
}

export const userSignUp = (tree, data) => {
    return new Promise( (res, rej) => {
        message.showLoading(true)
        client.signup(data).then( resp => {
            console.log("login resp:", resp)
            res(resp)
            message.success("注册成功！")
        }).catch( err => {
            console.log(err)
            rej(err)
            if (err.message === 'captcha verify error') {
                message.error("验证码错误！")
            } else if (err.status === 400) {
                message.error("手机号或验证码错误!")
            } else if (err.status === 409) {
                message.error("该手机号已经存在，请直接登录！")
            } else {
                message.error("注册失败", err.status)
            }
        }).finally( () => {
            message.showLoading(false)
        })
    })
}

export const userReset = (tree, data) => {
    return new Promise( (res, rej) => {
        message.showLoading(true)
        client.reset(data).then( resp => {
            console.log("login resp:", resp)
            res(resp)
            message.success("重置成功！")
        }).catch( err => {
            console.log(err)
            rej(err)
            if (err.message === 'captcha verify error') {
                message.error("验证码错误！")
            } else if (err.status === 400) {
                message.error("手机号或验证码错误!")
            } else if (err.message === "user not found") {
                message.error("用户不存在，请注册！")
            } else {
                message.error("重置失败", err.status)
            }
        }).finally( () => {
            message.showLoading(false)
        })
    })
}

export const userLogout = (tree) => {
    return new Promise( (resolve, reject) => {
        tree.set(["token", "value"], '')
        cookieStore.removeItem('token')
        resolve()
    })
}

export const requestCaptcha = (tree, phone) => {
    return client.requestCaptcha(phone)
}