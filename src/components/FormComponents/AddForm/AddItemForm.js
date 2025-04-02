import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import './AddItemForm.scss';

const AddItemForm = props => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [sku, setSku] = useState("");
    const [category_id, setCategoryId] = useState("");
    const [item, setItem] = useState({});

    const _detectTitleChanged = (key, value) => {
        setTitle(value);
        console.log('_detectTitleChanged fired');
    }

    const _detectDescriptionChanged = (key, value) => {
        setDescription(value);
        console.log('_detectDescriptionChanged fired');
    }

    const _detectPriceChanged = (key, value) => {
        setPrice(value);
        console.log('_detectPriceChanged fired');
    }

    const _detectQuantityChanged = (key, value) => {
        setQuantity(value);
        console.log('_detectQuantityChanged fired');
    }

    const _detectSkuChanged = (key, value) => {
        setSku(value);
        console.log('_detectSkuChanged fired');
    }

    const _detectCategoryChanged = (key, value) => {
        setCategoryId(value);
        console.log('_detectCategoryChanged fired');
    }

    const _add = () => {
        console.log('_add fired');
        props.onAddItem(item);
        _clear();    
    }

    const _clear = () => {
        setTitle('');
        setDescription('');
        setPrice('');
        setQuantity('');
        setSku('');
        setCategoryId('');
        console.log('_clear fired');
    }

    useEffect(() => {
        setItem({
            'title': title,
            'description': description,
            'price': price,
            'quantity': quantity,
            'sku': sku,
            'category_id': category_id
        });
        console.log('item updated');
    }, [title, description, price, quantity, sku, category_id]);

    return (
        <div className="Form" style={{ marginTop: '16px' }}> 
            <label>Title:</label>
            <input type="text" placeholder='Title' value={title} 
                   onChange={e => _detectTitleChanged('title', e.target.value)} /><br />
            <label>Description:</label>
            <input type="text" placeholder='Description' value={description} 
                   onChange={e => _detectDescriptionChanged('description', e.target.value)} /><br />
            <label>Price:</label>
            <input type="text" placeholder='Price' value={price} 
                   onChange={e => _detectPriceChanged('price', e.target.value)} /><br />
            <label>Quantity:</label>
            <input type="text" placeholder='Quantity' value={quantity} 
                   onChange={e => _detectQuantityChanged('quantity', e.target.value)} /><br />
            <label>SKU:</label>
            <input type="text" placeholder='SKU' value={sku} 
                   onChange={e => _detectSkuChanged('sku', e.target.value)} /><br />
            <label>Category:</label>
            <select value={category_id} onChange={e => _detectCategoryChanged('category_id', e.target.value)}>
                <option value="">Select a category</option>
                {props.categories?.map(cat => (
                    <option key={cat.category_id} value={cat.category_id}>{cat.category_name}</option>
                ))}
            </select><br />
            <Button title="Add Item" onClick={_add} />
        </div>
    );
}
export default AddItemForm;
