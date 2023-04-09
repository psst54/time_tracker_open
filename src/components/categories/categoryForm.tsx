import react from "react";
import React from "react";
import EmojiPicker from "emoji-picker-react";
import { HexColorPicker } from "react-colorful";

import { BasicButton } from "@components/basicButton";

import type { CategoryType } from "@/types";

const inputBoxStyle = {
  background: "#0001",
  border: "none",
  borderRadius: "0.5rem",
  padding: "0.5rem 1rem",
  fontSize: "1rem",
};

const emojiButton = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  width: "2rem",
  height: "2rem",
  background: "transparent",
  border: "none",
  borderRadius: "0.5rem",

  fontSize: "1.5rem",

  cursor: "pointer",
};

export const CategoryForm = ({
  setIsOpen,
  inputData,
  setInputData,
  onClick,
  handleMouseLeave,
}: {
  setIsOpen: Function;
  inputData: any;
  setInputData: any;
  onClick: Function;
  handleMouseLeave: Function;
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = react.useState(false);
  const [showColorPicker, setShowColorPicker] = react.useState(false);

  const onEmojiClick = (res: any) => {
    setInputData((oldState: CategoryType) => {
      return { ...oldState, emoji: res.emoji };
    });
    setShowEmojiPicker(false);
  };

  const onClickOk = () => {
    handleMouseLeave();

    onClick().then((res: boolean) => {
      if (res) setIsOpen(false);
    });
  };

  return (
    <div
      style={{
        background: "#fff",
        width: "80vw",
        maxWidth: "400px",
        position: "fixed",
        zIndex: 11,
        top: "10vh",
        left: "max(10vw , calc((100vw - 400px) / 2))",
        padding: "3rem 0",

        borderRadius: "1.5rem",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",

        gap: "2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <div style={{ position: "relative" }}>
            <button
              style={emojiButton}
              onClick={() => {
                setShowEmojiPicker(true);
              }}
            >
              {inputData.emoji}
            </button>

            {showEmojiPicker && (
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
                    setShowEmojiPicker(false);
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    marginTop: "10px",
                    zIndex: 11,
                  }}
                >
                  <EmojiPicker onEmojiClick={(res) => onEmojiClick(res)} />
                </div>
              </>
            )}
          </div>
          <input
            style={inputBoxStyle}
            placeholder={inputData.title}
            value={inputData.title}
            onChange={(event) => {
              setInputData((oldState: CategoryType) => {
                return { ...oldState, title: event.target.value };
              });
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <div
            style={{
              position: "relative",
            }}
          >
            <div
              style={{
                width: "2rem",
                height: "2rem",
                background: `${inputData.color}`,
                border: "2px solid #0003",
                borderRadius: "0.5rem",

                cursor: "pointer",
              }}
              onClick={() => {
                setShowColorPicker(true);
              }}
            />

            {showColorPicker && (
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
                    setShowColorPicker(false);
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    marginTop: "10px",
                    zIndex: 11,
                  }}
                >
                  <HexColorPicker
                    color={inputData.color}
                    onChange={(res) => {
                      setInputData((oldState: CategoryType) => {
                        return { ...oldState, color: res };
                      });
                    }}
                  />
                </div>
              </>
            )}
          </div>

          <input
            style={inputBoxStyle}
            placeholder={inputData.color}
            value={inputData.color}
            onChange={(event) => {
              setInputData((oldState: CategoryType) => {
                let target = event.target.value;
                if (
                  event.target.value.length === 0 ||
                  event.target.value[0] !== "#"
                )
                  target = "#" + target;
                return { ...oldState, color: target };
              });
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        <BasicButton
          title="취소"
          onClick={() => {
            setIsOpen(false);
            handleMouseLeave();
          }}
        />
        <BasicButton
          title="완료"
          onClick={() => {
            onClickOk();
          }}
        />
      </div>
    </div>
  );
};
