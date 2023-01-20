import styled from "styled-components";
import { device } from "../styles/Breakpoints";

// components
import Button from "./Button";

// types
interface SearchProps {
  onSubmit: any;
  placeholderText?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  onClick?: (() => void | undefined) | undefined;
}

const SearchBar = (props: SearchProps) => {
  // store the search data inputed by the user

  return (
    <StyledForm onSubmit={props.onSubmit}>
      <label htmlFor="searchBarContents">Search for a new book!</label>
      <input
        type="text"
        id="searchBarContents"
        onChange={props.onChange}
        value={props.value}
        placeholder={props.placeholderText}
      />
      <Button type="submit">Search</Button>
      <Button type="button" onClick={props.onClick}>
        Clear Search
      </Button>
    </StyledForm>
  );
};

export default SearchBar;

const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(1fr);
  justify-items: center;
  row-gap: 0.5em;
  padding: 1em;
  margin: 0 auto;
  width: 80%;

  button {
    width: 160px;
  }
  button:nth-of-type(2) {
    color: ${(props) => props.theme.colors.secondary};
    background-color: ${(props) => props.theme.colors.primary};
    border: 1px solid ${(props) => props.theme.colors.secondary};

    &:hover {
      color: ${(props) => props.theme.colors.primary};
      background-color: ${(props) => props.theme.colors.secondary};
      border: 1px solid ${(props) => props.theme.colors.primary};
    }
  }

  @media ${device.tablet} {
    grid-template-columns: 1fr 1fr;
    width: 70%;

    button:nth-of-type(1) {
      grid-column-start: 2;
      grid-column-end: 3;
      grid-row-start: 2;
      grid-row-end: 3;
    }
    button:nth-of-type(2) {
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 2;
      grid-row-end: 3;
    }
  }
`;
