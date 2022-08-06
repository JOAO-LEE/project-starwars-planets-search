import React from 'react';
import './App.css';
import Table from './components/Table';
import InputName from './components/InputName';
import Filters from './components/Filters';
import StarWarsProvider from './context/MyProvider';

function App() {
  return (
    <StarWarsProvider>
      <main>
        <InputName />
        <Filters />
        <Table />
      </main>
    </StarWarsProvider>
  );
}

export default App;
