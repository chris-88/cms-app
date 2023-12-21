import React, { useState, useEffect } from "react";
import axios from "axios";

interface CustomListItemProps {
  file: string;
  isSelected: boolean;
  onClick: () => void;
}

const CustomListItem: React.FC<CustomListItemProps> = ({
  file,
  isSelected,
  onClick,
}) => {
  const fileName = file.replace(/\.md$/, "");
  const fileType = file.split(".").pop();

  return (
    <div style={{ marginBottom: "0.25rem" }} onClick={onClick}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5rem",
          marginTop: "0.25rem",
          borderRadius: "8px",
          cursor: "pointer",
          backgroundColor: isSelected ? "#0000ff" : "transparent",
          color: isSelected ? "white" : "black",
        }}
      >
        <div style={{ marginRight: "1rem" }}>{fileName}</div>
        <div
          style={{
            padding: "0.1rem 0.25rem",
            borderRadius: "4px",
            backgroundColor: "gray",
            color: "white",
            fontSize: "0.75rem",
          }}
        >
          .{fileType}
        </div>
      </div>
    </div>
  );
};

interface FileListProps {
  onSelectFile: (file: string) => void;
  searchInput: string;
}

const FileList: React.FC<FileListProps> = ({ onSelectFile, searchInput }) => {
  const [files, setFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("https://h7d9sv70kd.execute-api.eu-west-1.amazonaws.com/prod/files")
      .then((response) => {
        const fileList: string[] = JSON.parse(response.data.body);
        setFiles(fileList);
      })
      .catch((error) => {
        console.error("Error fetching file list:", error);
      });
  }, []);

  const handleFileClick = (file: string) => {
    const contentId = file.replace(/\.md$/, "");
    onSelectFile(contentId);
    setSelectedFile(contentId);
  };

  const filteredFiles = files.filter((file) =>
    file.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <nav>
        <div
          style={{
            display: "flex",
            // justifyContent: "center",
            alignItems: "center",
            padding: "0.25rem",
            fontSize: "1.25rem",
            fontWeight: "400",
            borderBottom: "1px solid lightgray",
          }}
        >
          Pages
        </div>
        <div>
          {filteredFiles.length > 0 ? (
            filteredFiles.map((file, index) => (
              <CustomListItem
                key={index}
                file={file}
                isSelected={selectedFile === file.replace(/\.md$/, "")}
                onClick={() => handleFileClick(file)}
              />
            ))
          ) : (
            <div>No matching files found</div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default FileList;
