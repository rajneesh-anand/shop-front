import styled from "styled-components";
export const MessageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
  text-align: center;
`;

export const MessageTitle = styled.p`
  color: ${(props) => props.color || "red"};
`;

export const AnchorButton = styled.a`
  color: ${(props) => props.color || "#ffffff"};
  -webkit-transition: background-color 1s, color 1s;
  transition: background-color 1s, color 1s;
  min-height: 20px;
  background-color: #002e5b;
  border: none;
  text-align: center;
  font-weight: lighter;
  margin: 5px 8px;
  padding: 5px 10px;
  display: inline-block;
  &:hover {
    cursor: pointer;
    background-color: #ffffff;
    color: #002e5b;
    border: 1px solid teal;
  }
`;
