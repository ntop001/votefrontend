import client from 'service/client'
import message from './message'

export const getTenantList = (tree, params) => {
   client.getTenantList({...params, page: 1}).then( resp => {
        const { data, total, hasmore } = resp
        const cursor = tree.select("tenantPage")
        cursor.set("data", data)
        cursor.set("total", total)
        cursor.set("page", 1)
        cursor.set("hasmore", hasmore)
   }).catch( err => {
        console.log("getTenantList error", err)
        message.error("列表加载失败", err.status)
   })
}

export const getMoreTenant = (tree, params) => {
    const cursor = tree.select("tenantPage")
    const nextPage = cursor.get("page") + 1
    client.getTenantList({...params, page: nextPage}).then( resp => {
        const { data, total, hasmore } = resp
        cursor.concat("data", data)
        cursor.set("total", total)
        cursor.set("page", nextPage)
        cursor.set("hasmore", hasmore)
   }).catch( err => {
        console.log("getTenantList error", err)
        message.error("列表加载失败", err.status)
   })
}

export const updateTenant = (tree, id, params) => {
    return new Promise( (resolve, reject) => {
        client.updateTenant(id, params).then( data => {
            const cursor = tree.select("tenantPage", "data")
            cursor.set(cursor.get().map( item => {
                return item.id === id? data: item
            }))
            resolve(data)
            message.success("更新成功！")
        }).catch( err => {
            reject(err)
            console.log("updateTenant error", err)
            message.error("更新呢失败", err.status)
        })
    })
}