import React from 'react';
import ItemTableRow from '../TableRow/ItemTableRow';
import './ItemTable.scss';

const ItemTable = props => {

    const _editItem = item => {
        console.log('Table _editItem fired');
        props.onEditItem(item);
    };

    const _deleteItem = item => {
        console.log('Table _deleteItem fired');
        props.onDeleteItem(item);
    };

    return(
        <div className='Table-Component'>
            <table style={{ marginTop: '20px', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                <thead>
                    <tr>
                        <th>Item ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>SKU</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                { props.items.map(
                    (item, i) => { 
                        return( <ItemTableRow key={item.item_id} index={i} item={item} 
                            onEditItem={_editItem} 
                            onDeleteItem={_deleteItem} /> ); 
                    })
                } 
                </tbody>
            </table>
        </div>
    );
};

export default ItemTable;
