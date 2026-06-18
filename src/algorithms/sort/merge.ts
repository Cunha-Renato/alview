import { sleep } from "../../utils/sleep";
import type { Algorithm } from "../algorithm";

type SortCtx<T> = {
	data: T[];
	delay: number;
	on_current: (idx: number) => void;
	on_change: (data: T[]) => void;
};

export class MergeSort implements Algorithm {
	name(): string {
		return "Merge Sort";
	}

	async update<T>(
		data: T[],
		delay: number,
		on_current: (idx: number) => void,
		_: (idx: number) => void,
		on_success: (idx: number) => void,
		on_change: (data: T[]) => void,
	): Promise<void> {
		const ctx: SortCtx<T> = {
			data,
			delay,
			on_current,
			on_change,
		};

		await this.merge_sort(ctx, 0, data.length - 1);

		for (let i = 0; i < data.length; i++) {
			await sleep(2);
			on_success(i);
		}
	}

	async merge_sort<T>(
		ctx: SortCtx<T>,
		left: number,
		right: number,
	): Promise<void> {
		if (left >= right) return;

		const mid = Math.floor(left + (right - left) / 2);

		await this.merge_sort(ctx, left, mid);
		await this.merge_sort(ctx, mid + 1, right);
		await this.merge(ctx, left, mid, right);
	}

	async merge<T>(
		ctx: SortCtx<T>,
		left: number,
		mid: number,
		right: number,
	): Promise<void> {
		const { data, delay, on_current, on_change } = ctx;

		const arr_left = data.slice(left, mid + 1);
		const arr_right = data.slice(mid + 1, right + 1);

		let i = 0,
			j = 0,
			k = left;

		while (i < arr_left.length && j < arr_right.length) {
			on_current(k);
			await sleep(delay);

			if (arr_left[i] <= arr_right[j]) {
				data[k] = arr_left[i++];
			} else {
				data[k] = arr_right[j++];
			}

			on_change(data);

			k++;
		}

		while (i < arr_left.length) {
			on_current(k);
			data[k] = arr_left[i++];

			on_change(data);

			k++;
		}

		while (j < arr_right.length) {
			on_current(k);
			data[k] = arr_right[j++];
			on_change(data);

			k++;
		}
	}
}
