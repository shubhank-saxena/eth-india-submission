import React from "react";
import { RiDeleteBinLine, RiInformationLine } from "react-icons/ri";
import styled from "styled-components";

const OrBlock = ({
  children,
  blockName = "My Block",
  onClick,
}: {
  children: React.ReactNode;
  blockName?: string;
  onClick?: () => void;
}) => {
  return (
    <Container>
      <InfoCard>
        OR block
        <RiInformationLine size={16} />
      </InfoCard>
      <BlockName defaultValue={blockName} />
      {children}
      <DeleteButton onClick={onClick}>
        <RiDeleteBinLine size={24} />
      </DeleteButton>
    </Container>
  );
};
const Container = styled.div`
  background: #27272a;
  border: 1px solid #ffb869;
  border-radius: 8px;
  padding: 64px 24px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  position: relative;
`;
const InfoCard = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 0px 8px 0px 8px;
  background: #ffb869;
  position: absolute;
  padding: 4px 8px 4px 16px;
  right: 0px;
  top: 0px;
  color: #003829;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  border: none;
`;
const BlockName = styled.input`
  position: absolute;
  border: 1px solid #ffb869;
  color: #ffb869;
  border-radius: 8px 0px 8px 0px;
  padding: 4px 16px;
  background: none;
  width: 100px;
  left: 0px;
  top: 0px;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
`;
const DeleteButton = styled.div`
  position: absolute;
  right: 4px;
  bottom: 4px;
  cursor: pointer;
  color: #ffffff5c;
`;
export default OrBlock;
