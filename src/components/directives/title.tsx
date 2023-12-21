interface HeadingProps {
  children: string;
}

const Title: React.FC<HeadingProps> = ({ children }) => {
  return (
    <div
      style={{
        fontSize: "2rem",
        textAlign: "center",
        height: "4rem",
        backgroundColor: "transparent",
        color: "black",
        marginTop: "1.75rem",
      }}
    >
      {children}
    </div>
  );
};

export default Title;
