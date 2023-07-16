import * as React from "react";
import { styled } from "styled-components";

export interface IQuantityProps {
  handleInc: () => void;
  handleDec: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: number;
}

export default function Quantity({
  handleDec,
  handleInc,
  value,
  onChange,
}: IQuantityProps) {
  return (
    <StyledQuantity className="flex items-center justify-center">
      <div onClick={handleDec} className="select-none btn-decrease">
        -
      </div>

      <input
        onChange={onChange}
        type="number"
        value={value}
        className="cart-quantity"
      />
      <div onClick={handleInc} className="select-none btn-increase">
        +
      </div>
    </StyledQuantity>
  );
}
const StyledQuantity = styled.div``;
