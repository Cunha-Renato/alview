import { sleep } from "../../utils/sleep";
import type { Algorithm } from "../algorithm";

export class InsertionSort implements Algorithm {
	name(): string {
		return "Insertion Sort";
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
