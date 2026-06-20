import type { Algorithm } from "../../algorithms/algorithm";
import { SEARCH_DATA, SORT_DATA } from "../../algorithms/data";

export type AlgoTypePageData = {
  title: string,
  ref: string,
  description: string,
  data: Algorithm[],
};

export const SORT_INFO_DATA: AlgoTypePageData = {
  title: "Sorting Algorithms",
  ref: "https://www.geeksforgeeks.org/dsa/sorting-algorithms/",
  description: "A Sorting Algorithm is used to rearrange a given array or list of elements in an order.For example, a given array [10, 20, 5, 2] becomes[2, 5, 10, 20] after sorting in increasing order and becomes [20, 10, 5, 2] after sorting in decreasing order.",
  data: SORT_DATA,
}

export const SEARCH_INFO_DATA: AlgoTypePageData = {
  title: "Search Algorithms",
  ref: "https://www.geeksforgeeks.org/dsa/searching-algorithms/",
  description: "Searching algorithms are essential tools in computer science used to locate specific items within a collection of data. In this tutorial, we are mainly going to focus upon searching in an array. When we search an item in an array, there are two most common algorithms used based on the type of input array.",
  data: SEARCH_DATA,
}