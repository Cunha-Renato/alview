import { useEffect, useState } from "react";
import { type Algorithm, type Scenario, gen_array } from "../algorithms/algorithm";

interface SortVisualizerProps {
  algorithm: Algorithm;
  scenario: Scenario
  delay: number;
  amount: number;
  max_value: number;
};

export default function SortVisualizer({ algorithm, scenario, delay, amount, max_value }: SortVisualizerProps) {
  const [bars, setBars] = useState<number[]>(gen_array(scenario, amount, max_value));
  const [current, setCurrent] = useState<number>(-1);
  const [compare, setCompare] = useState<number>(-1);
  const [sorted, setSorted] = useState<Set<number>>(new Set());
  const [done, setDone] = useState<boolean>(false);

  useEffect(() => {
    if (!done) {
      setCurrent(-1);
      setCompare(-1);
      setSorted(new Set());

      const curr_bars = [...bars];
      algorithm.update(
        curr_bars,
        delay,
        setCurrent,
        setCompare,
        (suc_idx) => setSorted(prev => new Set([...prev, suc_idx])),
        setBars,
      );
    }

    return () => { setDone(true) }
  }, [bars, done, delay, algorithm]);

  const getColor = (i: number): string => {
    if (sorted.has(i)) return "green";
    if (i === current) return "red";
    if (i === compare) return "orange";
    return "black";
  };

  return (
    <div style={{ display: "flex", alignItems: "flex-end", height: "400px", gap: "1px" }}>
      {bars.map((value, i) => (
        <div
          key={i}
          style={{
            width: `round(down, (100% - ${bars.length - 1}px) / ${bars.length}, 1px)`,
            height: `${(value / max_value) * 100}% `,
            backgroundColor: getColor(i),
          }}
        />
      ))}
    </div>
  );
}