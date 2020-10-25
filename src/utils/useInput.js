import { useState } from 'react';

export default function useInput(validation) {
  const [input, setInput] = useState();
  const [valid, setValid] = useState(false);
  const onChange = (input) => {
    setInput(input);
    setValid(validation(input));
  };
  return [input, valid, onChange];
}
