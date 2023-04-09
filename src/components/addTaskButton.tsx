import react from "react";
import React from "react";
import { TaskInput } from "@components/taskInput";
import { BasicButton } from "@components/basicButton";
import { database as db } from "@libs/firebase";
import { collection, addDoc } from "firebase/firestore";

import type { TaskType, TaskInputType, CategoryType } from "@/types";
import {
  hasEmptyField,
  isTimeNumber,
  isValidTime,
  existDuplicatedTask,
} from "@/libs/checkTaskInput";

export const AddTaskButton = ({
  inputData,
  setInputData,
  setData,
  categoryData,
  currentDate,
}: {
  inputData: TaskInputType;
  setInputData: Function;
  setData: Function;
  categoryData: { [key: string]: CategoryType };
  currentDate: Date;
}) => {
  const [isOpen, setIsOpen] = react.useState(false);

  const getDefaultInputData = () => {
    const now = new Date();
    const startOfDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    return {
      id: null,
      title: "",

      startYearMonth: startOfDate,
      startHour: now.getHours().toString(),
      startMinute: now.getMinutes().toString(),

      endYearMonth: startOfDate,
      endHour: now.getHours().toString(),
      endMinute: now.getMinutes().toString(),

      categoryId: "second",
    };
  };
  const [placeholderData, setPlaceholderData] = react.useState(
    getDefaultInputData()
  );

  const addData = async (inputData: TaskInputType) => {
    const start = new Date(
      inputData.startYearMonth.getFullYear(),
      inputData.startYearMonth.getMonth(),
      inputData.startYearMonth.getDate(),
      parseInt(inputData.startHour),
      parseInt(inputData.startMinute)
    );
    const end = new Date(
      inputData.endYearMonth.getFullYear(),
      inputData.endYearMonth.getMonth(),
      inputData.endYearMonth.getDate(),
      parseInt(inputData.endHour),
      parseInt(inputData.endMinute)
    );

    const startDate = new Date(
      inputData.startYearMonth.getFullYear(),
      inputData.startYearMonth.getMonth(),
      inputData.startYearMonth.getDate()
    );
    const endDate = new Date(
      inputData.endYearMonth.getFullYear(),
      inputData.endYearMonth.getMonth(),
      inputData.endYearMonth.getDate()
    );

    const dateArr: string[] = [];

    let curDate = startDate;
    while (true) {
      if (curDate <= endDate) {
        dateArr.push(curDate.toISOString());
        curDate = new Date(
          curDate.getFullYear(),
          curDate.getMonth(),
          curDate.getDate() + 1
        );
      } else break;
    }

    const docRef = await addDoc(
      collection(
        db,
        process.env.NEXT_PUBLIC_DB_TASK ? process.env.NEXT_PUBLIC_DB_TASK : ""
      ),
      {
        title: inputData.title,
        start,
        end,
        categoryId: inputData.categoryId,
        dateArr,
      }
    );

    const keyDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );
    const keyString = keyDate.toISOString();

    if (dateArr.filter((item) => item === keyString).length !== 0) {
      setData((data: TaskType[]) => [
        ...data,
        {
          title: inputData.title,
          start,
          end,
          id: docRef.id,
          categoryId: inputData.categoryId,
        },
      ]);
    }
  };

  const handleCancleClick = () => {
    setIsOpen(false);
  };

  const handleAddClick = async () => {
    if (hasEmptyField(inputData)) {
      alert("빈칸을 모두 채워주세요!");
      return;
    }

    if (!isTimeNumber(inputData)) {
      alert("시간은 숫자로 입력해주세요!");
      return;
    }

    if (!isValidTime(inputData)) {
      alert("시간 범위를 올바르게 입력해주세요!");
      return;
    }

    const res = await existDuplicatedTask(inputData);
    if (res) {
      alert("중복되는 일정이 있어요!");
      return;
    }

    addData(inputData);
    setIsOpen(false);
  };

  return (
    <>
      <button
        style={{
          width: "100%",
          background: "tomato",
          padding: "0.5rem 0",

          border: "none",
          borderRadius: "1rem",

          color: "white",
          fontSize: "1.1rem",
          fontFamily: "Pretendard Variable",
          fontWeight: 500,

          cursor: "pointer",
        }}
        onClick={() => {
          setIsOpen(true);
          setInputData(getDefaultInputData());
          setPlaceholderData({
            ...getDefaultInputData(),
            title: "할 일을 입력해주세요",
          });
        }}
      >
        + 추가하기
      </button>

      {isOpen && (
        <>
          <div
            style={{
              background: "#0005",
              position: "fixed",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,

              zIndex: 10,
            }}
            onClick={() => {
              setIsOpen(false);
            }}
          />
          <div
            style={{
              background: "#fff",
              width: "80vw",
              maxWidth: "400px",
              position: "fixed",
              zIndex: 11,
              top: "10vh",
              left: "max(10vw , calc((100vw - 400px) / 2))",
              padding: "3rem 0",

              borderRadius: "1.5rem",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
              }}
            >
              <TaskInput
                inputData={inputData}
                setInputData={setInputData}
                placeholderData={placeholderData}
                categoryData={categoryData}
              />

              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "center",
                }}
              >
                <BasicButton title="취소" onClick={handleCancleClick} />
                <BasicButton title="추가" onClick={handleAddClick} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
