import { useParams } from "react-router-dom"

export default function SortPageAlgo() {
  const { id } = useParams();

  return (<div>HELLLOOOO {id}</div>)
}