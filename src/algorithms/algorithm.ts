import type { Runtime } from "./data";

export abstract class Algorithm {
	abstract name(): string;

	abstract description(): string;

	abstract ref(): string;

	abstract runtime(): Runtime;

	set_target(_target: React.RefObject<number>): void {
		return;
	}

	abstract update(
		data: number[],
		delay: React.RefObject<number>,
		pause: PauseController,
		on_current: (idx: number) => void,
		on_compare: (idx: number) => void,
		on_success: (idx: number) => void,
		on_change: (data: number[]) => void,
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

export class PauseController {
	private paused = true;
	private resolve: (() => void) | null = null;

	get isPaused() {
		return this.paused;
	}

	pause() {
		this.paused = true;
	}

	resume() {
		this.paused = false;
		this.resolve?.();
		this.resolve = null;
	}

	toggle() {
		if (this.paused) this.resume();
		else this.pause();
	}

	wait(): Promise<void> {
		if (!this.paused) return Promise.resolve();
		return new Promise((resolve) => {
			this.resolve = resolve;
		});
	}
}
