import { sleep } from "../../utils/sleep";
import { Algorithm, type PauseController } from "../algorithm";
import type { Runtime } from "../data";

export class BinarySearch extends Algorithm {
  target?: React.RefObject<number>;

  set_target(target: React.RefObject<number>) {
    this.target = target;
  }

  name(): string {
    return "Binary Search"
  }

  description(): string {
    return "Binary Search is a searching algorithm that operates on a sorted or monotonic search space, repeatedly dividing it into halves to find a target value or optimal answer in logarithmic time O(log N).";
  }

  ref(): string {
    return "https://www.geeksforgeeks.org/dsa/binary-search/";
  }

  runtime(): Runtime {
    return { runtime: "log n" }
  }

  async update(
    data: number[],
    delay: React.RefObject<number>,
    pause: PauseController,
    on_current: (idx: number) => void,
    on_compare: (idx: number) => void,
    on_success: (idx: number) => void,
    _on_change: (data: number[]) => void
  ): Promise<void> {
    const len = data.length;
    if (this.target === undefined) { return; }

    on_compare(this.target.current);

    let low = 0;
    let high = len - 1;

    while (high >= low) {
      await pause.wait();

      const mid = low + Math.floor((high - low) / 2);

      on_current(mid);
      await sleep(delay.current);

      if (data[mid] === data[this.target.current]) {
        on_success(mid);
        return;
      }

      if (data[mid] > data[this.target.current]) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
  }
}