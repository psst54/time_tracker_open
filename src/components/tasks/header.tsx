import { DateSelector } from "@/components/tasks/dateSelector";

const containerStyle = {
  display: "flex",
  gap: "1rem",
  alignItems: "center",
  marginBottom: "2rem",
};

const buttonStyle = {
  padding: "0.5rem 1rem",
  background: "transparent",
  border: "none",
  cursor: "pointer",
};

const imgStyle = {
  width: "1rem",
  height: "1rem",
};
const leftImage = { ...imgStyle, transform: "rotate(0.75turn)" };
const rightImage = { ...imgStyle, transform: "rotate(0.25turn)" };

export const Header = ({
  currentDate,
  setCurrentDate,
}: {
  currentDate: Date;
  setCurrentDate: Function;
}) => {
  const goPrevDate = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - 1
      )
    );
  };
  const goNextDate = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 1
      )
    );
  };

  return (
    <div style={containerStyle}>
      <button
        style={buttonStyle}
        onClick={() => {
          goPrevDate();
        }}
      >
        <img src="/triangle.svg" style={leftImage} />
      </button>

      <DateSelector
        selectedDate={currentDate}
        setSelectedDate={(targetDate: Date) => {
          setCurrentDate(targetDate);
        }}
      />
      <button
        style={buttonStyle}
        onClick={() => {
          goNextDate();
        }}
      >
        <img src="/triangle.svg" style={rightImage} />
      </button>
    </div>
  );
};
