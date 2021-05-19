import client from 'service/client'
import message from './message'

export const getUserList = (tree, params) => {
   client.getUserList(params).then( data => {
        const cursor = tree.select("userPage")
        cursor.set("data", data)
   }).catch( err => {
       console.log("getUserList error, ", err)
       message.error("加载用户列表失败", err.status)
   })
}
