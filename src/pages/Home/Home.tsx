// HomePage.tsx
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import readme from "../../../README.md?raw"
import styles from "./Home.module.css";

export default function HomePage() {
  return (
    <div className={styles.markdown}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{readme}</ReactMarkdown>
    </div>
  );
}