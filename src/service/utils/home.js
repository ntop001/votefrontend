import client from 'service/client'
import message from './message'

export const getHomeList = (tree, params) => {
    // request data and fill tree
    const data = new Array(20).fill({id: 0, name: ""}).map( (item, i) => {
        return {id: i, name: `这是第${i}条数据`}
    })
    tree.set(["homePage", "data"], data)
}
