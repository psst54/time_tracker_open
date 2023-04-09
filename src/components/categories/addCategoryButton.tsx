import react from "react";
import React from "react";

import { CategoryForm } from "@/components/categories/categoryForm";

const generateId = () => {
  const data = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let time = new Date().getTime();
  time *= time;
  let ret = "";
  while (time) {
    ret += data[time % data.length];
    time = Math.floor(time / data.length);
  }

  return ret;
};

export const AddCategoryButton = ({
  inputData,
  setInputData,
  onClick,
  handleMouseLeave,
}: {
  inputData: any;
  setInputData: any;
  onClick: Function;
  handleMouseLeave: Function;
}) => {
  const [isOpen, setIsOpen] = react.useState(false);

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
          setInputData({
            title: "",
            color: "#FF6347",
            emoji: "😀",
            id: generateId(),
            index: -1,
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
              handleMouseLeave();
            }}
          />

          <CategoryForm
            setIsOpen={setIsOpen}
            inputData={inputData}
            setInputData={setInputData}
            onClick={onClick}
            handleMouseLeave={handleMouseLeave}
          />
        </>
      )}
    </>
  );
};
