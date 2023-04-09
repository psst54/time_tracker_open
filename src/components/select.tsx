import react from "react";
import React from "react";

import type { SortDataType } from "@/types";

export const Select = ({
  sortData,
  sortMethod,
  setSortMethod,
}: {
  sortData: SortDataType[];
  sortMethod: any;
  setSortMethod: any;
}) => {
  const [isOpen, setIsOpen] = react.useState(false);
  const [isHover, setIsHover] = react.useState<boolean[]>(
    sortData.map((_: SortDataType) => false)
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
          setIsHover(sortData.map((_: SortDataType) => false));
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
          {
            sortData.filter(
              (item: SortDataType) => item.title === sortMethod
            )[0].title
          }
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
              width: "8rem",

              marginTop: "0.5rem",
              padding: "0.5rem 0.5rem",

              border: "1px solid black",
              borderRadius: "0.5rem",

              zIndex: 1,
            }}
          >
            {sortData.map((item: SortDataType, idx: number) => {
              const isCurrentItemHover = isHover[idx];

              return (
                <p
                  key={idx}
                  onMouseEnter={() => handleMouseEnter(idx)}
                  onMouseLeave={() => handleMouseLeave(idx)}
                  onClick={() => {
                    setSortMethod(item.title);
                    setIsOpen(false);
                  }}
                  style={{
                    padding: "0.2rem 0",
                    cursor: "pointer",
                    fontWeight: isCurrentItemHover ? 900 : 400,
                  }}
                >
                  {item.title}
                </p>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
