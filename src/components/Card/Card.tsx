import type { Algorithm } from "../../algorithms/algorithm";
import styles from "./Card.module.css";
import RuntimeDisplay from "../RuntimeDisplay/RuntimeDisplay";


export default function Card({ on_click, algorithm }: { on_click: () => void, algorithm: Algorithm }) {
  return (
    <article className={styles.card}>
      <button onClick={on_click} type="button" className={styles.header}>
        <h2 className={styles.title}>{algorithm.name()}</h2>
      </button>

      <p className={styles.description}>{algorithm.description()}</p>

      <footer className={styles.footer}>
        <a
          className={styles.sourceLink}
          href={algorithm.ref()}
          target="_blank"
          rel="noreferrer"
        >
          SOURCE ↗
        </a>
        <RuntimeDisplay runtime={algorithm.runtime()} />
      </footer>
    </article>
  );
}