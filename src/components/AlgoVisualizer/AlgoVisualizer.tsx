import { useEffect, useReducer, useRef, useState } from "react";
import { type Algorithm, type Scenario, gen_array } from "../../algorithms/algorithm";
import styles from "./AlgoVisualizer.module.css";

class VisualizerState {
  bars: number[];
  completed: Set<number>;
  current: number;
  compare: number;
  done: boolean;
  algorithm: Algorithm;

  constructor(algorithm: Algorithm) {
    this.bars = [];
    this.completed = new Set();
    this.current = -1;
    this.compare = -1;
    this.done = false;
    this.algorithm = algorithm;
  }

  update(delay: React.RefObject<number>, force_render: () => void) {
    this.algorithm.update(
      this.bars,
      delay,
      (idx) => {
        this.current = idx;
        force_render()
      },
      (idx) => {
        this.compare = idx;
        force_render()
      },
      (idx) => {
        this.completed.add(idx);
        force_render();
      },
      (data) => {
        this.bars = data;
        force_render();
      }
    )
  }
}

interface SortVisualizerProps {
  algorithm: Algorithm;
  scenario: Scenario
  delay: number;
  amount: number;
  max_value: number;
};

export default function SortVisualizer({ algorithm, scenario, delay, amount, max_value }: SortVisualizerProps) {
  const [, force_render] = useReducer((x) => x + 1, 0);
  const [state, setState] = useState(new VisualizerState(algorithm));

  const delay_ref = useRef(delay);
  useEffect(() => {
    delay_ref.current = delay;
  }, [delay]);

  useEffect(() => {
    const new_state = new VisualizerState(algorithm);
    new_state.bars = gen_array(scenario, amount, max_value);

    setState(new_state);
  }, [algorithm, scenario, amount, max_value]);

  useEffect(() => {
    const controller = new AbortController();
    state.update(delay_ref, () => force_render());
    return () => controller.abort();
  }, [state]);

  const get_class_name = (i: number): string => {
    if (state.completed.has(i)) return styles.completed;
    if (i === state.current) return styles.current;
    if (i === state.compare) return styles.compare;
    return styles.idle;
  };

  return (
    <div className={styles.container}>
      {state.bars.map((value, i) => (
        <div
          className={get_class_name(i)}
          key={i}
          style={{
            width: `round(down, (100% - ${state.bars.length - 1}px) / ${state.bars.length}, 1px)`,
            height: `${(value / max_value) * 100}% `,
          }}
        />
      ))}
    </div>
  );
}