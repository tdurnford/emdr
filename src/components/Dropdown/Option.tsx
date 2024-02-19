import {
  isValidElement,
  memo,
  type PropsWithChildren,
  type ReactElement,
  useCallback,
} from "react";

import { useRefFrom } from "@/hooks/useRefFrom";

export type Option = {
  value: string;
};

export type OptionProps = {
  children: string;
  value: string;
  onClick?: (option: Option) => void;
};

export const Option = memo(
  ({ children, value, onClick }: PropsWithChildren<OptionProps>) => {
    const onClickRef = useRefFrom(onClick);
    const valueRef = useRefFrom(value);

    const handleClick = useCallback(() => {
      onClickRef.current?.({ value: valueRef.current });
    }, [onClickRef, valueRef]);

    return <option onClick={handleClick}>{children}</option>;
  }
);

Option.displayName = "Option";

export const isOption = (
  child: React.ReactNode
): child is ReactElement<OptionProps> => {
  return isValidElement(child) && child.type === Option;
};
