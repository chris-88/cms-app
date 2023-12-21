import React, { useState, useEffect } from "react";
import axios from "axios";
import Markdown from "markdown-to-jsx";
import Title from "../directives/title";
import ButtonBack from "../directives/backButton";
import Callout from "../directives/callout";
import Bullet from "../directives/bullet";

export default function Display({
  selectedFile,
}: {
  selectedFile: string;
}): JSX.Element {
  const [markdown, setMarkdown] = useState<string>("");
  const [markdownContent, setMarkdownContent] = useState<string>("");

  useEffect(() => {
    setMarkdown(markdownContent);
  }, [markdownContent]);

  useEffect(() => {
    if (selectedFile) {
      const apiUrl =
        "https://h7d9sv70kd.execute-api.eu-west-1.amazonaws.com/prod/";
      const queryParams = `?content-id=${selectedFile}`;

      axios
        .get(apiUrl + queryParams)
        .then((response) => {
          setMarkdownContent(response.data);
        })
        .catch((error) => {
          console.error("Error fetching markdown content:", error);
        });
    }
  }, [selectedFile]);

  return (
    <div
      style={{
        padding: "1rem",
        fontSize: "1rem",
      }}
    >
      <Markdown
        options={{
          overrides: {
            h1: Title,
            Button: ButtonBack,
            Callout: Callout,
            Bullet: Bullet,
          },
        }}
      >
        {markdown}
      </Markdown>
    </div>
  );
}
