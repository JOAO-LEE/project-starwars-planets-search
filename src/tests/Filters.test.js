import React from 'react';
import { queryByTestId, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import apiMock from '../../cypress/mocks/testData';

describe('Testando o componente de filtros', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise
      .resolve({ json: () => Promise.resolve(apiMock) }));
    render(<App />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Teste da renderização dos inputs e botões, assim como suas funcionalidades', async () => {
    const columnSelection = screen.getByTestId('column-filter');
    expect(columnSelection).toBeInTheDocument();

    const comparisonFilter = screen.getByTestId('comparison-filter');
    expect(comparisonFilter).toBeInTheDocument();
    
    const numericValue = screen.getByTestId('value-filter');
    expect(numericValue).toBeInTheDocument();
    
    const filterButton = screen.getByTestId('button-filter'); 
    expect(filterButton).toBeInTheDocument();
    
    const columnSort = screen.getByTestId('column-sort');
    expect(columnSort).toBeInTheDocument();

    const orderByButton = screen.getByTestId('column-sort-button');
    expect(orderByButton).toBeInTheDocument();

    const ascRadio = screen.getByTestId('column-sort-input-asc');
    expect(ascRadio).toBeInTheDocument();

    const descRadio = screen.getByTestId('column-sort-input-desc');
    expect(descRadio).toBeInTheDocument();

    const removeAllButtons = screen.getByTestId('button-remove-filters');
    expect(removeAllButtons).toBeInTheDocument();

    userEvent.selectOptions(columnSelection, 'diameter');
    userEvent.selectOptions(comparisonFilter, 'maior que');
    userEvent.clear(numericValue)
    userEvent.type(numericValue, '50000');
    userEvent.click(filterButton);

    const justOneOption = await screen.findByTestId('filter');
    expect(justOneOption).toBeInTheDocument();
    expect(justOneOption.children[0]).toHaveTextContent('diameter maior que 50000');
    expect(justOneOption.children[1]).toHaveTextContent('X');
    expect(columnSelection).toHaveLength(4)

    const searches = await screen.findAllByTestId('planet-name');
    expect(searches).toHaveLength(1)
    expect(searches[0]).toBeInTheDocument();
    expect(searches[0]).toHaveTextContent('Bespin');
    userEvent.click(removeAllButtons);
    expect(justOneOption).not.toBeInTheDocument();

    userEvent.selectOptions(columnSelection, 'population');
    userEvent.selectOptions(comparisonFilter, 'maior que');
    userEvent.clear(numericValue)
    userEvent.type(numericValue, '4204010');
    userEvent.click(filterButton);
    expect(columnSelection).toHaveLength(4);

    const moreThanOneOption = await screen.findAllByTestId('filter');
    expect(moreThanOneOption[0].children[0]).toHaveTextContent('population maior que 4204010');
    expect(moreThanOneOption[0].children[1]).toHaveTextContent('X');

    const firstRow = screen.getByRole('row', {
      name: /alderaan 24 364 12500 temperate 1 standard grasslands, mountains 40 2000000000 https:\/\/swapi\-trybe\.herokuapp\.com\/api\/films\/1\/https:\/\/swapi\-trybe\.herokuapp\.com\/api\/films\/6\/ 2014\-12\-10t11:35:48\.479000z 2014\-12\-20t20:58:18\.420000z https:\/\/swapi\-trybe\.herokuapp\.com\/api\/planets\/2\//i
    });
    
    within(firstRow).getByRole('cell', {
      name: /1 standard/i
    });
    expect(firstRow).toBeInTheDocument();

    const secondRow = screen.getByRole('row', {
      name: /coruscant 24 368 12240 temperate 1 standard cityscape, mountains unknown 1000000000000 https:\/\/swapi\-trybe\.herokuapp\.com\/api\/films\/3\/https:\/\/swapi\-trybe\.herokuapp\.com\/api\/films\/4\/https:\/\/swapi\-trybe\.herokuapp\.com\/api\/films\/5\/https:\/\/swapi\-trybe\.herokuapp\.com\/api\/films\/6\/ 2014\-12\-10t11:54:13\.921000z 2014\-12\-20t20:58:18\.432000z https:\/\/swapi\-trybe\.herokuapp\.com\/api\/planets\/9\//i
    });
    
    within(secondRow).getByRole('cell', {
      name: /1 standard/i
    });
    expect(secondRow).toBeInTheDocument();

    expect(searches[0]).toBeInTheDocument();

    userEvent.selectOptions(columnSelection, 'orbital_period');
    userEvent.selectOptions(comparisonFilter, 'menor que');
    userEvent.clear(numericValue)
    userEvent.type(numericValue, '5100');
    userEvent.click(filterButton);
    expect(columnSelection).toHaveLength(3);

    expect(firstRow).toBeInTheDocument();
    expect(secondRow).toBeInTheDocument();

    userEvent.selectOptions(columnSelection, 'surface_water');
    userEvent.selectOptions(comparisonFilter, 'igual a');
    userEvent.clear(numericValue)
    userEvent.type(numericValue, '100');
    userEvent.click(filterButton);
    expect(columnSelection).toHaveLength(2);

    const thirdRow = screen.getByRole('row', {
      name: /kamino 27 463 19720 temperate 1 standard ocean 100 1000000000 https:\/\/swapi\-trybe\.herokuapp\.com\/api\/films\/5\/ 2014\-12\-10t12:45:06\.577000z 2014\-12\-20t20:58:18\.434000z https:\/\/swapi\-trybe\.herokuapp\.com\/api\/planets\/10\//i
    });
    
    within(thirdRow).getByRole('cell', {
      name: /temperate/i
    });

    expect(searches[0]).toHaveTextContent(/kamino/i)
    expect(thirdRow).not.toHaveValue(firstRow);
    expect(secondRow).not.toBeInTheDocument();

    const removeUniqueFilter = await screen.findAllByRole('button', {name: /x/i})

    userEvent.click(removeUniqueFilter[2]);
    expect(columnSelection).toHaveLength(3);

    userEvent.click(removeAllButtons);
    expect(columnSelection).toHaveLength(5);

    userEvent.selectOptions(columnSort, 'population');
    userEvent.click(ascRadio);
    userEvent.click(orderByButton);

    expect(searches[0]).toHaveTextContent('Yavin IV');
    
    userEvent.selectOptions(columnSort, 'surface_water');
    userEvent.click(descRadio);
    userEvent.click(orderByButton);

    expect(searches[0]).toHaveTextContent('Hoth');
  });
});