import react from "react";
import React from "react";
import Head from "next/head";
import Link from "next/link";

const button = {
  background: "black",
  color: "white",
  padding: "0.2rem 0.5rem",
  borderRadius: "0.2rem",
  fontWeight: 500,
};

export default function Home() {
  return (
    <div>
      <Head>
        <title>time tracker</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0"
        />
        <link rel="shortcut icon" href="favicon.ico" />
      </Head>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20%",
          gap: "5rem",
        }}
      >
        <h1>Time tracker demo</h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <div>
            <Link href="/categories">
              카테고리를 추가하려면 <span style={button}>여기</span>
            </Link>
          </div>
          <div>
            <Link href="/tasks">
              일정을 추가하려면 <span style={button}>여기</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
