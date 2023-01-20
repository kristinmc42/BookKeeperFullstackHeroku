import React from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import styled from "styled-components";
import { device } from "../styles/Breakpoints";

// types
interface FieldsetProps {
  bookshelf: string | undefined;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dateRead: Date | undefined;
  setDateRead: React.Dispatch<React.SetStateAction<Date | undefined>>;
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
      <div className="readContainer">
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
            <DayPicker
              mode="single"
              selected={dateRead}
              onSelect={setDateRead}
              footer={
                dateRead ? (
                  <p>You picked {format(dateRead, "PP")}.</p>
                ) : (
                  <p>Select the date you finished reading.</p>
                )
              }
            />
          </CalendarContainer>
        )}
      </div>
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

const StyledInput = styled.input`
  appearance: none;
  -webkit-appearance: none;
  border-radius: 50%;
  background: ${(props) => props.theme.colors.white};
  border: 3px solid ${(props) => props.theme.colors.secondary};
  box-shadow: 0 0 0 1px ${(props) => props.theme.colors.tertiary};
  width: 1em;
  height: 1em;
  margin-right: 1em;

  &:checked {
    background: ${(props) => props.theme.colors.black};
  }
  &:checked + ${StyledLabel} {
    color: ${(props) => props.theme.colors.secondary};
  }
`;
const CalendarContainer = styled.aside`
  position: absolute;
  left: 5%;
  bottom: 7.5em;
  right: 5%;
  background: ${(props) => props.theme.colors.black};
  outline: 1px solid;
  max-width: 300px;
  display: flex;
  justify-contents: center;
  align-items: center;

  .rdp {
    margin: 1em auto;
    --rdp-cell-size: 32px;

    .rdp-caption {
      font-size: 0.85rem;
    }

    button {
      margin: 0;
    }
    .rdp-day_selected {
      color: ${(props) => props.theme.colors.black};
      font-weight: 600;
      background: ${(props) => props.theme.colors.secondary};
    }

    p {
      color: ${(props) => props.theme.colors.secondary};
      padding: 0.3em;
    }
  }

  @media ${device.mobileM} {
    max-width: 400px;

    .rdp {
      --rdp-cell-size: 40px;
    }
  }
  @media (orientation: landscape) and (min-width: 300px) {
    bottom: 5em;
  }
  @media ${device.tablet}{
    left: 8em;
  }
`;
