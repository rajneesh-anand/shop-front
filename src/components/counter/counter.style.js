import styled from "styled-components";
import { variant } from "styled-system";

export const CounterBox = styled.div(
  {
    display: "flex",
    backgroundColor: "#2183a2",
    // border: "solid 1px teal",
    color: "white",
    // fontSize: "16px",
    fontWeight: "bold",
    marginLeft: 8,

    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
    flexShrink: 0,
    "&:focus": {
      outline: "none",
    },
  },
  variant({
    variants: {
      horizontal: {
        width: 104,
        height: 32,
      },
      vertical: {
        width: 30,
        height: 90,
        flexDirection: "column-reverse",
      },
      lightHorizontal: {
        width: 104,
        height: 36,
        backgroundColor: "gray.200",
        color: "text.bold",
      },
      smallHorizontal: {
        backgroundColor: "gray.200",
        color: "white",
        fontSize: "13px",
        fontWeight: "400",
        marginLeft: 0,
        width: 60,
        height: 24,
      },
      lightVertical: {
        width: 30,
        height: 90,
        flexDirection: "column-reverse",
        backgroundColor: "gray.200",
        color: "text.bold",
      },
      altHorizontal: {
        width: 104,
        height: 36,
        borderRadius: "6px",
      },
      altVertical: {
        width: 30,
        height: 90,
        borderRadius: "6px",
      },
      full: {
        width: "100%",
        height: 36,
        borderRadius: "6px",
      },
    },
  })
);

export const CounterButton = styled.button(
  {
    border: "none",
    backgroundColor: "transparent",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    padding: 10,
    cursor: "pointer",
    "&:hover, &:focus": {
      outline: "none",
    },
  },
  variant({
    variants: {
      lightHorizontal: {
        color: "text.regular",
      },
      lightVertical: {
        color: "text.regular",
      },
      smallHorizontal: {
        padding: 1,
        fontSize: 13,
      },
    },
  })
);

export const CounterValue = styled.span({
  pointerEvents: "none",
});
CounterValue.displayName = "CounterValue";
CounterButton.displayName = "CounterButton";
CounterBox.displayName = "CounterBox";
CounterBox.defaultProps = {
  variant: "horizontal",
};
