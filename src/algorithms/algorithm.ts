import type { Runtime } from "./data";

export interface Algorithm {
	name(): string;

	description(): string;

	ref(): string;

	runtime(): Runtime;

	update<T>(
		data: T[],
		delay: number,
		on_current: (idx: number) => void,
		on_compare: (idx: number) => void,
		on_success: (idx: number) => void,
		on_change: (data: T[]) => void,
	): Promise<void>;
}

export type Scenario = "Best Case" | "Worst Case" | "Average Case";

export function gen_array(
	scenario: Scenario,
	amount: number,
	max_value: number,
): Array<number> {
	const arr = Array.from(
		{ length: amount },
		(_, i) => Math.floor((i / amount) * max_value) + 1,
	);

	switch (scenario) {
		// Sorted.
		case "Best Case":
			return arr;

		// Reverse Sort.
		case "Worst Case":
			return arr.reverse();

		// Random.
		case "Average Case":
			for (let i = arr.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[arr[i], arr[j]] = [arr[j], arr[i]];
			}

			return arr;
	}
}
