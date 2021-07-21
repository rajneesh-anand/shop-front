import styled from "styled-components";

export const CouponBoxWrapper = styled.div`
  &.boxedCoupon {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 50px;
    padding-right: 5px;
    border-radius: 6px;
    background-color: #ffffff;
    overflow: hidden;
    border: 1px solid #ededed;
  }

  input {
    height: 100%;
    flex-grow: 1;
    font-size: calc(15px - 1px);
    color: #77798c;
    border: none;
    border-radius: 0;
    padding: 0 20px;
    background-color: transparent;
    margin-right: 0;

    &:focus {
      outline: 0;
    }

    &::-webkit-input-placeholder {
      font-size: calc(15px - 1px);
      color: #767676;
    }

    &:-moz-placeholder {
      font-size: calc(15px - 1px);
      color: #767676;
    }

    &::-moz-placeholder {
      font-size: calc(15px - 1px);
      color: #767676;
    }
    &:-ms-input-placeholder {
      font-size: calc(15px - 1px);
      color: #767676;
    }
  }

  &.normalCoupon {
    width: 100%;
    display: flex;
    align-items: center;

    input {
      width: 50%;
      height: 48px;
      margin-right: 20px;
      border: 1px solid #e6e6e6;
      background-color: #f7f7f7;
      flex-grow: unset;
      border-radius: 6px;

      @media (max-width: 600px) {
        width: 100%;
      }
    }

    button {
      height: 48px;
    }
  }
`;

export const Error = styled("span")`
  font-family: "Lato";
  font-size: 15px;
  font-weight: 400;
  color: #ff282f;
  padding-top: 10px;
  display: flex;
  justify-content: center;
  position: ${(props) =>
    props.errorMsgFixed === true ? "absolute" : "relative"};
  left: ${(props) => (props.errorMsgFixed === true ? "20px" : "auto")};
  bottom: ${(props) => (props.errorMsgFixed === true ? "-25px" : "auto")};
`;
