import React from 'react';
import GlobalStyle from './globalStyles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
