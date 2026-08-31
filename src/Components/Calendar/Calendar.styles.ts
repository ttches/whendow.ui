import styled from "styled-components";

export const CalendarContainer = styled.div`
  border-radius: 10px;
  overflow: hidden;
  user-select: none;
`;

export const CellsContainer = styled.div`
  background-color: #f5f5f5;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

export const DateCell = styled.div<{
  $borderTop?: boolean;
  $borderRight?: boolean;
  $borderBottom?: boolean;
  $borderLeft?: boolean;
}>`
  align-items: center;
  background-color: #551665;
  border: 1px solid #601972;
  cursor: pointer;
  display: flex;
  font-weight: 900;
  font-family: "copasetic";
  height: 80px;
  justify-content: center;
  width: calc(100% / 7);
  position: relative;

  &.out-of-month {
    background-color: #481154;
  }

  &.selected {
    &:after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border: 4px solid #aa2bd1;
      border-radius: 6px;
      margin: 2px;
    }
    background-color: #aa2bd1;
    &:hover {
      background-color: #0d7b7b;
    }
  }

  &.in-range,
  &.selected {
    border-top: ${(p) =>
      p.$borderTop ? "3px solid #eab9ff" : "1px solid transparent"};
    border-right: ${(p) =>
      p.$borderRight ? "3px solid #eab9ff" : "1px solid transparent"};
    border-bottom: ${(p) =>
      p.$borderBottom ? "3px solid #eab9ff" : "1px solid transparent"};
    border-left: ${(p) =>
      p.$borderLeft ? "3px solid #eab9ff" : "1px solid transparent"};
  }

  &.disabled {
    background-color: #2b1231;
    border: 1px solid #37173f;
    color: #a8a8a8;
  }

  &:hover {
    background-color: #20a2a2;
  }
`;

export const DayCell = styled.div`
  align-items: center;
  background-color: #eab9ff;
  color: #4b015e;
  cursor: default;
  display: flex;
  font-family: "simplifica";
  justify-content: center;
  width: calc(100% / 7);
`;

export const Month = styled.h3`
  color: #551665;
  font-family: "copasetic";
  font-size: 24px;
  margin: 0px;
  width: 140px;
  user-select: none;
`;

export const ChangeMonth = styled.button`
  align-items: center;
  background-color: #aa2bd1;
  border: 3px solid #4b015e;
  color: white;
  cursor: pointer;
  display: flex;
  height: 36px;
  width: 44px;
  justify-content: center;
  padding: 0px;
  transition:
    transform 0.15s ease-in-out,
    background-color 0.15s ease-in-out;
  user-select: none;

  &.left {
    border-radius: 80px 20px 20px 80px;
  }

  &.right {
    border-radius: 20px 80px 80px 20px;
  }

  &:hover {
    background-color: #0d7b7b;
    border-color: #aa2bd1;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const MonthContainer = styled.div`
  align-items: center;
  background-color: #eab9ff;
  display: flex;
  justify-content: space-between;
  padding: 16px 10px;
  width: 100%;
`;
