import { useEffect, useRef } from "react"

// hook para pegar o valor antigo no useEffect
export function usePrevious<T>(value: T) {
  const ref = useRef<T>()
  useEffect(() => {
    if (ref?.current !== null) ref.current = value
  })
  return ref.current as T
}
