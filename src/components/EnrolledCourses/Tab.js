import styled from "styled-components";

export const Tabs = styled.div`
  overflow: hidden;
  background: #fff;
  height: 3em;
`;

export const Tab = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  width: 25%;
  position: relative;
  margin-right: 0.1em;
  font-size: 1em;
  font-weight: 600;
  border: ${(props) => (props.active ? "1px solid #ccc" : "")};
  border-bottom: ${(props) => (props.active ? "none" : "")};
  background-color: ${(props) => (props.active ? "rgb(0, 110, 255)" : "#e0e0e0")};
  color: ${(props) => (props.active ? "white" : "black")};
  height: ${(props) => (props.active ? "3em" : "2.6em; top:.4em")};
  transition: background-color 0.5s ease-in-out;
  :hover {
    background-color: "#6a1b9a";
    color: "white";
  }
`;

export const Content = styled.div`
  ${(props) => (props.active ? "" : "display:none")}
`;
