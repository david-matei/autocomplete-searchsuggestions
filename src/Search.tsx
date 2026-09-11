type SearchProps = {
    search: string
    setSearch: (e:string) => void
}
const Search = ({search, setSearch}: SearchProps) => {
    return (
        <div>
            <input value={search} onChange={e => setSearch(e.target.value)}/>
        </div>
    )
}
export default Search