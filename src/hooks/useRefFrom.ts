import { useRef } from "react";

export const useRefFrom = <T>(value: T) => {
  const ref = useRef(value);
  ref.current = value;
  return ref;
};
