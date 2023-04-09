import react from "react";
import React from "react";

import { CategoryForm } from "@/components/categories/categoryForm";

export const GoEditButton = ({
  item,
  inputData,
  setInputData,
  onClick,
  handleMouseLeave,
}: {
  item: any;
  inputData: any;
  setInputData: any;
  onClick: Function;
  handleMouseLeave: Function;
}) => {
  const [isOpen, setIsOpen] = react.useState(false);
  const [placeholderData, setPlaceholderData] = react.useState({ title: "" });

  return (
    <>
      <button
        style={{
          background: "transparent",
          border: "none",

          cursor: "pointer",
        }}
        onClick={() => {
          setIsOpen(true);
          setInputData(item);
          setPlaceholderData({
            title: "카테고리 이름을 입력해주세요",
          });
        }}
      >
        <img
          src="/pencil_twitter.png"
          style={{
            width: "1.4rem",
            height: "1.4rem",
          }}
        />
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
