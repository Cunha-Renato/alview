import type { ONotation, Runtime } from "../../algorithms/data";
import { BadgeWithTitle } from "../Badge/Badge";
import styles from "./RuntimeDisplay.module.css";

function formatNotation(n: ONotation) {
  return `O(${n})`;
}

const complexity_class: Record<ONotation, string> = {
  "1": styles.c1,
  "log n": styles.cLogN,
  "n": styles.cN,
  "n log n": styles.cNLogN,
  "n¹·⁵": styles.cN15,
  "n²": styles.cN2,
};

function OBadge({ title, value }: { title: string, value: ONotation }) {
  return (
    <BadgeWithTitle
      className={`${complexity_class[value]}`}
      title={title}
    >
      <>{formatNotation(value)}</>
    </BadgeWithTitle>
  );
}

export default function RuntimeDisplay({ runtime }: { runtime: Runtime }) {
  if ("runtime" in runtime) {
    return (
      <div className={styles.runtime_single}>
        <OBadge title="Runtime" value={runtime.runtime} />
      </div>
    );
  }

  return (
    <div className={styles.runtime_grid}>
      <div className={styles.runtime_cell}>
        <OBadge title="Best" value={runtime.best} />
      </div>
      <div className={styles.runtime_cell}>
        <OBadge title="Average" value={runtime.average} />
      </div>
      <div className={styles.runtime_cell}>
        <OBadge title="Worst" value={runtime.worst} />
      </div>
    </div>
  );
}