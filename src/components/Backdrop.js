import React from 'react'

export default function Backdrop({isActive, onCancel}) {
    return isActive && <div className="backdrop" onClick={onCancel}/>
}
