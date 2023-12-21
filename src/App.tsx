import { ToastContainer } from "react-toastify";
import Display from "./components/screens/display";
import Editor from "./components/screens/editor";

export default function App() {
  return (
    <>
      <Display selectedFile="SuperSaver" />
      {/* <Editor /> */}
      {/* <ToastContainer /> */}
    </>
  );
}
