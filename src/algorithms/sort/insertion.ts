import { sleep } from "../../utils/sleep";
import type { Algorithm } from "../algorithm";
import type { Runtime } from "../data";

export class InsertionSort implements Algorithm {
	name(): string {
		return "Insertion Sort";
	}

	description(): string {
		return "Insertion sort is a simple sorting algorithm that works by iteratively inserting each element of an unsorted list into its correct position in a sorted portion of the list. It is like sorting playing cards in your hands. You split the cards into two groups: the sorted cards and the unsorted cards. Then, you pick a card from the unsorted group and put it in the right place in the sorted group.";
	}

	ref(): string {
		return "https://www.geeksforgeeks.org/dsa/insertion-sort-algorithm/";
	}

	runtime(): Runtime {
		return {
			avarage: "n²",
			best: "n",
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

		for (let i = 0; i < len; i++) {
			on_current(i);
			const key = data[i];
			let j = i - 1;

			while (j >= 0 && data[j] > key) {
				on_compare(j);
				await sleep(delay);

				data[j + 1] = data[j];

				on_change(data);

				j -= 1;
			}

			data[j + 1] = key;

			on_change(data);
		}

		for (let i = 0; i < len; i++) {
			await sleep(50);
			on_success(i);
		}
	}
}
