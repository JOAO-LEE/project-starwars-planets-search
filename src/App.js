import React from 'react';
import './App.css';
import Table from './components/Table';
import InputName from './components/InputName';

import StarWarsProvider from './context/fetchProvider';

function App() {
  return (
    <StarWarsProvider>
      <main>
        <InputName />
        <Table />
      </main>
    </StarWarsProvider>
  );
}

export default App;
