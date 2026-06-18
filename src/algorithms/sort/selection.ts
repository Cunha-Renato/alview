import { sleep } from "../../utils/sleep";
import type { Algorithm } from "../algorithm";
import type { Runtime } from "../data";

export class SelectionSort implements Algorithm {
	name(): string {
		return "Selection Sort";
	}

	description(): string {
		return "Selection Sort is a comparison-based sorting algorithm. It sorts by repeatedly selecting the smallest (or largest) element from the unsorted portion and swapping it with the first unsorted element.";
	}

	ref(): string {
		return "https://www.geeksforgeeks.org/dsa/selection-sort-algorithm-2/";
	}

	runtime(): Runtime {
		return {
			avarage: "n²",
			best: "n²",
			worst: "n²",
		};
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
