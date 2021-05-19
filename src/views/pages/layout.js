import React from 'react'
import { Switch, Route } from 'react-router-dom'
import styles from './layout.module.css'

import { MessageBox, Sidebar } from 'views/comps'
import Footer from './footer'
import {
    LoginPage
} from './auth'

import TenantPage from './tenant'
import UserPage from './user'

export default class Layout extends React.Component {
    render() {
        return (
            <div>
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
            <div style={{paddingTop: "10%"}}>
                <Switch>
                    <Route path="/auth/login" component={LoginPage} />
                </Switch>
            </div>
            <Footer />
        </div>
    )
}

const MainLayout = () => {
    return (
        <div className={styles.layout}>
            <div className={styles.sidebar}>
                <Sidebar />
            </div>
            <div className={styles.main}>
                <Switch>
                    <Route path="/tenants" component={TenantPage} />
                    <Route path="/users" component={UserPage} />
                    <Route component={TenantPage} />
                </Switch>
            </div>
        </div>
    )
}