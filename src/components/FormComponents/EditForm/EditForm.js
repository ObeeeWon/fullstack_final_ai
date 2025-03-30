import React, {useState, useEffect} from 'react'
import Button from '../Button/Button';
import './EditForm.scss'

const EditForm = props => {
    const [category_id, setID] = useState("");
    const [category_name, setCategoryName] = useState("");
    const [item, setCategoryData] = useState({});

    const _detectCategoryChanged = (key, value) => {
        setCategoryName(value);
        console.log('_detectCategoryChanged fired');
    }

    const _update = () => {
        console.log('_update fired');
        console.log('Updated category_name:', category_name);
        props.onUpdateCategory(category_name);
        _clear();    
    }

    const _clear = () => {
        setCategoryName('');
        console.log('_clear fired');
    }

    useEffect(() => {
        setCategoryName(props.item.category_name);
        setCategoryData(props.item);
        console.log('category  updated');
    }, [props.item]);

    return(
        <div className="Form" style={{ marginTop: '16px'}}> 
            <label>Category Name:</label>
            <input type="text" placeholder='Category Name' value={ category_name } 
                   onChange={ e => _detectCategoryChanged('Category Name', e.target.value )} /><br />
            <Button title="Save Category Name" onclick={ _update } />
        </div>
    );
}
export default EditForm;