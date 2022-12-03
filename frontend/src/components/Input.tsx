import styled, { CSSProperties } from "styled-components";
export const Input = ({
  label,
  placeholder,
  style,
  onChange,
  defaultValue,
}: {
  label: string;
  placeholder: string;
  style?: CSSProperties;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
}) => {
  return (
    <div style={style}>
      <Label>{label || "-"}</Label>
      <StyledInput
        placeholder={placeholder || ""}
        style={style}
        onChange={onChange}
        defaultValue={defaultValue}
      />
    </div>
  );
};
const StyledInput = styled.input`
  padding: 18px;
  border: 1px solid #52525b;
  border-radius: 8px;
  background-color: transparent;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  height: 56px;
  /* BaseColors/Charcoal Grey/900 */
  color: #f5f5f5;
  :focus {
    border: 1px solid #8383ff;
    outline: none;
  }
  ::placeholder {
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
    /* BaseColors/Charcoal Grey/400 */
    color: #52525b;
  }
`;
const Label = styled.p`
  font-weight: 400;
  font-size: 11px;
  line-height: 16px;
  color: #a1a1aa;
  margin-bottom: 8px;
`;
