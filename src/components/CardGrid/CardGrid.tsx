import type { Algorithm } from "../../algorithms/algorithm";
import Card from "../Card/Card";
import styles from "./CardGrid.module.css";

export default function CardGrid({ search_term, on_select, algo_data }: { search_term: string, on_select: (idx: number) => void, algo_data: Algorithm[] }) {
  return (
    <div className={styles.grid}>
      {
        algo_data
          .map((algorithm, idx) => ({ algorithm, idx }))
          .filter(({ algorithm }) => algorithm.name().toLowerCase().includes(search_term.toLowerCase()))
          .map(({ algorithm, idx }) => (
            <Card on_click={() => on_select(idx)} key={algorithm.name()} algorithm={algorithm} />
          ))
      }
    </div>
  );
}