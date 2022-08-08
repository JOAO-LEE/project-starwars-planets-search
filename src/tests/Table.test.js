import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import apiMock from '../../cypress/mocks/testData';

const tableHeader = [
  'Name', 'Rotation', 'Period',
  'Orbital', 'Period', 'Diameter',
  'Climate', 'Gravity', 'Terrain',
  'Surface', 'Water', 'Population',
  'Films', 'Created', 'Edited',
];

describe('Testando a renderização da tabela', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise
      .resolve({ json: () => Promise.resolve(apiMock) }));
    render(<App />);
  });

  test('Testando a renderização do cabeçalho', async () => {
    tableHeader.forEach(async (element) => {
    expect(await screen.findByRole(('columnheader', { name: `${element}` }))).toBeInTheDocument();
    });
  });
});
