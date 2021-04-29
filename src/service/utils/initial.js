import client from 'service/client'

export const getSelf = (tree) => {
    client.getSelf().then( data => {
        tree.set(['user'], data.data)
    }).catch(err => {
        console.log(err)
    })
}