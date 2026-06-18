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

export type AlgoData = {
	algorithm: Algorithm;
	description: string;
	ref: string;
	runtime: Runtime;
};

export const SORT_DATA: AlgoData[] = [
	// BUBBLE.
	{
		algorithm: new BubbleSort(),
		description:
			"Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in the wrong order. This algorithm is not efficient for large data sets as its average and worst-case time complexity are quite high.",
		ref: "https://www.geeksforgeeks.org/dsa/bubble-sort-algorithm/",
		runtime: {
			avarage: "n²",
			best: "n²",
			worst: "n²",
		},
	},

	// SELECTION.
	{
		algorithm: new SelectionSort(),
		description:
			"Selection Sort is a comparison-based sorting algorithm. It sorts by repeatedly selecting the smallest (or largest) element from the unsorted portion and swapping it with the first unsorted element.",
		ref: "https://www.geeksforgeeks.org/dsa/selection-sort-algorithm-2/",
		runtime: {
			avarage: "n²",
			best: "n²",
			worst: "n²",
		},
	},

	// INSERTION.
	{
		algorithm: new InsertionSort(),
		description:
			"Insertion sort is a simple sorting algorithm that works by iteratively inserting each element of an unsorted list into its correct position in a sorted portion of the list. It is like sorting playing cards in your hands. You split the cards into two groups: the sorted cards and the unsorted cards. Then, you pick a card from the unsorted group and put it in the right place in the sorted group.",
		ref: "https://www.geeksforgeeks.org/dsa/insertion-sort-algorithm/",
		runtime: {
			avarage: "n²",
			best: "n",
			worst: "n²",
		},
	},

	// QUICK.
	{
		algorithm: new QuickSort(),
		description:
			"QuickSort is a sorting algorithm based on the Divide and Conquer that picks an element as a pivot and partitions the given array around the picked pivot by placing the pivot in its correct position in the sorted array.",
		ref: "https://www.geeksforgeeks.org/dsa/quick-sort-algorithm/",
		runtime: {
			avarage: "n log n",
			best: "n log n",
			worst: "n²",
		},
	},

	// HEAP.
	{
		algorithm: new HeapSort(),
		description:
			"Heap Sort is a comparison-based sorting algorithm based on the Binary Heap data structure.",
		ref: "https://www.geeksforgeeks.org/dsa/heap-sort/",
		runtime: {
			avarage: "n log n",
			best: "n log n",
			worst: "n log n",
		},
	},

	// MERGE.
	{
		algorithm: new MergeSort(),
		description:
			"Merge sort is a popular sorting algorithm known for its efficiency and stability. It follows the Divide and Conquer approach. It works by recursively dividing the input array into two halves, recursively sorting the two halves and finally merging them back together to obtain the sorted array.",
		ref: "https://www.geeksforgeeks.org/dsa/merge-sort/",
		runtime: {
			avarage: "n log n",
			best: "n log n",
			worst: "n log n",
		},
	},

	// SHELL.
	{
		algorithm: new ShellSort(),
		description:
			"Shell Sort, also known as Shell's method, is an in-place comparison sort and an optimization of Insertion Sort. It improves upon the efficiency of Insertion Sort by allowing elements to be moved over larger distances in the initial stages, which significantly reduces the number of swaps required, especially for larger datasets.",
		ref: "https://www.geeksforgeeks.org/dsa/shell-sort/",
		runtime: {
			avarage: "n¹·⁵",
			best: "n log n",
			worst: "n²",
		},
	},
];
