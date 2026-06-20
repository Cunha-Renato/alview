import { useSearchParams } from "react-router-dom"
import Page from "../Page";
import { SORT_DATA } from "../../algorithms/data";
import SortVisualizer from "../../components/AlgoVisualizer/AlgoVisualizer";
import RuntimeDisplay from "../../components/RuntimeDisplay/RuntimeDisplay";
import styles from "./SortAlgo.module.css"
import { useState } from "react";
import type { Scenario } from "../../algorithms/algorithm";
import Badge, { BadgeWithTitle } from "../../components/Badge/Badge";

export default function SortPageAlgo() {
  const scenarios: Scenario[] = ["Best Case", "Average Case", "Worst Case"]
  const [scenario, setScenario] = useState<Scenario>(scenarios[1])
  const [delay, setDelay] = useState(100);
  const [pause, setPause] = useState(true);
  // The value here doesn't matter, this is just to trigger a 'refresh' on the visualizer
  const [reset_token, setResetToken] = useState(false);
  const [amount, setAmount] = useState(100);
  const [max_value, setMaxValue] = useState(100);

  const [search_params, setSearchParams] = useSearchParams();
  const id = search_params.get("id");

  const invalid_id_page = <Page
    title="PAGE NOT FOUND"
    ref={null}
    header={<></>}
    section={<></>}
  />

  if (id === null) {
    return invalid_id_page;
  } else if (parseInt(id, 10) < 0 || parseInt(id, 10) > SORT_DATA.length - 1) {
    return invalid_id_page;
  }

  const id_int = parseInt(id, 10);
  const algorithm = SORT_DATA[id_int];

  const change_algo = (add: number) => {
    let next = (id_int + add);
    if (next < 0) {
      next += SORT_DATA.length;
    }

    const new_idx = next % SORT_DATA.length;
    setSearchParams({ id: new_idx.toString() })
  };

  return (
    <Page
      ref={algorithm.ref()}
      title={
        <div className={styles.title}>
          <button
            type="button"
            className={styles.title_btn}
            onClick={() => change_algo(-1)}
          >
            {"◀"}
          </button>

          <Badge className={styles.title_badge}>
            {algorithm.name()}
          </Badge>

          <button
            type="button"
            className={styles.title_btn}
            onClick={() => change_algo(1)}
          >
            {"▶"}
          </button>
          <div className={styles.title_visualizer}>
            Visualizer
          </div>
        </div>
      }
      header={
        < SortVisualizer
          algorithm={algorithm}
          scenario={scenario}
          delay={delay}
          pause={pause}
          amount={amount}
          max_value={max_value}
          reset_token={reset_token}
        />
      }
      section={
        < div className={styles.section_label} >
          <RuntimeDisplay runtime={algorithm.runtime()} />

          <BadgeWithTitle className={styles.select_badge} title="Delay">
            <select
              className={styles.select}
              value={delay}
              onChange={(e) => setDelay(Number(e.target.value))}
            >
              {[1, 5, 10, 50, 100, 250, 500, 1000].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </BadgeWithTitle>

          <BadgeWithTitle className={styles.select_badge} title="Amount">
            <select
              className={styles.select}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            >
              {[10, 50, 100, 200].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </BadgeWithTitle>

          <BadgeWithTitle className={styles.select_badge} title="Max Value">
            <select
              className={styles.select}
              value={max_value}
              onChange={(e) => setMaxValue(Number(e.target.value))}
            >
              {[10, 50, 100, 200].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </BadgeWithTitle>

          <BadgeWithTitle className={styles.select_badge} title="Scenario">
            <select
              className={styles.select}
              value={scenario}
              onChange={(e) => {
                setScenario(e.target.value as Scenario)
              }}
            >
              {scenarios.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </BadgeWithTitle>

          <BadgeWithTitle className={styles.select_badge} title={pause ? "Play" : "Pause"} >
            <button
              type="button"
              className={styles.select}
              onClick={() => setPause(value => !value)}
            >
              {pause ? "▶" : "⏸"}
            </button>
          </BadgeWithTitle>

          <BadgeWithTitle className={styles.select_badge} title="Reset" >
            <button
              type="button"
              className={styles.select}
              onClick={() => setResetToken(value => !value)}
            >
              ⭮
            </button>
          </BadgeWithTitle>
        </ div >
      }
    />
  );
}