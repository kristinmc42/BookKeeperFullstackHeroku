import React from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";

//styles
// style sheet for react-datepicker imported in App.tsx
import { device } from "../styles/Breakpoints";

// types
interface FieldsetProps {
  bookshelf: string | undefined;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dateRead: Date | undefined | null;
  setDateRead: React.Dispatch<React.SetStateAction<Date | undefined | null>>;
}

export default function BookshelfOptionsFieldset({
  bookshelf,
  handleChange,
  dateRead,
  setDateRead,
}: FieldsetProps) {
  return (
    <StyledFieldset>
      <legend>Select a bookshelf for this title</legend>
      <StyledReadContainer>
        <StyledItem>
          <StyledInput
            type="radio"
            name="bookshelfOptions"
            id="read"
            value="read"
            checked={bookshelf === "read"} // if a selection was passed in props
            onChange={handleChange}
          />
          <StyledLabel htmlFor="read">Read</StyledLabel>
        </StyledItem>
        {bookshelf === "read" && (
          <CalendarContainer>
            <DatePicker
              selected={dateRead ? dateRead : new Date()}
              onChange={(date) => setDateRead(date)}
              showYearDropdown
              yearDropdownItemNumber={100}
              scrollableYearDropdown
              openToDate={new Date()}
              maxDate={new Date()}
            />
          </CalendarContainer>
        )}
      </StyledReadContainer>
      <StyledItem>
        <StyledInput
          type="radio"
          name="bookshelfOptions"
          id="currentlyReading"
          value="currentlyReading"
          checked={bookshelf === "currentlyReading"}
          onChange={handleChange}
        />
        <StyledLabel htmlFor="currentlyReading">Currently Reading</StyledLabel>
      </StyledItem>
      <StyledItem>
        <StyledInput
          type="radio"
          name="bookshelfOptions"
          id="toRead"
          value="toRead"
          checked={bookshelf === "toRead"}
          onChange={handleChange}
        />
        <StyledLabel htmlFor="toRead">To Read</StyledLabel>
      </StyledItem>
    </StyledFieldset>
  );
}

// styled components
const StyledFieldset = styled.fieldset`
  border: 2px solid ${(props) => props.theme.colors.secondary};
  display: flex;
  flex-direction: column;
  padding: 1em;
  margin: 1.5em auto;
  position: relative;
`;
const StyledItem = styled.div`
  padding: 0.5em 0;
`;
const StyledLabel = styled.label`
  max-width: 200px;
`;
const StyledReadContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media ${device.tablet} {
    flex-direction: row;
  }
`;
const StyledInput = styled.input`
  appearance: none;
  -webkit-appearance: none;
  border-radius: 50%;
  background: ${(props) => props.theme.colors.black};
  border: 3px solid ${(props) => props.theme.colors.secondary};
  box-shadow: 0 0 0 1px ${(props) => props.theme.colors.tertiary};
  width: 1em;
  height: 1em;
  margin-right: 1em;

  &:checked {
    background: ${(props) => props.theme.colors.white};
  }
  &:checked + ${StyledLabel} {
    color: ${(props) => props.theme.colors.secondary};
  }
`;

const CalendarContainer = styled.aside`
  background: ${(props) => props.theme.colors.black};
  display: flex;
  justify-contents: center;
  align-items: center;

  .react-datepicker__input-container {
    border: 1px solid ${(props) => props.theme.colors.secondary};
    background-color: ${(props) => props.theme.colors.black};
    padding-left: 2em;
    width: 88%;
    max-width: 302px;
    input {
      height: 1.8em;
      border: none;
      max-width: 200px;
      background-color: ${(props) => props.theme.colors.black};
      color: ${(props) => props.theme.colors.whiteText};
    }
  }
  .react-datepicker__header,
  .react-datepicker__year-dropdown {
    background-color: ${(props) => props.theme.colors.secondary};
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected {
    background-color: ${(props) => props.theme.colors.secondary};
    color: ${(props) => props.theme.colors.black};
    font-weight: 500;
  }

  @media (orientation: landscape) and (min-width: 300px) {
    bottom: 5em;
  }
  @media ${device.tablet} {
    margin-left: 3em;
    max-width: 300px;
    .react-datepicker__input-container {
    }
  }
`;
