import { useState } from "react";
import CardGrid from "../../components/CardGrid";
import Search from "../../components/Search";
import { useNavigate } from "react-router-dom";
import styles from "./Sort.module.css";
import { SORT_DATA } from "../../algorithms/data";
import Page from "../Page";

export default function SortPage() {
  const [search_term, setSearchTerm] = useState("");
  const navigate = useNavigate();

  return (
    <Page
      title="Sorting Algorithms"
      ref="https://www.geeksforgeeks.org/dsa/sorting-algorithms/"
      header={
        <p className={styles.description}>
          A Sorting Algorithm is used to rearrange a given array or list of
          elements in an order. For example, a given array [10, 20, 5, 2]
          becomes [2, 5, 10, 20] after sorting in increasing order and becomes
          [20, 10, 5, 2] after sorting in decreasing order.
        </p>
      }
      section={
        <>
          <div className={styles.section_label}>
            <span>Here are some of the most well known algorithms</span>
            <Search
              className={styles.search}
              placeholder="Search algorithm..."
              search_term={search_term}
              on_change={setSearchTerm}
            />
          </div>
          <CardGrid
            on_select={(idx) => navigate(`/sort/${idx}`)}
            search_term={search_term}
            algo_data={SORT_DATA}
          />
        </>
      }
    />
  );
}