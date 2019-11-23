import { useEffect, useRef } from 'react';

// hook para pegar o valor antigo no useEffect
export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
