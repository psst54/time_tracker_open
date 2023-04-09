import react from "react";
import React from "react";

import type { TaskInputType } from "@/types";

export const CategorySelector = ({
  categoryData,
  inputData,
  setInputData,
}: {
  categoryData: any;
  inputData: TaskInputType;
  setInputData: Function;
}) => {
  const [isOpen, setIsOpen] = react.useState(false);
  const [isHover, setIsHover] = react.useState<boolean[]>(
    Object.keys(categoryData).map((_) => false)
  );

  const handleMouseEnter = (idx: number) => {
    setIsHover((oldState: boolean[]) =>
      oldState.map((item, hoverItemIdx) => (idx === hoverItemIdx ? true : item))
    );
  };

  const handleMouseLeave = (idx: number) => {
    setIsHover((oldState: boolean[]) =>
      oldState.map((item, hoverItemIdx) =>
        idx === hoverItemIdx ? false : item
      )
    );
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        onClick={() => {
          setIsOpen((oldState) => !oldState);
          setIsHover(Object.keys(categoryData).map((_) => false));
        }}
        style={{
          background: "white",
          padding: "0.2rem 0.5rem",
          border: "1px solid black",
          borderRadius: "0.5rem",
          width: "8rem",
          cursor: "pointer",

          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p>
          {categoryData[inputData.categoryId]
            ? categoryData[inputData.categoryId].emoji
            : ""}{" "}
          {categoryData[inputData.categoryId]
            ? categoryData[inputData.categoryId].title
            : ""}
        </p>
        <img
          src="/triangle.svg"
          style={{
            width: "1rem",
            height: "1rem",
            transform: isOpen ? "none" : "rotate(0.5turn)",
          }}
        />
      </div>

      {isOpen && (
        <>
          <div
            onClick={() => {
              setIsOpen(false);
            }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
            }}
          />
          <div
            style={{
              position: "absolute",
              background: "white",

              marginTop: "0.5rem",
              padding: "0.5rem 0.5rem",

              border: "1px solid black",
              borderRadius: "0.5rem",

              zIndex: 1,
            }}
          >
            {Object.keys(categoryData)
              .sort((a: string, b: string) => {
                if (categoryData[a].title > categoryData[b].title) return 1;
                return -1;
              })
              .map((item, idx: number) => {
                const isCurrentItemHover = isHover[idx];

                return (
                  <p
                    key={idx}
                    onMouseEnter={() => handleMouseEnter(idx)}
                    onMouseLeave={() => handleMouseLeave(idx)}
                    onClick={() => {
                      setInputData((oldState: TaskInputType) => {
                        return {
                          ...oldState,
                          categoryId: categoryData[item].id,
                        };
                      });
                      setIsOpen(false);
                    }}
                    style={{
                      padding: "0.2rem 0.5rem",
                      cursor: "pointer",
                      fontWeight: isCurrentItemHover ? 900 : 400,
                    }}
                  >
                    {categoryData[item] ? categoryData[item].emoji : ""}{" "}
                    {categoryData[item] ? categoryData[item].title : ""}
                  </p>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
};
