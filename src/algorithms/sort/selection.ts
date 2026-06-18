import { sleep } from "../../utils/sleep";
import type { Algorithm } from "../algorithm";

export class SelectionSort implements Algorithm {
	name(): string {
		return "Selection Sort";
	}

	async update<T>(
		data: T[],
		delay: number,
		on_current: (idx: number) => void,
		on_compare: (idx: number) => void,
		on_success: (idx: number) => void,
		on_change: (data: T[]) => void,
	): Promise<void> {
		const len = data.length;

		for (let i = 0; i < len - 1; i++) {
			let min_idx = i;

			for (let j = i + 1; j < len; j++) {
				on_current(min_idx);
				on_compare(j);
				await sleep(delay);

				if (data[j] < data[min_idx]) {
					min_idx = j;
				}
			}

			[data[i], data[min_idx]] = [data[min_idx], data[i]];

			on_change(data);
			on_success(i);
		}

		on_success(len - 1);
	}
}
