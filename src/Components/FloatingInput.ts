import styled from "styled-components";

const Form = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #d8b9ff;
  color: #4b015e;
  font-family: "copasetic";
  width: 100%;
  height: 120px;
  margin-top: 12px;
  max-width: 400px;
  border-radius: 9px;
  position: relative;
`;

const FormInput = styled.input`
  background-color: white;
  color: #4b015e;
  border-radius: 9px;
  border: 1px solid black;
  box-shadow: none;
  font-size: 28px;
  margin: 16px;
  padding: 8px;
  width: 80%;

  ::placeholder {
    color: #b096ce;
  }

  &:focus {
    outline: 16px solid #cb8adf;
    border: 4px solid #aa2bd1;
  }
`;

export { Form, FormInput };
