import React from "react";
import { Plus, Minus } from "../../assets/icons/PlusMinus";
import { CounterBox, CounterButton, CounterValue } from "./counter.style";

export const Counter = ({ onDecrement, onIncrement, value, variant }) => {
  return (
    <CounterBox variant={variant}>
      <CounterButton onClick={onDecrement} variant={variant}>
        <Minus />
      </CounterButton>
      <CounterValue>{value}</CounterValue>
      <CounterButton onClick={onIncrement} variant={variant}>
        <Plus />
      </CounterButton>
    </CounterBox>
  );
};
