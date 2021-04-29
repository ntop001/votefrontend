import React from 'react'
import "./loading.css"
import { ReactComponent as LoadingSvg } from 'shared/images/loading.svg'

export default function(props) {
    if (!props.loading) {
        return null
    }
    return (
        <div className="lds-dual-ring">
            <LoadingSvg />
        </div>
    )
}