import { sleep } from "../../utils/sleep";
import { Algorithm, type PauseController } from "../algorithm";
import type { Runtime } from "../data";

type SortCtx = {
	data: number[];
	delay: React.RefObject<number>;
	pause: PauseController;
	on_current: (idx: number) => void;
	on_change: (data: number[]) => void;
};

export class MergeSort extends Algorithm {
	name(): string {
		return "Merge Sort";
	}

	description(): string {
		return "Merge sort is a popular sorting algorithm known for its efficiency and stability. It follows the Divide and Conquer approach. It works by recursively dividing the input array into two halves, recursively sorting the two halves and finally merging them back together to obtain the sorted array.";
	}

	ref(): string {
		return "https://www.geeksforgeeks.org/dsa/merge-sort/";
	}

	runtime(): Runtime {
		return {
			average: "n log n",
			best: "n log n",
			worst: "n log n",
		};
	}

	async update(
		data: number[],
		delay: React.RefObject<number>,
		pause: PauseController,
		on_current: (idx: number) => void,
		_: (idx: number) => void,
		on_success: (idx: number) => void,
		on_change: (data: number[]) => void,
	): Promise<void> {
		const ctx: SortCtx = {
			data,
			delay,
			pause,
			on_current,
			on_change,
		};

		await this.merge_sort(ctx, 0, data.length - 1);

		for (let i = 0; i < data.length; i++) {
			await sleep(2);
			on_success(i);
		}
	}

	async merge_sort(ctx: SortCtx, left: number, right: number): Promise<void> {
		if (left >= right) return;

		const mid = Math.floor(left + (right - left) / 2);

		await this.merge_sort(ctx, left, mid);
		await this.merge_sort(ctx, mid + 1, right);
		await this.merge(ctx, left, mid, right);
	}

	async merge(
		ctx: SortCtx,
		left: number,
		mid: number,
		right: number,
	): Promise<void> {
		const { data, delay, pause, on_current, on_change } = ctx;

		const arr_left = data.slice(left, mid + 1);
		const arr_right = data.slice(mid + 1, right + 1);

		let i = 0,
			j = 0,
			k = left;

		while (i < arr_left.length && j < arr_right.length) {
			await pause.wait();

			on_current(k);
			await sleep(delay.current);

			if (arr_left[i] <= arr_right[j]) {
				data[k] = arr_left[i++];
			} else {
				data[k] = arr_right[j++];
			}

			on_change(data);

			k++;
		}

		while (i < arr_left.length) {
			await pause.wait();

			on_current(k);
			data[k] = arr_left[i++];

			on_change(data);

			k++;
		}

		while (j < arr_right.length) {
			await pause.wait();

			on_current(k);
			data[k] = arr_right[j++];
			on_change(data);

			k++;
		}
	}
}
