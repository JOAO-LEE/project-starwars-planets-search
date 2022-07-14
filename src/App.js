import React from 'react';
import './App.css';
import Table from './components/Table';
import StarWarsProvider from './context/fetchProvider';

function App() {
  return (
    <StarWarsProvider>
      <main>
        <Table />
      </main>
    </StarWarsProvider>
  );
}

export default App;
