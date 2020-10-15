import React from 'react';
import './App.scss';
import FormPage from './Pages/FormPage';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <FormPage />
      <Footer />
    </div>
  );
}

export default App;
