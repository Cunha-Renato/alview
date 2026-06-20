import { sleep } from "../../utils/sleep";
import type { Algorithm } from "../algorithm";
import type { Runtime } from "../data";

export class BubbleSort implements Algorithm {
	name(): string {
		return "Bubble Sort";
	}

	description(): string {
		return "Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in the wrong order. This algorithm is not efficient for large data sets as its average and worst-case time complexity are quite high.";
	}

	ref(): string {
		return "https://www.geeksforgeeks.org/dsa/bubble-sort-algorithm/";
	}

	runtime(): Runtime {
		return {
			average: "n²",
			best: "n²",
			worst: "n²",
		};
	}

	async update<T>(
		data: T[],
		delay: React.RefObject<number>,
		on_current: (idx: number) => void,
		on_compare: (idx: number) => void,
		on_success: (idx: number) => void,
		on_change: (data: T[]) => void,
	): Promise<void> {
		const len = data.length;

		for (let i = 0; i < len - 1; i++) {
			for (let j = 0; j < len - i - 1; j++) {
				on_current(j);
				on_compare(j + 1);
				await sleep(delay.current);

				if (data[j] > data[j + 1]) {
					await sleep(delay.current);
					[data[j], data[j + 1]] = [data[j + 1], data[j]];

					on_change(data);
				}
			}

			on_success(len - i - 1);
		}

		on_success(0);
	}
}
