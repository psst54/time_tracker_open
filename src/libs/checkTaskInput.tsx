import type { TaskInputType } from "@/types";

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

const hasEmptyField = (inputData: TaskInputType) => {
  return !(
    inputData.title &&
    inputData.startHour &&
    inputData.startMinute &&
    inputData.endHour &&
    inputData.endMinute &&
    inputData.categoryId
  );
};

const isStringNumber = (str: string) => {
  for (let i = 0; i < str.length; i++) {
    if (!("0" <= str[i] && str[i] <= "9")) return false;
  }
  return true;
};
const isTimeNumber = (inputData: TaskInputType) => {
  return (
    isStringNumber(inputData.startHour) &&
    isStringNumber(inputData.startMinute) &&
    isStringNumber(inputData.endHour) &&
    isStringNumber(inputData.endMinute)
  );
};

const isValidTime = (inputData: TaskInputType) => {
  const startHour = parseInt(inputData.startHour);
  const startMinute = parseInt(inputData.startMinute);
  const endHour = parseInt(inputData.endHour);
  const endMinute = parseInt(inputData.endMinute);

  const start = new Date(
    inputData.startYearMonth.getFullYear(),
    inputData.startYearMonth.getMonth(),
    inputData.startYearMonth.getDate(),
    startHour,
    startMinute
  );
  const end = new Date(
    inputData.endYearMonth.getFullYear(),
    inputData.endYearMonth.getMonth(),
    inputData.endYearMonth.getDate(),
    endHour,
    endMinute
  );

  return (
    0 <= startHour &&
    startHour < 24 &&
    startMinute >= 0 &&
    startMinute < 60 &&
    endHour >= 0 &&
    endHour < 24 &&
    endMinute >= 0 &&
    endMinute < 60 &&
    start <= end
  );
};

const existDuplicatedTask = async (inputData: TaskInputType) => {
  const start =
    new Date(
      inputData.startYearMonth.getFullYear(),
      inputData.startYearMonth.getMonth(),
      inputData.startYearMonth.getDate(),
      parseInt(inputData.startHour),
      parseInt(inputData.startMinute)
    ).getTime() / 1000;
  const end =
    new Date(
      inputData.endYearMonth.getFullYear(),
      inputData.endYearMonth.getMonth(),
      inputData.endYearMonth.getDate(),
      parseInt(inputData.endHour),
      parseInt(inputData.endMinute)
    ).getTime() / 1000;

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

  const dateArr: Date[] = [];

  let curDate = startDate;
  while (true) {
    if (curDate <= endDate) {
      dateArr.push(curDate);

      curDate = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        curDate.getDate() + 1
      );
    } else break;
  }

  const re = await Promise.all(
    dateArr.map(async (keyDate: Date) => {
      const q = query(
        collection(
          db,
          process.env.NEXT_PUBLIC_DB_TASK ? process.env.NEXT_PUBLIC_DB_TASK : ""
        ),
        where("dateArr", "array-contains", keyDate.toISOString())
      );

      const querySnapshot = await getDocs(q);
      const ret: boolean[] = [];

      querySnapshot.forEach((doc) => {
        const item = doc.data();

        if (
          doc.id !== inputData.id &&
          ((item.start.seconds < start && start < item.end.seconds) ||
            (item.start.seconds < end && end < item.end.seconds) ||
            (start < item.start.seconds && item.start.seconds < end) ||
            (start < item.end.seconds && item.end.seconds < end))
        ) {
          ret.push(true);
        }
      });

      if (ret.length >= 1) return 1;
      else return 0;
    })
  );

  return re.filter((item) => item === 1).length !== 0;
};

export { hasEmptyField, isTimeNumber, isValidTime, existDuplicatedTask };
