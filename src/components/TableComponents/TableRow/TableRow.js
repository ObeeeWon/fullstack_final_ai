import React from 'react';
import './TableRow.scss'

const TableRow = props => {

    const _editCategory = () => {
        console.log('TableRow _editRowCategory fired')
        props.onEditCategory(props.category);
    }
    const _deleteCategory = () => {
        console.log('TableRow _deleteRowCategory fired')
        if (window.confirm('Are you sure you want to delete this category?')) props.onDeleteCategory(props.category);
    }

    return(<tr>
                <td>{ props.category.category_id }</td>
                <td>{ props.category.category_name }</td>
                <td><button onClick={ _editCategory }>Edit</button></td>
                <td><button onClick={ _deleteCategory }>DELETE</button></td>
            </tr>);
}
export default TableRow;