import { sleep } from "../../utils/sleep";
import type { Algorithm } from "../algorithm";

export class ShellSort implements Algorithm {
	name(): string {
		return "Shell Sort";
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

		for (let gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
			for (let i = gap; i < len; i++) {
				const tmp = data[i];
				let j = i;

				on_current(i);

				while (j >= gap && data[j - gap] > tmp) {
					on_compare(j - gap);
					await sleep(delay);

					data[j] = data[j - gap];
					j -= gap;

					on_change(data);
				}

				data[j] = tmp;
				on_change(data);
			}
		}

		for (let i = 0; i < len; i++) {
			await sleep(2);
			on_success(i);
		}
	}
}
