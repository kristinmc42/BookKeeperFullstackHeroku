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
      <label htmlFor="searchBarContents">Search by Title, Author, Keyword...</label>
      <SearchBarDiv>
      <input
        type="text"
        id="searchBarContents"
        onChange={props.onChange}
        value={props.value}
        placeholder={props.placeholderText}
      />
        <Button type="submit">Search</Button>

      </SearchBarDiv>
      <Button type="button" onClick={props.onClick}>
        Clear Search
      </Button>
    </StyledForm>
  );
};

export default SearchBar;

const SearchBarDiv = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: .35em;
width: 100%;


input{
  width: 100%;
}

@media ${device.mobileL}{
  flex-direction: row;
}

`
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
  padding: 1em;
  margin: 0 auto;
  width: 80%;
  max-width: 1000px;

  @media ${device.tablet} {
    width: 70%;
  }

  label{
    opacity:0;
    width: 0;
    height: 0;
    position: absolute;
  }


  button {
    width: 160px;
  }

  ${SearchBarDiv} + button{
    color: ${props => props.theme.colors.secondary};
    background-color: ${props => props.theme.colors.primary};
    border: 1px solid ${props => props.theme.colors.secondary};

    &:hover{
      color: ${props => props.theme.colors.primary};
      background-color: ${props => props.theme.colors.secondary};
      border: 1px solid ${props => props.theme.colors.primary};
      cursor: pointer;
    }
  }

`;
