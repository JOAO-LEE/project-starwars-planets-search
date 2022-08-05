// import React, { useContext, useEffect, useState } from 'react';
// import myContext from '../context/MyContext';

// function Filters() {
//   const [filterFields, setComparison] = useState({
//     column: '',
//     comparision: '',
//     numeric: '',
//   });

//   const { columns, setColumn } = useContext(myContext);

//   function handleChange({ target: { value, name } }) {
//     setComparison({ ...filterFields, [name]: value });
//   }

//   return (
//     <form>
//       <select
//         name="column"
//         value={ filterFields.column }
//         onChange={ handleChange }
//         data-testid="column-filter"
//       >
//         <option>population</option>
//         <option>orbital_period</option>
//         <option>diameter</option>
//         <option>rotation_period</option>
//         <option>surface_water</option>
//       </select>
//       <select
//         data-testid="comparison-filter"
//         name="comparision"
//         value={ filterFields.comparision }
//         onChange={ handleChange }
//       >
//         <option>maior que</option>
//         <option>menor que</option>
//         <option>igual a</option>
//       </select>
//       <label htmlFor="number-input">
//         <input
//           data-testid="value-filter"
//           id="number-input"
//           name="numeric"
//           value={ filterFields.numeric }
//           onChange={ handleChange }
//           type="number"
//         />
//         <button
//           data-testid="button-filter"
//           type="button"
//         >
//           FILTER
//         </button>
//       </label>
//     </form>

//   );
// }

// export default Filters;
