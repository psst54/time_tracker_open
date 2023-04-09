import react from "react";
import React from "react";
import Head from "next/head";

import type { CategoryType } from "@/types";

import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { database as db } from "@libs/firebase";
import { checkBatchimEnding } from "@libs/checkBatchimEnding";
import { hasEmptyField, isColorValid } from "@/libs/checkCategoryInput";

import { GoEditButton } from "@/components/categories/goEditButton";
import { AddCategoryButton } from "@components/categories/addCategoryButton";

export default function Home() {
  const [categoryData, setCategoryData] = react.useState<{
    [key: string]: CategoryType;
  }>({});

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

  const [hovered, setHovered] = react.useState<boolean[]>([]);

  const [inputData, setInputData] = react.useState<CategoryType>({
    title: "",
    color: "#FF6347",
    emoji: "😀",
    index: -1,
    id: "",
  });

  const handleMouseEnter = (idx: number) => {
    setHovered((oldState: boolean[]) =>
      oldState.map((_, hoverItemIdx) => (idx === hoverItemIdx ? true : false))
    );
  };

  const handleMouseLeave = () => {
    setHovered((oldState: boolean[]) => oldState.map((_) => false));
  };

  const addCategoryData = async () => {
    if (hasEmptyField(inputData)) {
      alert("빈칸을 모두 채워주세요!");
      return false;
    }

    if (!isColorValid(inputData.color)) {
      alert("색상 코드가 올바르지 않습니다!");
      return false;
    }

    await setDoc(
      doc(
        db,
        process.env.NEXT_PUBLIC_DB_CATEGORY
          ? process.env.NEXT_PUBLIC_DB_CATEGORY
          : "",
        inputData.id
      ),
      inputData
    );

    setCategoryData((data) => {
      const newData = { ...categoryData };
      newData[inputData.id] = inputData;

      return newData;
    });
    return true;
  };

  const editCategoryData = async () => {
    if (hasEmptyField(inputData)) {
      alert("빈칸을 모두 채워주세요!");
      return false;
    }

    if (!isColorValid(inputData.color)) {
      alert("색상 코드가 올바르지 않습니다!");
      return false;
    }

    const ref = doc(
      db,
      process.env.NEXT_PUBLIC_DB_CATEGORY
        ? process.env.NEXT_PUBLIC_DB_CATEGORY
        : "",
      inputData.id
    );
    const data = { ...inputData };
    const res = await updateDoc(ref, data);

    setCategoryData((oldState: { [key: string]: CategoryType }) => {
      const newData = { ...oldState };
      newData[inputData.id] = inputData;
      return newData;
    });
    return true;
  };

  const deleteCategoryData = async (item: CategoryType) => {
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
          process.env.NEXT_PUBLIC_DB_CATEGORY
            ? process.env.NEXT_PUBLIC_DB_CATEGORY
            : "",
          item.id
        )
      );

      setCategoryData((oldState) => {
        const newData = { ...oldState };
        delete newData[item.id];

        return newData;
      });
    }
  };

  react.useEffect(() => {
    getCategoryData();
  }, []);

  react.useEffect(() => {
    setHovered(Object.keys(categoryData).map((_) => false));
  }, [categoryData]);

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
          width: "30vw",
          minWidth: "400px",
          margin: "auto",
          marginTop: "3rem",

          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <AddCategoryButton
          inputData={inputData}
          setInputData={setInputData}
          onClick={addCategoryData}
          handleMouseLeave={handleMouseLeave}
        />

        <div>
          {Object.keys(categoryData)
            .sort((a: string, b: string) => {
              if (categoryData[a].title > categoryData[b].title) return 1;
              return -1;
            })
            .map((id: string, idx: number) => {
              const isHovered = hovered[idx];

              return (
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    padding: "1rem 1rem",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  key={idx}
                  onMouseEnter={() => handleMouseEnter(idx)}
                  onMouseLeave={() => handleMouseLeave()}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      alignItems: "center",
                      background: isHovered
                        ? `linear-gradient(180deg, rgba(255,255,255,0) 50%, ${categoryData[id].color}55 50%)`
                        : "transparent",

                      paddingRight: "1rem",
                    }}
                  >
                    <h3>{categoryData[id].emoji}</h3>

                    <h3>{categoryData[id].title}</h3>

                    <div
                      style={{
                        width: "1.2rem",
                        height: "1.2rem",
                        background: `${categoryData[id].color}`,
                        border: "1ps solid black",
                        borderRadius: "0.3rem",
                      }}
                    />
                  </div>

                  {isHovered && (
                    <div style={{ display: "flex", gap: "1rem" }}>
                      <GoEditButton
                        item={categoryData[id]}
                        inputData={inputData}
                        setInputData={setInputData}
                        onClick={editCategoryData}
                        handleMouseLeave={handleMouseLeave}
                      />

                      <button
                        style={{
                          background: "transparent",
                          border: "none",

                          cursor: "pointer",
                        }}
                        onClick={() => {
                          deleteCategoryData(categoryData[id]);
                        }}
                      >
                        <img
                          src="/crossMark_twitter.png"
                          style={{
                            width: "1.4rem",
                            height: "1.4rem",
                          }}
                        />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
