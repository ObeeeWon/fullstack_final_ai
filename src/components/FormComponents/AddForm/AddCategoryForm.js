import React, {useState, useEffect} from 'react'
import Button from '../Button/Button';
import './AddCategoryForm.scss'

const AddCategoryForm = props => {
    const [category_name, setCategoryName] = useState("");
    const [category, setCategoryData] = useState({});

    const _detectCategoryChanged = (key, value) => {
        setCategoryName(value);
        console.log('_detectCategoryChanged fired');
    }

    const _add = () => {
        console.log('_add fired');
        props.onAddItem({ category_name });
        _clear();    
    }

    const _clear = () => {
        setCategoryName('');
        console.log('_clear fired');
    }

    useEffect( () => {
        setCategoryData( {'Category' : category_name} );
        console.log('item updated');
    }, [category_name]);

    return(
        <div className="Form" style={{ marginTop: '16px'}}> 
            <label>Category Name:</label>
            <input type="text" placeholder='Category Name' value={ category_name } 
                   onChange={ e => _detectCategoryChanged('Category Name', e.target.value )} /><br />
            <Button title="Add Category Name" onClick={ _add } />
        </div>
    );
}
export default AddCategoryForm;