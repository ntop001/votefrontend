import React from 'react'
import tree from 'model/state'

export default function(props) {
    const hasPerm = tree.select("settings", "perms", props.perm).get()
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