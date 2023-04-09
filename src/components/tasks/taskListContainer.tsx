import react from "react";
import React from "react";

import { AddTaskButton } from "@components/addTaskButton";
import { Select } from "@components/select";
import { TaskList } from "@components/tasks/taskList";

import type { TaskType, CategoryType, SortDataType } from "@/types";

export const TaskListContainer = ({
  data,
  setData,
  categoryData,
  hoveredId,
  handleMouseEnter,
  handleMouseLeave,
  handleMouseClickEdit,
  handleMouseClickDelete,
  currentDate,
}: {
  data: TaskType[];
  setData: Function;
  categoryData: { [key: string]: CategoryType };
  hoveredId: string;
  handleMouseEnter: Function;
  handleMouseLeave: Function;
  handleMouseClickEdit: Function;
  handleMouseClickDelete: Function;
  currentDate: Date;
}) => {
  const basicInputData = {
    id: null,
    title: "할 일을 입력해주세요",

    startYearMonth: new Date(),
    startHour: new Date().getHours().toString(),
    startMinute: new Date().getMinutes().toString(),

    endYearMonth: new Date(),
    endHour: new Date().getHours().toString(),
    endMinute: new Date().getMinutes().toString(),

    categoryId: "second",
  };
  const [inputData, setInputData] = react.useState<any>(basicInputData);

  const timeSort = (a: TaskType, b: TaskType) => {
    if (a.start < b.start) return -1;
    return 1;
  };
  const categorySort = (a: TaskType, b: TaskType) => {
    if (categoryData[a.categoryId].title < categoryData[b.categoryId].title)
      return -1;
    if (categoryData[a.categoryId].title === categoryData[b.categoryId].title) {
      if (a.start < b.start) return -1;
      return 1;
    }
    return 1;
  };
  const [sortMethod, setSortMethod] = react.useState<string>("시간순");
  const sortData: SortDataType[] = [
    { title: "시간순", func: timeSort },
    { title: "카테고리순", func: categorySort },
  ];

  return (
    <div
      style={{
        width: "40vw",
        minWidth: "300px",
        maxWidth: "400px",
      }}
    >
      <div
        style={{
          display: "flex",
          marginBottom: "1rem",
        }}
      >
        <AddTaskButton
          inputData={inputData}
          setInputData={setInputData}
          setData={setData}
          categoryData={categoryData}
          currentDate={currentDate}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "2rem",
        }}
      >
        <Select
          sortData={sortData}
          sortMethod={sortMethod}
          setSortMethod={setSortMethod}
        />
      </div>

      <TaskList
        data={data}
        sortData={sortData}
        sortMethod={sortMethod}
        categoryData={categoryData}
        hoveredId={hoveredId}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        handleMouseClickEdit={handleMouseClickEdit}
        handleMouseClickDelete={handleMouseClickDelete}
      />
    </div>
  );
};
