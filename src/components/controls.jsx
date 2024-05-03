import React from 'react';
import useStore from '../store';

function Controls(props) {
  const increment = useStore((state) => state.increment);
  const decrement = useStore((state) => state.decrement);

  return (
    <div>
      <button type="button" onClick={increment}>+</button>
      <button type="button" onClick={decrement}>-</button>
    </div>
  );
}

export default Controls;
