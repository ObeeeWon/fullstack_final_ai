import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import './EditItemForm.scss';

const EditItemForm = (props) => {
    const [id, setID] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [sku, setSKU] = useState('');
    const [category_id, setCategoryID] = useState('');
    const [item, setItem] = useState({});

    const _detectTitleChanged = (key, value) => {
        setTitle(value);
        console.log('_detectTitleChanged fired');
    };

    const _detectDescriptionChanged = (key, value) => {
        setDescription(value);
        console.log('_detectDescriptionChanged fired');
    };

    const _detectPriceChanged = (key, value) => {
        setPrice(value);
        console.log('_detectPriceChanged fired');
    };

    const _detectQuantityChanged = (key, value) => {
        setQuantity(value);
        console.log('_detectQuantityChanged fired');
    };

    const _detectSKUChanged = (key, value) => {
        setSKU(value);
        console.log('_detectSKUChanged fired');
    };

    const _detectCategoryChanged = (key, value) => {
        setCategoryID(value);
        console.log('_detectCategoryChanged fired');
    };

    const _update = () => {
        console.log('_update fired');
        props.onUpdateItem(item);
        _clear();
    };

    const _clear = () => {
        setID('');
        setTitle('');
        setDescription('');
        setPrice('');
        setQuantity('');
        setSKU('');
        setCategoryID('');
        console.log('_clear fired');
    };

    useEffect(() => {
        setItem({
            id,
            title,
            description,
            price,
            quantity,
            sku,
            category_id,
        });
        console.log('item updated');
    }, [id, title, description, price, quantity, sku, category_id]);

    useEffect(() => {
        setID(props.item.id);
        setTitle(props.item.title);
        setDescription(props.item.description);
        setPrice(props.item.price);
        setQuantity(props.item.quantity);
        setSKU(props.item.sku);
        setCategoryID(props.item.category_id);
    }, [props]);

    return (
        <div className="Form" style={{ marginTop: '16px' }}>
            <label>Title:</label>
            <input type="text" placeholder="Title" value={title} onChange={(e) => _detectTitleChanged('title', e.target.value)} /><br />
            <label>Description:</label>
            <input type="text" placeholder="Description" value={description} onChange={(e) => _detectDescriptionChanged('description', e.target.value)} /><br />
            <label>Price:</label>
            <input type="number" placeholder="Price" value={price} onChange={(e) => _detectPriceChanged('price', e.target.value)} /><br />
            <label>Quantity:</label>
            <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => _detectQuantityChanged('quantity', e.target.value)} /><br />
            <label>SKU:</label>
            <input type="text" placeholder="SKU" value={sku} onChange={(e) => _detectSKUChanged('sku', e.target.value)} /><br />
            <label>Category:</label>
            <select 
                value={category_id} onChange={(e) => _detectCategoryChanged('category_id', e.target.value)}>
                <option value="">Select a category</option>
                {props.categories?.map((category) => (
                    <option key={category.category_id} value={category.category_id}>{category.category_name}</option>
                ))}
            </select><br />
            <Button title="Save Item" onClick={_update} />
        </div>
    );
};

export default EditItemForm;
