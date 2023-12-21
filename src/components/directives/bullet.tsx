import React from "react";
import { CheckIcon } from "../../assets/icons";

interface BulletProps {
  children: React.ReactNode;
}

const Bullets: React.FC<BulletProps> = ({ children }) => {
  const Bullet: React.FC<{ line: React.ReactNode }> = ({ line }) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "0.5rem",
          margin: "0.5rem 0 0.5rem 2rem",
        }}
      >
        <div>
          <CheckIcon />
        </div>
        <div>{line}</div>
      </div>
    );
  };

  const text = children?.toLocaleString() || "";
  // Save monthly by Direct Debit – Minimum €5, Maximum €2,500.
  // Pay your direct debit from a current account (You do not need a Bank of Ireland current account to open this account).
  // You must be aged 16 or over.
  // Maximum of two accounts per customer in sole or joint names.
  // Instant access to your money in any Bank of Ireland branch.
  // When you open a SuperSaver Account, you also qualify for €100 refund on your next new or renewed Home or Car insurance policy with Bank of Ireland Insurance Services*
  const lines = text.split("\n");

  return (
    <div>
      {lines.map((line, index) => (
        <Bullet key={index} line={line} />
      ))}
    </div>
  );
};

export default Bullets;
