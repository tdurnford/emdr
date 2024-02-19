import { useState, useCallback } from "react";

export const useBoolean = (initialValue: boolean) => {
  const [value, setValue] = useState(initialValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((prev) => !prev), []);

  return [value, { setTrue, setFalse, toggle }] as const;
};
