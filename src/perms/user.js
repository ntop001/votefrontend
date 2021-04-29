import React from 'react'
import tree from 'model/state'

export default function(props) {
    const user = tree.select("settings", "user").get() || {}
    const hasPerm = user.id === props.user_id
    if (hasPerm) {
        return props.children
    }
    if (!hasPerm && props.shadow) {
        return React.cloneElement(props.children, {
            onClick: null, 
            disabled: true, 
            className: "disabled"
        })
    }
    return null
}