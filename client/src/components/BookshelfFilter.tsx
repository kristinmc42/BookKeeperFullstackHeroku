import React from "react";
import styled from "styled-components";
import { device } from "../styles/Breakpoints";

// types
interface BookshelfProps {
  displayFilter: string;
  setDisplayFilter: React.Dispatch<React.SetStateAction<string>>;
}

//  NEED TO CHECK TAB INDEX FOR NAVIGATING BETWEEN BOOKSHELVES ON KEYBOARD
export default function BookshelfFilter({
  displayFilter,
  setDisplayFilter,
}: BookshelfProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "all") {
      setDisplayFilter("all");
    } else if (e.target.value === "read") {
      setDisplayFilter("read");
    } else if (e.target.value === "currentlyReading") {
      setDisplayFilter("currentlyReading");
    } else if (e.target.value === "toRead") {
      setDisplayFilter("toRead");
    }
    return setDisplayFilter;
  };

  return (
    <StyledFieldset>
      <legend>Select a bookshelf</legend>
      <StyledInput
        type="radio"
        id="allBooks"
        value="all"
        checked={displayFilter === "all"}
        onChange={handleChange}
      />
      <StyledLabel htmlFor="allBooks">ALL</StyledLabel>
      <StyledInput
        type="radio"
        id="readBooks"
        value="read"
        checked={displayFilter === "read"}
        onChange={handleChange}
      />
      <StyledLabel htmlFor="readBooks">READ</StyledLabel>
      <StyledInput
        type="radio"
        id="currentlyReadingBooks"
        value="currentlyReading"
        checked={displayFilter === "currentlyReading"}
        onChange={handleChange}
      />
      <StyledLabel htmlFor="currentlyReadingBooks">
        CURRENTLY READING
      </StyledLabel>
      <StyledInput
        type="radio"
        id="toReadBooks"
        value="toRead"
        checked={displayFilter === "toRead"}
        onChange={handleChange}
      />
      <StyledLabel htmlFor="toReadBooks">TO READ</StyledLabel>
    </StyledFieldset>
  );
}

// styled components
const StyledFieldset = styled.fieldset`
  display: flex;
  justify-content: center;
  gap: .3em;
  margin: 20px auto;
  max-width: 310px;
  position:relative;
  border: none;
  
  legend {
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;
  }
  
  @media ${device.mobileL}{
    max-width: none;
    gap: .5em;
  }
  @media ${device.tablet}{
    gap: 1em;
  }
  @media ${device.laptop}{
    gap: 1.6em;
  }
`;
const StyledLabel = styled.label`
  color: ${(props) => props.theme.colors.whiteText};
  font-size: .9em;
  
  &:nth-of-type(3){
    max-width: 120px;

    @media (min-width:515px){
      max-width: none;
    }
  }

  @media ${device.mobileL}{
    font-size: 1em;
  }
  @media ${device.tablet}{
    font-size: 1.3em;
  }


`;

const StyledInput = styled.input`
  opacity: 0;
  height: 0;
  width: 0;

  &:checked + ${StyledLabel} {
    color: ${(props) => props.theme.colors.secondary};
    border-bottom: 2px solid ${(props) => props.theme.colors.secondary};
  }
`;
