import {
  Children,
  cloneElement,
  memo,
  type ChangeEventHandler,
  type PropsWithChildren,
  useCallback,
  useState,
} from "react";
import { useRefFrom } from "@/hooks/useRefFrom";

import { isOption, type Option } from "./Option";

function assertState<T>(condition: T, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

export type DropdownProps = {
  value: string;
  onSelect: (option: Option) => void;
};

export const Dropdown = memo(
  ({ children, value, onSelect }: PropsWithChildren<DropdownProps>) => {
    const childrenRef = useRefFrom(children);
    const onSelectRef = useRefFrom(onSelect);

    const handleChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
      ({ target: { value: childValue } }) => {
        const value = Children.toArray(childrenRef.current).reduce<
          string | null
        >((acc, child) => {
          if (isOption(child) && child.props.children === childValue) {
            return child.props.value;
          }
          return acc;
        }, null);

        assertState(value, "No option found with value: " + childValue);

        onSelectRef.current?.({ value });
      },
      [childrenRef, onSelectRef]
    );

    const selectedOptionChildren = Children.toArray(children).reduce<
      string | undefined
    >((acc, child) => {
      if (isOption(child) && child.props.value === value) {
        return child.props.children;
      }
      return acc;
    }, undefined);

    return (
      <div className="relative inline-block text-left">
        <select
          onChange={handleChange}
          value={selectedOptionChildren}
          className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-state"
        >
          {Children.map(children, (child) => {
            if (isOption(child)) {
              return cloneElement(child);
            }
            return null;
          })}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";
