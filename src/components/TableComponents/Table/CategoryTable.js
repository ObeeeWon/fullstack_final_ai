import React from 'react';
import CategoryTableRow from '../TableRow/CategoryTableRow'
import './CategoryTable.scss'

const CategoryTable = props => {

    const _editCategory = item => {
        console.log('Table _editCategory fired');
        props.onEditCategory(item);
    }

    const _deleteCategory = item => {
        console.log('Table _deleteCategory fired');
        props.onDeleteCategory(item);
    }

    return(
        <div className='Table-Component'>
            <table style={ {marginTop: '20px', width: '80%', marginLeft: 'auto', marginRight:'auto'} }>
                <thead>
                    <tr>
                    <th>Category id</th>
                    <th>Category Name</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                { props.categories.map(
                    (category, i) => { 
                        return( <CategoryTableRow key={category.category_id} index={i} category={category} 
                            onEditCategory = { _editCategory } 
                            onDeleteCategory = { _deleteCategory } /> ) }
                    ) 
                } 
                </tbody>
            </table>
        </div>
    );
}
export default CategoryTable;