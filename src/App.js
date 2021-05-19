import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { root } from 'baobab-react/higher-order'
import tree from 'model/state'
import client from 'service/client'

import {
    isTokenExpired,
} from 'service/utils/util'

import Layout from './views/pages/layout'
import './App.css';

client.onerror = (err) => {
    if(err.status === 401) {
       window.location.pathname = "/a/auth/login"
    }
}

// Update token
tree.select('token', 'value').on('update', function(e) {
    var token = e.data.currentData;
    if (token) {
        client.setToken(token)
        initGlobal(tree)
    }
});

// 持久化存储, tree.commit() 强制一次提交，避免 Baobab 延迟
const token = localStorage.getItem("a-token")
console.log("read token from cookie:", token)

if (token && !isTokenExpired(token)) {
    tree.set(['token', 'value'], token)
    tree.commit()
} else {
    tree.unset(['token', 'value'])
    tree.commit()
}


// init global
function initGlobal(tree) {
    // getSelf(tree)
}

function App() {
    return (
        <div>
            <BrowserRouter basename="/a">
                <div>
                    <Layout />
                </div>
            </BrowserRouter>
        </div>
    );
}

// 此处注入：
// 1. kawa API 客户端 kawa(client, App)
// 2. baobab 组件 root(tree, App)
export default root(tree, App)