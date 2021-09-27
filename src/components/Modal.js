import React from 'react'

export default function Modal({isActive, onCancel, onConfirm}) {
    return isActive && (
        <div className="mymodal">
            <p>Are you sure?</p>
            <button className="btn btn--alt" onClick={onCancel}>Cancel</button>
            <button className="btn" onClick={onConfirm}>Confirm</button>
        </div>
    )
}
