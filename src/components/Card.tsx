import type { Algorithm } from "../algorithms/algorithm";
import type { ONotation, Runtime } from "../algorithms/data";
import styles from "./Card.module.css";

function formatNotation(n: ONotation) {
  return `O(${n})`;
}

const complexityClass: Record<ONotation, string> = {
  "1": styles.c1,
  "log n": styles.cLogN,
  "n": styles.cN,
  "n log n": styles.cNLogN,
  "n¹·⁵": styles.cN15,
  "n²": styles.cN2,
};

function Badge({ value }: { value: ONotation }) {
  return (
    <span className={`${styles.badge} ${complexityClass[value]}`}>
      {formatNotation(value)}
    </span>
  );
}

function RuntimeDisplay({ runtime }: { runtime: Runtime }) {
  if ("runtime" in runtime) {
    return (
      <div className={styles.runtimeSingle}>
        <span className={styles.runtimeLabel}>Runtime</span>
        <Badge value={runtime.runtime} />
      </div>
    );
  }

  return (
    <div className={styles.runtimeGrid}>
      <div className={styles.runtimeCell}>
        <span className={styles.runtimeLabel}>Best</span>
        <Badge value={runtime.best} />
      </div>
      <div className={styles.runtimeCell}>
        <span className={styles.runtimeLabel}>Avg</span>
        <Badge value={runtime.avarage} />
      </div>
      <div className={styles.runtimeCell}>
        <span className={styles.runtimeLabel}>Worst</span>
        <Badge value={runtime.worst} />
      </div>
    </div>
  );
}

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