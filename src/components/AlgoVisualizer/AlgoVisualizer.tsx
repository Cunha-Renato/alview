import { useEffect, useReducer, useRef, useState } from "react";
import { type Algorithm, PauseController, type Scenario, gen_array } from "../../algorithms/algorithm";
import styles from "./AlgoVisualizer.module.css";
import { BadgeWithTitle } from "../Badge/Badge";

class VisualizerState {
  bars: number[];
  completed: Set<number>;
  current: number;
  compare: number;
  algorithm: Algorithm;

  constructor(algorithm: Algorithm) {
    this.bars = [];
    this.completed = new Set();
    this.current = -1;
    this.compare = -1;
    this.algorithm = algorithm;
  }

  update(delay: React.RefObject<number>, pause: PauseController, force_render: () => void) {
    this.algorithm.update(
      this.bars,
      delay,
      pause,
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

interface VisualizerProps {
  algorithm: Algorithm;
  scenario: Scenario
  delay: number;
  pause: boolean;
  amount: number;
  max_value: number;
  reset_token: boolean,
};

export function SortVisualizer({ algorithm, scenario, delay, pause, amount, max_value, reset_token }: VisualizerProps) {
  const [, force_render] = useReducer((x) => x + 1, 0);
  const [state, setState] = useState(new VisualizerState(algorithm));

  const delay_ref = useRef(delay);
  useEffect(() => {
    delay_ref.current = delay;
  }, [delay]);

  const pause_ref = useRef(new PauseController());
  useEffect(() => {
    if (pause) {
      pause_ref.current.pause();
    } else {
      pause_ref.current.resume();
    }
  }, [pause]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: SHUT UP, reset_token intentionally triggers effect re-run without being read.
  useEffect(() => {
    const new_state = new VisualizerState(algorithm);
    new_state.bars = gen_array(scenario, amount, max_value);

    setState(new_state);
  }, [algorithm, scenario, amount, max_value, reset_token]); // <- This guy.

  useEffect(() => {
    const controller = new AbortController();
    state.update(delay_ref, pause_ref.current, () => force_render());
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

export function SearchVisualizer({ algorithm, scenario, delay, pause, amount, max_value, reset_token }: VisualizerProps) {
  const [, force_render] = useReducer((x) => x + 1, 0);
  const [state, setState] = useState(new VisualizerState(algorithm));
  const [target, setTarget] = useState(-1);

  const delay_ref = useRef(delay);
  useEffect(() => {
    delay_ref.current = delay;
  }, [delay]);

  const pause_ref = useRef(new PauseController());
  useEffect(() => {
    if (pause) {
      pause_ref.current.pause();
    } else {
      pause_ref.current.resume();
    }
  }, [pause]);

  const target_ref = useRef(target);
  useEffect(() => {
    target_ref.current = target;

    const new_state = new VisualizerState(algorithm);
    new_state.bars = state.bars;
    new_state.algorithm.set_target(target_ref);

    setState(new_state)
  }, [target, algorithm, state.bars])

  // biome-ignore lint/correctness/useExhaustiveDependencies: SHUT UP, reset_token intentionally triggers effect re-run without being read.
  useEffect(() => {
    const new_state = new VisualizerState(algorithm);
    new_state.bars = gen_array(scenario, amount, max_value);

    setTarget(-1);
    setState(new_state);
  }, [algorithm, scenario, amount, max_value, reset_token]); // <- This guy.

  useEffect(() => {
    const controller = new AbortController();
    state.update(delay_ref, pause_ref.current, () => force_render());
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
        <button
          type="button"
          className={`${styles.hoverable} ${get_class_name(i)}`}
          key={i}
          style={{
            width: `round(down, (100% - ${state.bars.length - 1}px) / ${state.bars.length}, 1px)`,
            height: `${(value / max_value) * 100}% `,
          }}
          onClick={() => {
            setTarget(i);
          }}
        />
      ))}
    </div>
  );
}