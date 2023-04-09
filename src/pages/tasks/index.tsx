import react from "react";
import React from "react";
import Head from "next/head";

import { TaskInput } from "@components/taskInput";
import { BasicButton } from "@components/basicButton";

import { Header } from "@components/tasks/header";
import { Table } from "@components/tasks/table";

import {
  collection,
  doc,
  updateDoc,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { database as db } from "@libs/firebase";
import { checkBatchimEnding } from "@libs/checkBatchimEnding";

import {
  hasEmptyField,
  isTimeNumber,
  isValidTime,
  existDuplicatedTask,
} from "@/libs/checkTaskInput";
import { TaskListContainer } from "@/components/tasks/taskListContainer";

import type { TaskType, CategoryType, TaskInputType } from "@/types";

export default function Home() {
  const getInitialDate = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  };

  const [currentDate, setCurrentDate] = react.useState<Date>(getInitialDate());
  const [data, setData] = react.useState<TaskType[]>([]);
  const [categoryData, setCategoryData] = react.useState<{
    [key: string]: CategoryType;
  }>({});

  const getData = async () => {
    const dataArr: TaskType[] = [];

    const q = query(
      collection(
        db,
        process.env.NEXT_PUBLIC_DB_TASK ? process.env.NEXT_PUBLIC_DB_TASK : ""
      ),
      where("dateArr", "array-contains", currentDate.toISOString())
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const item = doc.data();

      const startDate = new Date(item.start.seconds * 1000);
      const endDate = new Date(item.end.seconds * 1000);

      dataArr.push({
        id: doc.id,
        title: item.title,
        start: startDate,
        end: endDate,
        categoryId: item.categoryId,
      });
    });

    setData(dataArr);
  };

  const getCategoryData = async () => {
    const newData: { [key: string]: CategoryType } = {};

    const q = query(
      collection(
        db,
        process.env.NEXT_PUBLIC_DB_CATEGORY
          ? process.env.NEXT_PUBLIC_DB_CATEGORY
          : ""
      )
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const item = doc.data();

      newData[doc.id] = {
        title: item.title,
        color: item.color,
        emoji: item.emoji,
        index: item.index,
        id: doc.id,
      };
    });

    setCategoryData(newData);
  };

  react.useEffect(() => {
    getCategoryData();
  }, []);
  react.useEffect(() => {
    getData();
  }, [currentDate]);

  const [hoveredId, setHoveredId] = react.useState<string>("");
  const [editingId, setEditingId] = react.useState<string>("");

  const basicInputData: TaskInputType = {
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

  const [inputData, setInputData] =
    react.useState<TaskInputType>(basicInputData);
  const [placeholderData, setPlaceholderData] =
    react.useState<TaskInputType>(basicInputData);

  const handleMouseEnter = (item: any) => {
    setHoveredId((oldState) => item.id);
  };

  const editData = async (inputData: TaskInputType) => {
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

    const oldData = data.filter((dataItem) => dataItem.id === editingId)[0];

    const ref = doc(
      db,
      process.env.NEXT_PUBLIC_DB_TASK ? process.env.NEXT_PUBLIC_DB_TASK : "",
      editingId
    );
    const res = await updateDoc(ref, {
      ...oldData,
      title: inputData.title,
      start,
      end,
      dateArr,
      categoryId: inputData.categoryId,
    });

    setData(
      data.map((dataItem: TaskType) =>
        dataItem.id === editingId
          ? {
              ...dataItem,
              title: inputData.title,
              start,
              end,
              categoryId: inputData.categoryId,
            }
          : dataItem
      )
    );
  };

  const handleMouseLeave = (item: any) => {
    setHoveredId((oldState) => "");
  };

  const handleMouseClickEdit = (item: any) => {
    setEditingId(() => item.id);
    setInputData({
      id: item.id,
      title: item.title,

      startYearMonth: new Date(
        item.start.getFullYear(),
        item.start.getMonth(),
        item.start.getDate()
      ),
      startHour: item.start.getHours().toString(),
      startMinute: item.start.getMinutes().toString(),

      endYearMonth: new Date(
        item.end.getFullYear(),
        item.end.getMonth(),
        item.end.getDate()
      ),
      endHour: item.end.getHours().toString(),
      endMinute: item.end.getMinutes().toString(),

      categoryId: item.categoryId,
    });
    setPlaceholderData({
      id: item.id,
      title: item.title,

      startYearMonth: new Date(
        item.start.getFullYear(),
        item.start.getMonth(),
        item.start.getDate()
      ),
      startHour: item.start.getHours().toString(),
      startMinute: item.start.getMinutes().toString(),

      endYearMonth: new Date(
        item.end.getFullYear(),
        item.end.getMonth(),
        item.end.getDate()
      ),
      endHour: item.end.getHours().toString(),
      endMinute: item.end.getMinutes().toString(),

      categoryId: item.categoryId,
    });
  };

  const handleMouseClickDelete = async (item: TaskType) => {
    if (
      window.confirm(
        `${item.title}${
          checkBatchimEnding(item.title) ? "을" : "를"
        } 삭제합니다`
      )
    ) {
      await deleteDoc(
        doc(
          db,
          process.env.NEXT_PUBLIC_DB_TASK
            ? process.env.NEXT_PUBLIC_DB_TASK
            : "",
          item.id ? item.id : ""
        )
      );

      setData(data.filter((dataItem) => dataItem.id !== item.id));
    }
  };

  const handleEditClick = async () => {
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

    editData(inputData);
    setEditingId("");
  };
  const handleCancleClick = () => {
    setEditingId("");
  };

  return (
    <div>
      <Head>
        <title>time tracker</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0"
        />
        <link rel="shortcut icon" href="favicon.ico" />
      </Head>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "3rem",
        }}
      >
        <Header currentDate={currentDate} setCurrentDate={setCurrentDate} />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            flexWrap: "wrap",
            columnGap: "5rem",
            rowGap: "5rem",

            padding: "1rem 1rem 1rem 1rem",
          }}
        >
          <Table
            data={data}
            categoryData={categoryData}
            currentDate={currentDate}
            hoveredId={hoveredId}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            handleMouseClick={handleMouseClickEdit}
          />

          <TaskListContainer
            data={data}
            setData={setData}
            categoryData={categoryData}
            hoveredId={hoveredId}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            handleMouseClickEdit={handleMouseClickEdit}
            handleMouseClickDelete={handleMouseClickDelete}
            currentDate={currentDate}
          />
        </div>

        {editingId !== "" && (
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
                setEditingId("");
              }}
            />
            <div
              style={{
                background: "#fff",
                width: "80vw",
                maxWidth: "400px",
                position: "absolute",
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
                  <BasicButton title="수정" onClick={handleEditClick} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
