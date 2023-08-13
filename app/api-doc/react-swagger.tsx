"use client";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

type Props = {
  spec: Record<string, any>;
};

function ReactSwagger({ spec }: Props) {
  return (
    <>
      <style>
        {`
          button.try-out__btn,
          .opblock-summary:hover .copy-to-clipboard {
            display: none;
          }
        `}
      </style>
      <SwaggerUI spec={spec} />
    </>
  );
}

export default ReactSwagger;
