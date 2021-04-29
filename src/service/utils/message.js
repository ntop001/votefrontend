import tree from 'model/state'

export const success = (m) => {
    const data = {
        content: m,
        type: "success",
        id: uuid(),
    }
    tree.select("messages", "data").push(data)
}

export const error = (m, code) => {
    const data = {
        content: m + codeMapping(code),
        type: "error",
        id: uuid(),
    }
    tree.select("messages", "data").push(data)
}

function codeMapping(code) {
    if (!code) {
        return ""
    }
    switch (code) {
    case 400:
        return "，请求参数错误"
    case 401:
        return "，未授权访问"
    case 403:
        return "，没有权限"
    case 500:
        return "，服务器错误"
    default:
        return "：" + code
    }
}

export const warn  = (m) => {
    const data = {
        content: m,
        type: "warn",
        id: uuid(),
    }
    tree.select("messages", "data").push(data)
}

const uuid = (id) => { return Math.random().toString(36).slice(-8)  }

export const showLoading = (show) => {
    if (show === undefined || show) {
        document.body.style.cursor = 'wait';
    } else {
        document.body.style.cursor = 'default';
    }
}

export default {
    success, error, warn, showLoading
}