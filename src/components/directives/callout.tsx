import { InfoIcon } from "../../assets/icons";

interface CalloutProps {
  children: string;
}

const Callout: React.FC<CalloutProps> = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "row",
        padding: "0.5rem",
        borderRadius: "0.5rem",
        margin: "1rem 0",
        border: "0.5px solid #0000ff",
        fontSize: "0.875rem",
        fontWeight: "300",
      }}
    >
      <div style={{ height: "1.5rem", width: "1.5rem", marginRight: "1rem" }}>
        <InfoIcon />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Callout;
