import React, { useState } from "react";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

const Loading = () => {
  let [loading] = useState(true);
  let [color] = useState("#ffffff");

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: #6ead4e;
  `;
  return (
    <div
      className="grid justify-center items-center"
      style={{ height: "100%" }}
    >
      <ClipLoader css={override} loading={loading} color={color} radius  size={100} />
    </div>
  );
};

export default Loading;
