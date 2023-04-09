import react from "react";
import React from "react";

export const YearSelector = ({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: Date;
  setSelectedDate: Function;
}) => {
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
  const [hoveredYear, setHoveredYear] = react.useState<number | undefined>(
    undefined
  );

  const handleMouseEnter = (year: number) => {
    setHoveredYear(year);
  };

  const handleMouseLeave = () => {
    setHoveredYear(undefined);
  };

  const handleYearClick = (targetYear: number) => {
    const targetDate = new Date(selectedDate);
    targetDate.setUTCFullYear(targetYear);
    setSelectedDate(targetDate);
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
    <div>
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
        <p>{selectedDate.getFullYear()}년</p>
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
              background: "#0005",
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
              background: "#fff",
              width: "80vw",
              minWidth: "250px",
              maxWidth: "300px",
              position: "fixed",
              zIndex: 11,
              top: "12vh",
              left: "max(20vw , calc((100vw - 300px) / 2))",
              padding: "2rem 0",

              borderRadius: "1.5rem",

              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
              <button
                style={{
                  padding: "0.5rem 1rem",

                  background: "transparent",
                  border: "none",

                  cursor: "pointer",
                }}
                onClick={() => {
                  goPrevYear();
                }}
              >
                <img
                  src="/triangle.svg"
                  style={{
                    width: "1rem",
                    height: "1rem",
                    transform: "rotate(0.75turn)",
                  }}
                />
              </button>
              <button
                style={{
                  padding: "0.5rem 1rem",

                  background: "transparent",
                  border: "none",

                  fontSize: "1rem",

                  cursor: "pointer",
                }}
                onClick={() => {
                  goCurrentYear();
                }}
              >
                {selectedDate.getFullYear()}
              </button>
              <button
                style={{
                  padding: "0.5rem 1rem",

                  background: "transparent",
                  border: "none",

                  cursor: "pointer",
                }}
                onClick={() => {
                  goNextYear();
                }}
              >
                <img
                  src="/triangle.svg"
                  style={{
                    width: "1rem",
                    height: "1rem",
                    transform: "rotate(0.25turn)",
                  }}
                />
              </button>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {yearList.map((yearItemRow, rowIdx: number) => (
                <div
                  key={rowIdx}
                  style={{
                    display: "flex",
                  }}
                >
                  {yearItemRow.map((yearItem, colIdx: number) => {
                    const isToday = yearItem === selectedDate.getFullYear();

                    return (
                      <p
                        key={colIdx}
                        style={
                          {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",

                            color: isToday ? "#fff" : "black",
                            fontWeight: isToday && 500,
                            background: isToday
                              ? "#ff6347"
                              : hoveredYear === yearItem
                              ? "#ff634733"
                              : "none",

                            borderRadius: "0.5rem",
                            width: "5rem",
                            height: "3rem",
                          } as react.CSSProperties
                        }
                        onMouseEnter={() => handleMouseEnter(yearItem)}
                        onMouseLeave={() => handleMouseLeave()}
                        onClick={() => {
                          handleYearClick(yearItem);
                        }}
                      >
                        {yearItem}
                      </p>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
