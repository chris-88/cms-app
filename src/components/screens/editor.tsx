import { useState, useEffect } from "react";
import Markdown from "markdown-to-jsx";
import axios from "axios";
import Header from "../parts/header";
import Sidebar from "../parts/sidebar";
import Title from "../directives/title";
import ButtonBack from "../directives/backButton";
import Callout from "../directives/callout";
import Bullet from "../directives/bullet";
import { SaveIcon } from "../../assets/icons";
import { toast } from "react-toastify";

export default function Editor() {
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [markdown, setMarkdown] = useState<string>("");
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [isChanged, setIsChanged] = useState(false);

  const notifySuccess = () =>
    toast("Saved to S3", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

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
          setIsChanged(false);
        })
        .catch((error) => {
          console.error("Error fetching markdown content:", error);
        });
    }
  }, [selectedFile]);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
    setIsChanged(true);
  };

  const handleFileChange = (newFile: string) => {
    if (isChanged) {
      const confirmSave = window.confirm(
        "You have unsaved changes. Do you want to save before changing files?"
      );

      if (confirmSave) {
        saveChanges();
      }
    }

    setSelectedFile(newFile);
    setIsChanged(false);
  };

  const saveChanges = async () => {
    const apiUrl = `https://h7d9sv70kd.execute-api.eu-west-1.amazonaws.com/prod/`;
    const content_id = selectedFile;

    try {
      console.log("PUT " + apiUrl);

      const response = await axios.put(apiUrl, {
        body: JSON.stringify({
          content_id: content_id,
          content: markdown,
        }),
      });

      // Handle success
      notifySuccess();
      setIsChanged(false);
    } catch (error) {
      // Handle error
      console.error("Error saving changes:", error);
    }
  };

  return (
    <div
      // Main
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Header />
      <div
        // Body
        style={{
          display: "flex",
          height: "100%",
          flexDirection: "row",
        }}
      >
        <Sidebar onSelectFile={handleFileChange} />
        <div
          // Editor and Display container
          style={{
            display: "flex",
            flexDirection: "row",
            width: "80%",
            gap: "1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
              marginBottom: "1rem",
              borderRadius: "8px",
            }}
          >
            <textarea
              id="editor"
              placeholder="Type here..."
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                backgroundColor: "#717990",
                resize: "none",
                fontFamily: "monospace",
                color: "white",
                padding: "1rem",
                borderRadius: "8px",
              }}
              value={markdown}
              onChange={handleTextareaChange}
            />
            {isChanged && (
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  cursor: "pointer",
                }}
                onClick={saveChanges}
              >
                <SaveIcon />
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
              padding: "1rem",
              margin: "0 1rem 1rem 0",
              border: "1px solid lightgray",
              borderRadius: "8px",
              boxShadow: "0 0 4px 0 lightgray",
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
        </div>
      </div>
    </div>
  );
}
