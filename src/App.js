import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { branch } from 'baobab-react/dist-modules/higher-order'
import { root } from 'baobab-react/higher-order'
import tree from 'model/state'
import client from 'service/client'
import { getSelf } from 'service/utils/initial'
import { LoginModal, SignupModal } from 'views/comps'

import {
    isTokenExpired, cookieStore,
} from 'service/utils/util'

import Layout from './views/pages/layout'
import './App.css';

client.onerror = (err) => {
    if(err.status === 401 && !isLoginView()) {
        console.log("401 error, what happened:", err)
    }
}

// Update token
tree.select('token', 'value').on('update', function(e) {
    var token = e.data.currentData;
    if (token) {
        client.setToken(token)
        cookieStore.setItem("token", token)
        initGlobal(tree)
    }
});

// 持久化存储, tree.commit() 强制一次提交，避免 Baobab 延迟
const token = cookieStore.getItem("token")
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
    getSelf(tree)
}

function isLoginView() {
    const href = window.location.href
    if (!href) {
        return false
    }
    return href.includes("/login")
}

function App() {
    // const token = tree.select('token', 'value').get()
    // if(!token && !isLoginView()) {
    //     window.location.href = "/b/login"
    // }
    return (
        <div>
            <BrowserRouter basename="/b">
                <div>
                    <Layout />
                </div>
            </BrowserRouter>
            <LoginSignup />
        </div>
    );
}

// 此处注入：
// 1. kawa API 客户端 kawa(client, App)
// 2. baobab 组件 root(tree, App)
export default root(tree, App)


const binding = { 
    showLogin: ["showLogin"],  showSignup: ["showSignup"] 
}

const LoginSignup = branch(binding, ({showLogin, showSignup}) => {
    return (
        <div>
            <LoginModal show={showLogin} onRequestClose={() => tree.set("showLogin", false )}  />
            <SignupModal show={showSignup} onRequestClose={() => tree.set("showSignup", false )} />
        </div>
    )
})

