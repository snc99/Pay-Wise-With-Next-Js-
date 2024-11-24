import React from "react";

const xmlnsXlink = "http://www.w3.org/1999/xlink";

interface Props {
  className?: string;
}

function BgHeader(props: Props) {
  return (
    <svg
      width="800"
      height="600"
      viewBox="0 0 901 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink={xmlnsXlink}
      {...props}
    >
      <rect
        x="0.230469"
        width="900"
        height="600"
        fill="url(#pattern0_63_2661)"
      />
      <defs>
        <pattern
          id="pattern0_63_2661"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_63_2661"
            transform="scale(0.000244141 0.000366211)"
          />
        </pattern>
        <image
          id="image0_63_2661"
          width="4096"
          height="2731"
        />
      </defs>
    </svg>
  );
}

export default BgHeader;