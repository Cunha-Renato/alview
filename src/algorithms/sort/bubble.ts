import { sleep } from "../../utils/sleep";
import { Algorithm, type PauseController } from "../algorithm";
import type { Runtime } from "../data";

export class BubbleSort extends Algorithm {
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

	async update(
		data: number[],
		delay: React.RefObject<number>,
		pause: PauseController,
		on_current: (idx: number) => void,
		on_compare: (idx: number) => void,
		on_success: (idx: number) => void,
		on_change: (data: number[]) => void,
	): Promise<void> {
		const len = data.length;

		for (let i = 0; i < len - 1; i++) {
			for (let j = 0; j < len - i - 1; j++) {
				await pause.wait();

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
