import react from "react";
import React from "react";

import type { TaskType, CategoryType, SortDataType } from "@/types";

const taskItemContainer = {
  display: "flex",
  alignItems: "start",
  gap: "1rem",
  width: "100%",
};
const emojiStyle = { fontSize: "1.2rem" };
const taskTextContainer = {
  display: "flex",
  flexDirection: "column",
};
const mainText = {
  fontSize: "1rem",
  wordBreak: "break-word",
};
const subText = {
  fontSize: "0.8rem",
  color: "#999",
};

export const TaskList = ({
  data,
  sortData,
  sortMethod,
  categoryData,
  hoveredId,
  handleMouseEnter,
  handleMouseLeave,
  handleMouseClickEdit,
  handleMouseClickDelete,
}: {
  data: TaskType[];
  sortData: SortDataType[];
  sortMethod: string;
  categoryData: { [key: string]: CategoryType };
  hoveredId: string;
  handleMouseEnter: Function;
  handleMouseLeave: Function;
  handleMouseClickEdit: Function;
  handleMouseClickDelete: Function;
}) => {
  const toTimeString = (date: Date) => {
    let hour = date.getHours();
    let min = date.getMinutes();

    while (hour < 0) hour += 24;
    while (min < 0) min += 60;
    while (hour > 24) hour -= 24;
    while (min > 60) min -= 60;
    return (hour < 10 ? "0" + hour : hour) + ":" + (min < 10 ? "0" + min : min);
  };

  return (
    <div>
      {data
        .sort(
          sortData.filter((item: SortDataType) => item.title === sortMethod)[0]
            .func
        )
        .map((item: TaskType, idx: number) => {
          const isHover = hoveredId === item.id;

          return (
            <div
              key={idx}
              onMouseEnter={() => handleMouseEnter(item)}
              onMouseLeave={() => handleMouseLeave(item)}
              style={{
                fontWeight: isHover ? 900 : 400,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.3rem 0",
                cursor: "pointer",
              }}
            >
              <div style={taskItemContainer}>
                <p style={emojiStyle}>
                  {Object.keys(categoryData).length !== 0 &&
                  categoryData[item.categoryId]
                    ? categoryData[item.categoryId].emoji
                    : "❗"}
                </p>
                <div style={taskTextContainer as react.CSSProperties}>
                  <p style={mainText as react.CSSProperties}>{item.title}</p>
                  <p style={subText}>
                    {Object.keys(categoryData).length !== 0 &&
                    categoryData[item.categoryId]
                      ? categoryData[item.categoryId].title
                      : "카테고리 데이터 불러오기 실패"}
                  </p>
                  <p style={subText}>
                    {toTimeString(item.start)} ~ {toTimeString(item.end)}
                  </p>
                </div>
              </div>

              <img
                src="/pencil_twitter.png"
                style={{
                  display: isHover ? "inline" : "none",
                  width: "1.5rem",
                  height: "1.5rem",
                }}
                onClick={() => handleMouseClickEdit(item)}
              />
              <img
                src="/crossMark_twitter.png"
                style={{
                  display: isHover ? "inline" : "none",
                  width: "1.5rem",
                  height: "1.5rem",
                  marginLeft: "1rem",
                }}
                onClick={() => handleMouseClickDelete(item)}
              />
            </div>
          );
        })}
    </div>
  );
};
