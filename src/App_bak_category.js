import React, {useState, useEffect} from 'react';
import axios from 'axios';
import AddForm from './components/FormComponents/AddForm/AddCategoryForm';
import EditForm from './components/FormComponents/EditForm/EditCategoryForm';
import Table from './components/TableComponents/Table/CategoryTable';
import './App.scss';


const App = props => {

    const [items, setItems] = useState([]);
    const [editing, setEditing] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});

    //_addItem to pass into AddForm
    const _addItem = item => {
        console.log('_addItem fired');
        console.log(item);
        //send item to server via axios
        //receive new list of items for our Table component 

        const url = "http://127.0.0.1:3001/categories";
        axios.post(url,{ 
            item : { category_name: item.category_name }
        }).then( res => {
            //console.log(res.data.entries);
            //need to track the return items in a state variable
            setItems(res.data.categories);
            setSelectedItem({});
            setEditing(false);
        }).catch( err => {
            console.log(err);
        });
    }
    
    //_editItem to pass into TABLE to load the selectedItem to be passed into Edit component
    const _editCategory  = item => {
        console.log('_editCategory fired');
        //console.log(item);
        setSelectedItem(item);
        setEditing(true);
    }

    //_updateItem passes into EditForm to track and update the updated data
    const _updateItem = category_name => {
        console.log('_updateItem fired');
        console.log('Updating with category_name:', category_name);
        console.log('Selected item id:', selectedItem.category_id);
        //send item to server via axios
        //receive new list of items for our Table component 

        const url = `http://127.0.0.1:3001/categories/${selectedItem.category_id}`;
        axios.patch(url,{ 
            item : { category_name: category_name }
        }).then( res => {
            //console.log(res.data.);
            //need to track the return items in a state variable
            setItems(res.data.categories);
            //console.log(items);
            setSelectedItem({});
            setEditing(false);
        }).catch( err => {
            console.log(err);
        });
    }

    const _deleteCategory = item => {
        console.log('_deleteCategory fired');
        console.log(item);
        //send item to server via axios
        //receive new list of items for our Table component 

        const url = `http://127.0.0.1:3001/categories/${item.category_id}`;
        axios.delete(url,{ 
            item : item
        }).then( res => {
            setItems(res.data.categories);
        }).catch( err => {
            console.log(err);
        });
    }
    useEffect( () => {
        console.log(items);
    }, [items]);

    //retrieve the list of all items on load
    useEffect( () => {

        const url = "http://127.0.0.1:3001/categories";
        axios.get(url).then( res => {
            console.log(res.data.entries);
            //need to track the return items in a state variable
            setItems(res.data.categories);
            //console.log(items);
        }).catch( err => {
            console.log(err);
        });

    }, []);

    return (
        <div className="App">
            { editing ? ( 
                <EditForm onUpdateCategory={ _updateItem } item={ selectedItem }  />
            ) : (
                <AddForm onAddItem={ _addItem } />
            )}
            <Table categories={items} onEditCategory={ _editCategory } onDeleteCategory={ _deleteCategory } />
        </div>
    );
}

export default App;
