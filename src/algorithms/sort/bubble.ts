import { sleep } from "../../utils/sleep";
import type { Algorithm } from "../algorithm";

export class BubbleSort implements Algorithm {
	name(): string {
		return "Bubble Sort";
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
			for (let j = 0; j < len - i - 1; j++) {
				on_current(j);
				on_compare(j + 1);
				await sleep(delay);

				if (data[j] > data[j + 1]) {
					await sleep(delay);
					[data[j], data[j + 1]] = [data[j + 1], data[j]];

					on_change(data);
				}
			}

			on_success(len - i - 1);
		}

		on_success(0);
	}
}
