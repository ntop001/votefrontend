import client from 'service/client'
import message from 'service/utils/message'

export const userLogin = (tree, name, pw) => {
    return new Promise( (res, rej) => {
        message.showLoading(true)
        client.login(name, pw).then( resp => {
            client.setToken(resp.access_token)
            tree.set(['token', 'value'], resp.access_token)
            localStorage.setItem('a-token', resp.access_token)
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

export const userLogout = (tree) => {
    return new Promise( (resolve, reject) => {
        tree.set(["token", "value"], '')
        localStorage.setItem('a-token', '')
        resolve()
    })
}