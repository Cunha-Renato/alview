import type { Algorithm } from "./algorithm";
import { BubbleSort } from "./sort/bubble";
import { HeapSort } from "./sort/heap";
import { InsertionSort } from "./sort/insertion";
import { MergeSort } from "./sort/merge";
import { QuickSort } from "./sort/quick";
import { SelectionSort } from "./sort/selection";
import { ShellSort } from "./sort/shell";

export type ONotation = "n²" | "n¹·⁵" | "n" | "n log n" | "log n" | "1";

export type Runtime =
	| {
			avarage: ONotation;
			best: ONotation;
			worst: ONotation;
	  }
	| {
			runtime: ONotation;
	  };

export const SORT_DATA: Algorithm[] = [
	new BubbleSort(),
	new SelectionSort(),
	new InsertionSort(),
	new QuickSort(),
	new HeapSort(),
	new MergeSort(),
	new ShellSort(),
];
