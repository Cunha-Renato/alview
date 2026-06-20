import { sleep } from "../../utils/sleep";
import type { Algorithm } from "../algorithm";
import type { Runtime } from "../data";

export class HeapSort implements Algorithm {
	name(): string {
		return "Heap Sort";
	}

	description(): string {
		return "Heap Sort is a comparison-based sorting algorithm based on the Binary Heap data structure.";
	}

	ref(): string {
		return "https://www.geeksforgeeks.org/dsa/heap-sort/";
	}

	runtime(): Runtime {
		return {
			average: "n log n",
			best: "n log n",
			worst: "n log n",
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

		for (let i = Math.floor(len / 2) - 1; i >= 0; i--)
			await this.heapify(
				data,
				delay,
				on_current,
				on_compare,
				on_success,
				on_change,
				len,
				i,
			);

		for (let i = len - 1; i > 0; i--) {
			[data[i], data[0]] = [data[0], data[i]];
			on_success(i);
			on_change(data);

			await this.heapify(
				data,
				delay,
				on_current,
				on_compare,
				on_success,
				on_change,
				i,
				0,
			);
		}

		on_success(0);
		on_change(data);
	}

	async heapify<T>(
		data: T[],
		delay: React.RefObject<number>,
		on_current: (idx: number) => void,
		on_compare: (idx: number) => void,
		on_success: (idx: number) => void,
		on_change: (data: T[]) => void,
		n: number,
		i: number,
	) {
		let largest = i;
		const left = 2 * i + 1;
		const right = 2 * i + 2;

		on_current(i);

		if (left < n && data[left] > data[largest]) largest = left;
		if (right < n && data[right] > data[largest]) largest = right;

		on_compare(largest);
		await sleep(delay.current);

		if (largest !== i) {
			[data[i], data[largest]] = [data[largest], data[i]];

			on_change(data);

			await this.heapify(
				data,
				delay,
				on_current,
				on_compare,
				on_success,
				on_change,
				n,
				largest,
			);
		}
	}
}
