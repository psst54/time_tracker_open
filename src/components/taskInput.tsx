import react from "react";
import React from "react";
import { DateSelector } from "@/components/dateSelector";
import { CategorySelector } from "@/components/categorySelector";

import type { CategoryType, TaskInputType } from "@/types";

const inputWrapper = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};
const inputItemWrapper = {
  display: "flex",
  flexDirection: "column",
  gap: "0.2rem",
};
const inputTitle = {
  fontSize: "1rem",
};
const titleInputStyle = {
  background: "#0001",
  border: "none",
  borderRadius: "0.5rem",
  padding: "0.5rem 1rem",
};
const timeInputStyle = {
  display: "flex",
  alignItems: "center",
};
const timeItemInputStyle = {
  background: "#0001",
  border: "none",
  borderRadius: "0.5rem",
  padding: "0.5rem 1rem",
  width: "3rem",
  textAlign: "center",
};
const timeDivider = { margin: "0 0.1rem" };

export const TaskInput = ({
  inputData,
  setInputData,
  placeholderData,
  categoryData,
}: {
  inputData: any;
  setInputData: Function;
  placeholderData: any;
  categoryData: { [key: string]: CategoryType };
}) => {
  return (
    <div style={inputWrapper as react.CSSProperties}>
      <div style={inputItemWrapper as react.CSSProperties}>
        <h3 style={inputTitle as react.CSSProperties}>이름</h3>
        <input
          style={titleInputStyle}
          placeholder={placeholderData.title}
          value={inputData.title}
          onChange={(event) => {
            setInputData((oldState: TaskInputType) => {
              return { ...oldState, title: event.target.value };
            });
          }}
        />
      </div>

      <div style={inputItemWrapper as react.CSSProperties}>
        <h3 style={inputTitle as react.CSSProperties}>시작 시간</h3>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <DateSelector
            selectedDate={inputData.startYearMonth}
            setSelectedDate={(targetDate: any) => {
              setInputData((oldState: TaskInputType) => {
                return { ...oldState, startYearMonth: targetDate };
              });
            }}
          />
          <div style={timeInputStyle}>
            <input
              style={timeItemInputStyle as react.CSSProperties}
              placeholder={placeholderData.startHour}
              value={inputData.startHour}
              onChange={(event) => {
                setInputData((oldState: TaskInputType) => {
                  return { ...oldState, startHour: event.target.value };
                });
              }}
            />
            <p style={timeDivider}>:</p>
            <input
              style={timeItemInputStyle as react.CSSProperties}
              placeholder={placeholderData.startMinute}
              value={inputData.startMinute}
              onChange={(event) => {
                setInputData((oldState: TaskInputType) => {
                  return { ...oldState, startMinute: event.target.value };
                });
              }}
            />
          </div>
        </div>
      </div>

      <div style={inputItemWrapper as react.CSSProperties}>
        <h3 style={inputTitle as react.CSSProperties}>종료 시간</h3>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <DateSelector
            selectedDate={inputData.endYearMonth}
            setSelectedDate={(targetDate: any) => {
              setInputData((oldState: TaskInputType) => {
                return { ...oldState, endYearMonth: targetDate };
              });
            }}
          />
          <div style={timeInputStyle}>
            <input
              style={timeItemInputStyle as react.CSSProperties}
              placeholder={placeholderData.endHour}
              value={inputData.endHour}
              onChange={(event) => {
                setInputData((oldState: TaskInputType) => {
                  return { ...oldState, endHour: event.target.value };
                });
              }}
            />
            <p style={timeDivider}>:</p>
            <input
              style={timeItemInputStyle as react.CSSProperties}
              placeholder={placeholderData.endMinute}
              value={inputData.endMinute}
              onChange={(event) => {
                setInputData((oldState: TaskInputType) => {
                  return { ...oldState, endMinute: event.target.value };
                });
              }}
            />
          </div>
        </div>
      </div>

      <div style={inputItemWrapper as react.CSSProperties}>
        <h3 style={inputTitle as react.CSSProperties}>카테고리</h3>
        <CategorySelector
          categoryData={categoryData}
          inputData={inputData}
          setInputData={setInputData}
        />
      </div>
    </div>
  );
};
