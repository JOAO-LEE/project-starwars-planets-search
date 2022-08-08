import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import apiMock from '../../cypress/mocks/testData';

describe('Testando o componente input', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise
      .resolve({ json: () => Promise.resolve(apiMock) }));
    render(<App />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Testa a chamada da API', () => {
    expect(fetch).toHaveBeenCalledWith('https://swapi-trybe.herokuapp.com/api/planets/');
  });

  test('Testa a digitação do campo de busca com e sem case sensitive', async () => {
    const inputName = screen.getByRole('textbox', { name: /planet:/i });
    expect(inputName).toBeInTheDocument();

    userEvent.type(inputName, 't');
    expect(inputName).toHaveValue('t');
    const searchWithLowerCase = await screen.findAllByTestId('planet-name');
    expect(searchWithLowerCase).toHaveLength(3);
    searchWithLowerCase.forEach((element) => {
      expect(element).toBeInTheDocument();
    });

    userEvent.clear(inputName);
    userEvent.type(inputName, 'T');
    expect(inputName).toHaveValue('T');
    const searchWithUpperCase = await screen.findAllByTestId('planet-name');
    expect(searchWithUpperCase).toHaveLength(3);
    searchWithUpperCase.forEach((element) => {
      expect(element).toBeInTheDocument();
    });

    userEvent.type(inputName, 'a');
    expect(inputName).toHaveValue('Ta');
    const searchResult = await screen.findByTestId('planet-name');
    expect(searchResult).toBeInTheDocument();
    expect(searchResult).toHaveTextContent('Tatooine');
  });
});
