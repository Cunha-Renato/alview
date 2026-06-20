import { sleep } from "../../utils/sleep";
import { Algorithm, type PauseController } from "../algorithm";
import type { Runtime } from "../data";

export class LinearSearch extends Algorithm {
  target?: React.RefObject<number>;

  set_target(target: React.RefObject<number>): void {
    this.target = target;
  }

  name(): string {
    return "Linear Search"
  }

  description(): string {
    return "In Linear Search, we iterate over all the elements of the array and check if it the current element is equal to the target element. If we find any element to be equal to the target element, then return the index of the current element. Otherwise, if no element is equal to the target element, then return -1 as the element is not found. Linear search is also known as sequential search.";
  }

  ref(): string {
    return "https://www.geeksforgeeks.org/dsa/linear-search/";
  }

  runtime(): Runtime {
    return { runtime: "n" }
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

    for (let i = 0; i < len; i++) {
      await pause.wait();

      on_current(i);
      await sleep(delay.current);

      if (data[i] === data[this.target.current]) {
        on_success(i);
        return;
      }
    }
  }
}