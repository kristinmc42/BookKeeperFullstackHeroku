import React from "react";
import styled from "styled-components";

// types
interface BookshelfProps {
  displayFilter: string;
  setDisplayFilter: React.Dispatch<React.SetStateAction<string>>;
}

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
  border: none;
  justify-content: space-evenly;
  padding: 10px;

  legend {
    height: 0;
  }
`;
const StyledLabel = styled.label`
  color: ${(props) => props.theme.colors.whiteText};
`;

const StyledInput = styled.input`
  width: 25px;
  opacity: 0;

  &:checked + ${StyledLabel} {
    color: ${(props) => props.theme.colors.secondary};
    border-bottom: 2px solid ${(props) => props.theme.colors.secondary};
  }
`;
