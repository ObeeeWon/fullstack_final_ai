import React from 'react';
import './ItemTableRow.scss';

const ItemTableRow = props => {

    const _editRowItem = () => {
        console.log('TableRow _editRowItem fired');
        props.onEditItem(props.item);
    }

    const _deleteRowItem = () => {
        console.log('TableRow _deleteRowItem fired');
        if (window.confirm('Are you sure you want to delete this item?')) props.onDeleteItem(props.item);
    }

    return(
        <tr>
            <td>{ props.item.item_id }</td>
            <td>{ props.item.title }</td>
            <td>{ props.item.description }</td>
            <td>{ props.item.price }</td>
            <td>{ props.item.quantity }</td>
            <td>{ props.item.sku }</td>
            <td><button onClick={ _editRowItem }>Edit</button></td>
            <td><button onClick={ _deleteRowItem }>DELETE</button></td>
        </tr>
    );
}

export default ItemTableRow;