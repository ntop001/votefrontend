import client from 'service/client'
import message from './message'

export const getUserList = (tree, params) => {
   client.getUserList({...params, page: 1}).then( resp => {
       const { data, total } = resp
        const cursor = tree.select("userPage")
        cursor.set("data", data)
        cursor.set("total", total)
        cursor.set("page", 1)
   }).catch( err => {
       console.log("getUserList error, ", err)
       message.error("加载用户列表失败", err.status)
   })
}

export const getMoreUser = (tree, params) => {
    const cursor = tree.select("userPage")
    const nextPage = cursor.get("page") + 1
    client.getUserList({...params, page: nextPage}).then( resp => {
        const { data, total } = resp
        cursor.set("data", data)
        cursor.set("total", total)
        cursor.set("page", nextPage)
   }).catch( err => {
       console.log("getUserList error, ", err)
       message.error("加载用户列表失败", err.status)
   })

}