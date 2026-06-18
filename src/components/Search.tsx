export interface SearchProps {
  className: string,
  placeholder: string,
  search_term: string,
  on_change: (term: string) => void
}

export default function Search({ className, placeholder, search_term, on_change }: SearchProps) {
  return (
    <input
      className={className}
      type="text"
      placeholder={placeholder}
      value={search_term}
      onChange={(e) => on_change(e.target.value)}
    />
  );
}