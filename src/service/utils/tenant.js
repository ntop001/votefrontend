import client from 'service/client'
import message from './message'

export const getTenantList = (tree, params) => {
   client.getTenantList().then( data => {
        const cursor = tree.select("tenantPage")
        cursor.set("data", data)
   }).catch( err => {
        console.log("getTenantList error", err)
        message.error("列表加载失败", err.status)
   })
}

export const updateTenant = (tree) => {

}