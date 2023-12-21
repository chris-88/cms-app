import { useState } from "react";
import { NewIcon } from "../../assets/icons";
import FileList from "./fileList";

interface SidebarProps {
  onSelectFile: (file: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectFile }) => {
  const [searchInput, setSearchInput] = useState<string>("");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "15%",
        padding: "1rem",
        border: "1px solid lightgray",
        borderRadius: "8px",
        margin: "0 1rem 1rem 1rem",
        boxShadow: "0 0 4px 0 lightgray",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        <input
          style={{
            flex: 1,
            padding: "5px",
            fontWeight: "300",
            border: "none",
            borderRadius: "4px",
            outline: "none",
            boxShadow: "0 0 4px 0 lightgray",
          }}
          id="search"
          type="text"
          placeholder="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            border: "none",
            borderRadius: "4px",
            padding: "0.5rem",
            cursor: "pointer",
            boxShadow: "0 0 4px 0 lightgray",
          }}
        >
          <NewIcon />
        </button>
      </div>
      <FileList onSelectFile={onSelectFile} searchInput={searchInput} />
    </div>
  );
};

export default Sidebar;
