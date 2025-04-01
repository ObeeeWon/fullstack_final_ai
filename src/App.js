import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import AddForm from './components/FormComponents/AddForm/AddCategoryForm';
import EditForm from './components/FormComponents/EditForm/EditCategoryForm';
import Table from './components/TableComponents/Table/CategoryTable';
import './App.scss';

const Categories = () => {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const _addItem = item => {
    const url = "http://127.0.0.1:3001/categories";
    axios.post(url, { item: { category_name: item.category_name } })
      .then(res => {
        setItems(res.data.categories);
        setSelectedItem({});
        setEditing(false);
      })
      .catch(err => console.log(err));
  };

  const _editCategory = item => {
    setSelectedItem(item);
    setEditing(true);
  };

  const _updateItem = category_name => {
    const url = `http://127.0.0.1:3001/categories/${selectedItem.category_id}`;
    axios.patch(url, { item: { category_name: category_name } })
      .then(res => {
        setItems(res.data.categories);
        setSelectedItem({});
        setEditing(false);
      })
      .catch(err => console.log(err));
  };

  const _deleteCategory = item => {
    const url = `http://127.0.0.1:3001/categories/${item.category_id}`;
    axios.delete(url)
      .then(res => setItems(res.data.categories))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    const url = "http://127.0.0.1:3001/categories";
    axios.get(url)
      .then(res => setItems(res.data.categories))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="App">
      {editing ? (
        <EditForm onUpdateCategory={_updateItem} item={selectedItem} />
      ) : (
        <AddForm onAddItem={_addItem} />
      )}
      <Table categories={items} onEditCategory={_editCategory} onDeleteCategory={_deleteCategory} />
    </div>
  );
};

function Storefront() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Storefront</h2>
      <p>Welcome to the Storefront page.</p>
    </div>
  );
}

function Items() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Items</h2>
      <p>Browse through our items.</p>
    </div>
  );
}

function NoMatch() {
  return (
    <div style={{ padding: 20 }}>
      <h2>404: Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

function AppLayout() {
  return (
    <>
      <nav style={{ margin: 10 }}>
        <Link to="/" style={{ padding: 5 }}>Storefront</Link>
        <Link to="/items" style={{ padding: 5 }}>Items</Link>
        <Link to="/categories" style={{ padding: 5 }}>Categories</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Storefront />} />
        <Route path="/items" element={<Items />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
