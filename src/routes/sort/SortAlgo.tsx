import { useParams } from "react-router-dom"
import Page from "../Page";
import { SORT_DATA } from "../../algorithms/data";
import SortVisualizer from "../../components/AlgoVisualizer";

export default function SortPageAlgo() {
  const { id } = useParams();

  const invalid_id_page = <Page
    title="PAGE NOT FOUND"
    ref={null}
    header={<></>}
    section={<></>}
  />

  if (id === undefined) {
    return invalid_id_page;
  } else if (parseInt(id, 10) < 0 || parseInt(id, 10) > SORT_DATA.length - 1) {
    return invalid_id_page;
  }

  const algorithm = SORT_DATA[parseInt(id, 10)];

  return (
    <Page
      title={algorithm.name()}
      ref={algorithm.ref()}
      header={
        <SortVisualizer
          algorithm={algorithm}
          scenario="Average Case"
          delay={50}
          amount={100}
          max_value={100}
        />
      }
      section={
        <></>
      }
    />
  );
}