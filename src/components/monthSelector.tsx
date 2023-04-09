import react from "react";
import React from "react";

export const MonthSelector = ({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: Date;
  setSelectedDate: Function;
}) => {
  const monthData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const getYearList = (firstYear: number) => {
    const tmp = [];
    for (let year = firstYear; year <= firstYear + 11; year++) tmp.push(year);

    const ret = [];
    for (let i = 0; i < tmp.length / 3; i++)
      ret.push([tmp[i * 3 + 0], tmp[i * 3 + 1], tmp[i * 3 + 2]]);

    return ret;
  };

  const [isOpen, setIsOpen] = react.useState(false);
  const [firstYear, setFirstYear] = react.useState(
    selectedDate.getFullYear() - 7
  );
  const [yearList, setYearList] = react.useState(getYearList(firstYear));
  const [hoveredMonth, setHoveredMonth] = react.useState<number | undefined>(
    undefined
  );

  const handleMouseEnter = (month: number) => {
    setHoveredMonth(month);
  };

  const handleMouseLeave = () => {
    setHoveredMonth(undefined);
  };

  const handleMonthClick = (targetMonth: number) => {
    setSelectedDate(
      new Date(
        selectedDate.getFullYear(),
        targetMonth - 1,
        selectedDate.getDate()
      )
    );
    setIsOpen(false);
  };

  const goCurrentYear = () => {
    setFirstYear(selectedDate.getFullYear() - 7);
    setYearList(getYearList(selectedDate.getFullYear() - 7));
  };
  const goPrevYear = () => {
    setFirstYear(firstYear - 12);
    setYearList(getYearList(firstYear - 12));
  };
  const goNextYear = () => {
    setFirstYear(firstYear + 12);
    setYearList(getYearList(firstYear + 12));
  };

  react.useEffect(() => {
    const start = selectedDate.getFullYear() - 7;
    setFirstYear(start);
    setYearList(getYearList(start));
  }, [selectedDate]);

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => {
          setIsOpen(true);
        }}
        style={{
          display: "flex",
          gap: "0.5rem",
          alignItems: "center",

          background: "transparent",
          border: "none",
          fontSize: "1rem",

          cursor: "pointer",
        }}
      >
        <p>{selectedDate.getMonth() + 1}월</p>
        <img
          src="/triangle.svg"
          style={{
            width: "0.6rem",
            height: "0.6rem",
            transform: "rotate(0.5turn)",
          }}
        />
      </button>

      {isOpen && (
        <>
          <div
            style={{
              background: "transparent",
              position: "fixed",
              width: "100vw",
              height: "100vh",
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
              position: "absolute",
              background: "white",
              width: "4rem",

              marginTop: "0.5rem",
              padding: "0.5rem 0.5rem",

              border: "2px solid #0003",
              borderRadius: "0.5rem",

              zIndex: 11,
            }}
          >
            {monthData.map((item: number, idx: number) => {
              const isCurrentItemHover = item === hoveredMonth;

              return (
                <p
                  key={idx}
                  onMouseEnter={() => {
                    handleMouseEnter(item);
                  }}
                  onMouseLeave={() => {
                    handleMouseLeave();
                  }}
                  onClick={() => {
                    handleMonthClick(item);
                  }}
                  style={{
                    padding: "0.2rem 0",
                    cursor: "pointer",
                    fontWeight: isCurrentItemHover ? 900 : 400,
                  }}
                >
                  {item}
                </p>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
