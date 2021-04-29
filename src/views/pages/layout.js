import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { MessageBox } from 'views/comps'
import Header from './header'
import Footer from './footer'
import {
    LoginPage, SignupPage,
} from './auth'

import HomePage from './home'

export default class Layout extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/auth" component={AuthLayout} />
                    <Route component={MainLayout} />
                </Switch>
                <MessageBox />
            </div>
        )
    }
}

const AuthLayout = () => {
    return (
        <div style={{background:"#eee", height:"100vh"}}>
            <div style={{paddingTop: "48px"}}>
                <Switch>
                    <Route path="/auth/login" component={LoginPage} />
                    <Route path="/auth/signup" component={SignupPage} />
                </Switch>
            </div>
            <Footer />
        </div>
    )
}

const MainLayout = () => {
    return (
        <div>
             <Switch>
                <Route path="/home" component={HomePage} />
                <Route component={HomePage} />
            </Switch>
        </div>
    )
}