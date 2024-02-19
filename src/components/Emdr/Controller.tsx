import { memo, useCallback } from "react";
import { Dropdown, Option } from "@/components/Dropdown";
import { useRefFrom } from "@/hooks";

type Props = {
  frequency: number;
  isAnimating: boolean;
  onSetFrequency: (frequency: number) => void;
  onToggleAnimation: () => void;
};

export const Controller = memo(
  ({ frequency, isAnimating, onSetFrequency, onToggleAnimation }: Props) => {
    const onSetFrequencyRef = useRefFrom(onSetFrequency);

    const handleFrequencyChange = useCallback(
      (option: { value: string }) => {
        onSetFrequencyRef.current(parseFloat(option.value));
      },
      [onSetFrequencyRef]
    );

    return (
      <div className="absolute flex bottom-4 gap-4 items-center">
        <button
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          onClick={onToggleAnimation}
        >
          {isAnimating ? "Stop" : "Start"}
        </button>
        <Dropdown value={frequency.toString()} onSelect={handleFrequencyChange}>
          <Option value="0.1">0.1 Hz</Option>
          <Option value="0.2">0.2 Hz</Option>
          <Option value="0.3">0.3 Hz</Option>
          <Option value="0.4">0.4 Hz</Option>
          <Option value="0.5">0.5 Hz</Option>
          <Option value="0.6">0.6 Hz</Option>
          <Option value="0.7">0.7 Hz</Option>
          <Option value="0.8">0.8 Hz</Option>
          <Option value="0.9">0.9 Hz</Option>
          <Option value="1.0">1.0 Hz</Option>
        </Dropdown>
      </div>
    );
  }
);

Controller.displayName = "Controller";
