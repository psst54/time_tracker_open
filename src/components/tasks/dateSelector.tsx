import react from "react";
import React from "react";
import { YearSelector } from "@components/yearSelector";
import { MonthSelector } from "@components/monthSelector";

const titleStyle = {
  padding: "0.5rem 1rem",
  background: "transparent",
  border: "none",

  fontSize: "1.2rem",
  fontWeight: 500,

  cursor: "pointer",
};

export const DateSelector = ({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: Date;
  setSelectedDate: Function;
}) => {
  const [isOpen, setIsOpen] = react.useState(false);

  const [hoveredDate, setHoveredDate] = react.useState<Date | undefined>(
    undefined
  );

  const dayData = ["일", "월", "화", "수", "목", "금", "토"];
  const getTitle = (date: Date) => {
    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일 (${dayData[date.getDay()]}요일)`;
  };

  const handleMouseEnter = (date: Date) => {
    if (selectedDate.getMonth() === date.getMonth())
      setHoveredDate((oldState) => date);
  };

  const handleMouseLeave = () => {
    setHoveredDate((oldState) => undefined);
  };

  const handleDateClick = (targetDate: Date) => {
    setSelectedDate(targetDate);
    setIsOpen(false);
  };
  const goToday = () => {
    const now = new Date();
    setSelectedDate(new Date(now.getFullYear(), now.getMonth(), now.getDate()));
    setIsOpen(false);
  };

  const getDateList = (targetYear: number, targetMonth: number) => {
    const prevMonthLastDay = new Date(targetYear, targetMonth - 1, 0).getDay();
    const prevMonthLastDate = new Date(
      targetYear,
      targetMonth - 1,
      0
    ).getDate();
    const curMonthLastDay = new Date(targetYear, targetMonth, 0).getDay();
    const curMonthLastDate = new Date(targetYear, targetMonth, 0).getDate();

    let prevMonthLastWeek = [];
    for (let i = 0; i < prevMonthLastDay; i++) {
      prevMonthLastWeek.unshift(
        new Date(targetYear, targetMonth - 2, prevMonthLastDate - i)
      );
    }

    let NextMonthFirstWeek = [];
    if (curMonthLastDay !== 0)
      for (let i = 1; i < 7 - curMonthLastDay + 1; i++) {
        NextMonthFirstWeek.push(new Date(targetYear, targetMonth, i));
      }

    const curMonthDate = Array.from(Array(curMonthLastDate + 1).keys()).slice(
      1
    );
    let curMonth: Date[] = [];

    curMonthDate.forEach((date) => {
      curMonth = curMonth.concat(new Date(targetYear, targetMonth - 1, date));
    });

    return prevMonthLastWeek.concat(curMonth, NextMonthFirstWeek);
  };

  const getWeekList = (dateList: Date[]) => {
    let weekList: Date[][] = [];
    for (let i = 0; i < dateList.length / 7; i++)
      weekList = weekList.concat([
        [
          dateList[i * 7],
          dateList[i * 7 + 1],
          dateList[i * 7 + 2],
          dateList[i * 7 + 3],
          dateList[i * 7 + 4],
          dateList[i * 7 + 5],
          dateList[i * 7 + 6],
        ],
      ]);
    return weekList;
  };

  const [dateList, setDateList] = react.useState<Date[]>(
    getDateList(selectedDate.getFullYear(), selectedDate.getMonth() + 1)
  );
  const [weekList, setWeekList] = react.useState(getWeekList(dateList));
  const weekData = ["월", "화", "수", "목", "금", "토", "일"];

  const isEqualDay = (a: Date, b: Date) => {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  };

  react.useEffect(() => {
    setDateList(
      getDateList(selectedDate.getFullYear(), selectedDate.getMonth() + 1)
    );
  }, [selectedDate]);

  react.useEffect(() => {
    setWeekList(getWeekList(dateList));
  }, [dateList]);

  return (
    <div>
      <button
        style={titleStyle}
        onClick={() => {
          setIsOpen(true);
          getDateList(selectedDate.getFullYear(), selectedDate.getMonth() + 1);
        }}
      >
        {getTitle(selectedDate)}
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
              minWidth: "300px",
              maxWidth: "400px",
              position: "fixed",
              zIndex: 11,
              top: "10vh",
              left: "max(10vw , calc((100vw - 400px) / 2))",
              padding: "3rem 0",

              borderRadius: "1.5rem",

              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.2rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                  padding: "0 0.5rem",
                }}
              >
                <div
                  style={{ display: "flex", gap: "1rem", alignItems: "center" }}
                >
                  <YearSelector
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                  />
                  <MonthSelector
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                  />
                </div>

                <button
                  style={{
                    background: "transparent",
                    border: "1px solid black",
                    borderRadius: "0.5rem",
                    padding: "0.2rem 0.5rem",

                    fontSize: "1rem",

                    cursor: "pointer",
                  }}
                  onClick={() => {
                    goToday();
                  }}
                >
                  오늘
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "0.2rem",
                }}
              >
                {weekData.map((weekName, weekIdx) => (
                  <div
                    key={weekIdx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",

                      width: "2rem",
                      height: "2rem",

                      color: "#bbb",
                      fontSize: "0.9rem",
                    }}
                  >
                    {weekName}
                  </div>
                ))}
              </div>
              {weekList.map((weekItem, weekIdx) => (
                <div
                  key={weekIdx}
                  style={{
                    display: "flex",
                    gap: "0.2rem",
                  }}
                >
                  {weekItem.map((dateItem: Date, dateIdx: number) => {
                    const isToday = isEqualDay(selectedDate, dateItem);
                    const isPrevMonth =
                      (dateItem.getMonth() + 1) % 12 ===
                      selectedDate.getMonth();
                    const isNextMonth =
                      (selectedDate.getMonth() + 1) % 12 ===
                      dateItem.getMonth();

                    return (
                      <div
                        key={dateIdx}
                        style={
                          {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",

                            width: "2rem",
                            height: "2rem",

                            color: isToday ? "#fff" : "black",
                            fontWeight: isToday && 500,
                            background: isToday
                              ? "#ff6347"
                              : hoveredDate === dateItem
                              ? "#ff634733"
                              : "none",
                            borderRadius: "1rem",

                            cursor: !(isPrevMonth || isNextMonth) && "pointer",
                          } as react.CSSProperties
                        }
                        onMouseEnter={() => handleMouseEnter(dateItem)}
                        onMouseLeave={() => handleMouseLeave()}
                        onClick={() => {
                          handleDateClick(dateItem);
                        }}
                      >
                        {!(isPrevMonth || isNextMonth) && dateItem.getDate()}
                      </div>
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
