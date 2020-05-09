import React from 'react'
import { MdEdit, MdDelete } from 'react-icons/md'

const ExpenseItem = (props) => {
    const { id, charge, amount } = props.expense
    const { handleDelete, handleEdit } = props
    return (
        <li className="item">
            <div className="info">
                <span className="charge">{charge}</span>
                <span className="amount">Rs.{amount}</span>
            </div>
            <div>
                <button className="edit-btn" aria-label="edit-btn" onClick={() => { handleEdit(id) }}>
                    <MdEdit />
                </button>
                <button className="clear-btn" aria-label="clear-btn" onClick={() => { handleDelete(id) }}>
                    <MdDelete />
                </button>
            </div>
        </li>
    )
}

export default ExpenseItem;
