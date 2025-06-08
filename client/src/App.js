import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from './userauthentication\'/Register.js';
import Login from './userauthentication\'/Login.js';
import ProtectedRoute from './Components/ProtectedRoutes.js'
import Home from './Home.js';
import Items from './Items.js';
import AddItem from './AddItem.js';


function App() {
  return (
    //add BrowserRouter and Routes to handle navigation
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/items"
          element={
            <ProtectedRoute>
              <Items />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/additem"
          element={
            <ProtectedRoute>
              <AddItem />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;