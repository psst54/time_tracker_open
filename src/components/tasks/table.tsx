import type { TaskType, CategoryType } from "@/types";

export const Table = ({
  data,
  categoryData,
  currentDate,
  hoveredId,
  handleMouseEnter,
  handleMouseLeave,
  handleMouseClick,
}: {
  data: any;
  categoryData: { [key: string]: CategoryType };
  currentDate: Date;
  hoveredId: string;
  handleMouseEnter: Function;
  handleMouseLeave: Function;
  handleMouseClick: Function;
}) => {
  const arr = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];

  return (
    <div
      style={{
        display: "relative",
      }}
    >
      {arr.map((time, idx) => (
        <div style={{ display: "flex", alignItems: "center" }} key={idx}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",

              minWidth: "50px",
            }}
          >
            {time}
          </div>
          <div
            style={{
              height: "25px",
              width: "200px",
              minWidth: "200px",
              display: "flex",

              borderStyle: "solid",
              borderColor: "#ddd5",
              borderWidth: `1px 0 ${idx == 23 ? "1px" : 0} 0`,
            }}
          >
            {Array(6)
              .fill(0)
              .map((_, idx) => (
                <div
                  style={{
                    width: "16.67%",
                    height: "100%",

                    borderStyle: "solid",
                    borderColor: "#ddd5",
                    borderWidth: `0 ${idx == 5 ? "1px" : 0} 0 1px`,
                  }}
                  key={idx}
                />
              ))}
          </div>
        </div>
      ))}

      {data.map((item: TaskType, idx: number) => {
        const arr = [];
        const itemStart =
          (item.start.getTime() - currentDate.getTime()) / 1000 / 60;
        const itemEnd =
          (item.end.getTime() - currentDate.getTime()) / 1000 / 60;

        for (let i = 0; i < 24; i++) {
          const hourStart = i * 60;
          const hourEnd = (i + 1) * 60;

          if (hourStart <= itemStart && itemStart <= hourEnd) {
            arr.push({
              ...item,
              partStart: Math.max(hourStart, itemStart),
              partEnd: Math.min(hourEnd, itemEnd),
              category: item.categoryId,
            });
          } else if (hourStart < itemEnd && itemEnd <= hourEnd) {
            arr.push({
              ...item,
              partStart: Math.min(hourStart, itemEnd),
              partEnd: Math.min(hourEnd, itemEnd),
              category: item.categoryId,
            });
          } else if (itemStart <= hourStart && hourEnd <= itemEnd) {
            arr.push({
              ...item,
              partStart: hourStart,
              partEnd: hourEnd,
              category: item.categoryId,
            });
          }
        }

        return (
          <div key={idx}>
            {arr.map((arrItem) => {
              const isHover = hoveredId === arrItem.id;
              const color =
                Object.keys(categoryData).length !== 0 &&
                categoryData[arrItem.categoryId]
                  ? categoryData[arrItem.categoryId].color
                  : undefined;

              const background = `linear-gradient(to right, ${
                color ? color + "aa" : "transparent"
              } 2%, ${color ? color + "88" : "transparent"} 13%, ${
                color ? color + "aa" : "transparent"
              } 85%, ${color ? color + "ff" : "transparent"})`;

              const hoveredBackground = `linear-gradient(to right, ${
                color ? color + "dd" : "transparent"
              } 2%, ${color ? color + "bb" : "transparent"} 13%, ${
                color ? color + "dd" : "transparent"
              } 85%, ${color ? color + "ff" : "transparent"})`;

              const errorBackground = "#ccc3";
              const hoveredErrorbackground = "#ccc5";

              return (
                <div
                  key={`${arrItem.partStart}, ${arrItem.partEnd}`}
                  onMouseEnter={() => handleMouseEnter(arrItem)}
                  onMouseLeave={() => handleMouseLeave(arrItem)}
                  onClick={() => handleMouseClick(arrItem)}
                  style={{
                    position: "absolute",
                    width: `${
                      ((arrItem.partEnd - arrItem.partStart) / 60) * 200
                    }px`,
                    height: "25px",
                    marginTop: `calc(-25px * 24 + ${
                      Math.floor(arrItem.partStart / 60) * 25 + 1
                    }px)`,
                    marginLeft: `${
                      50 + ((arrItem.partStart % 60) / 60) * 200
                    }px`,
                    borderRadius: "0.3rem",
                    background: color
                      ? isHover
                        ? hoveredBackground
                        : background
                      : isHover
                      ? hoveredErrorbackground
                      : errorBackground,
                    cursor: "pointer",
                  }}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
