import { useState } from "react";
import CardGrid from "../../components/CardGrid/CardGrid";
import Search from "../../components/Search";
import { useNavigate } from "react-router-dom";
import styles from "./AlgosInfo.module.css";
import Page from "../Page";
import type { AlgoTypePageData } from "./Algos";

export default function AlgosInfoPage({ algo_type }: { algo_type: AlgoTypePageData }) {
  const [search_term, setSearchTerm] = useState("");
  const navigate = useNavigate();

  return (
    <Page
      title={algo_type.title}
      ref={algo_type.ref}
      header={
        <p className={styles.description}>
          {algo_type.description}
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
            on_select={(idx) => navigate(`visualize?id=${idx}`)}
            search_term={search_term}
            algo_data={algo_type.data}
          />
        </>
      }
    />
  );
}