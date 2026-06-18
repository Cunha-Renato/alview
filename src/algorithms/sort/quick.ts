import { sleep } from "../../utils/sleep";
import type { Algorithm } from "../algorithm";

export class QuickSort implements Algorithm {
	name(): string {
		return "Quick Sort";
	}

	async update<T>(
		data: T[],
		delay: number,
		on_current: (idx: number) => void,
		on_compare: (idx: number) => void,
		on_success: (idx: number) => void,
		on_change: (data: T[]) => void,
	): Promise<void> {
		await this.quick(
			data,
			delay,
			on_current,
			on_compare,
			on_success,
			on_change,
			0,
			data.length - 1,
		);

		for (let i = 0; i < data.length; i++) {
			await sleep(50);
			on_success(i);
		}
	}

	async quick<T>(
		data: T[],
		delay: number,
		on_current: (idx: number) => void,
		on_compare: (idx: number) => void,
		on_success: (idx: number) => void,
		on_change: (data: T[]) => void,
		left: number,
		right: number,
	) {
		if (left < right) {
			const pivot_index = await this.partition(
				data,
				delay,
				on_current,
				on_compare,
				on_success,
				on_change,
				left,
				right,
			);

			await this.quick(
				data,
				delay,
				on_current,
				on_compare,
				on_success,
				on_change,
				left,
				pivot_index - 1,
			);

			await this.quick(
				data,
				delay,
				on_current,
				on_compare,
				on_success,
				on_change,
				pivot_index + 1,
				right,
			);
		}
	}

	async partition<T>(
		data: T[],
		delay: number,
		on_current: (idx: number) => void,
		on_compare: (idx: number) => void,
		on_success: (idx: number) => void,
		on_change: (data: T[]) => void,
		left: number,
		right: number,
	): Promise<number> {
		const pivot = right;
		let i = left - 1;

		for (let j = left; j <= right - 1; j++) {
			on_current(pivot);
			on_compare(j);
			await sleep(delay);

			if (data[j] < data[pivot]) {
				i++;
				[data[j], data[i]] = [data[i], data[j]];
				on_change(data);
			}
		}

		[data[i + 1], data[right]] = [data[right], data[i + 1]];
		on_change(data);
		on_success(i + 1);

		return i + 1;
	}
}
