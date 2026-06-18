import type { AlgoData } from "../algorithms/data";
import Card from "./Card";
import styles from "./CardGrid.module.css";

export default function CardGrid({ search_term, on_select, algo_data }: { search_term: string, on_select: (idx: number) => void, algo_data: AlgoData[] }) {
  return (
    <div className={styles.grid}>
      {
        algo_data
          .filter(data => data.algorithm.name().toLowerCase().includes(search_term.toLowerCase()))
          .map((data, idx) => <Card on_click={() => on_select(idx)} key={data.algorithm.name()} algo_data={data} />)
      }
    </div>
  );
}