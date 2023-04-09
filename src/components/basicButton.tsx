const buttonStyle = {
  background: "white",
  padding: "0.2rem 0.5rem",
  borderRadius: "0.5rem",
  border: "1px solid black",

  cursor: "pointer",
};

export const BasicButton = ({
  title,
  onClick,
}: {
  title: string;
  onClick: Function;
}) => {
  return (
    <button
      style={buttonStyle}
      onClick={() => {
        onClick();
      }}
    >
      {title}
    </button>
  );
};
