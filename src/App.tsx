import {useEffect, useState} from "react";
import useFetch from "./fetch.tsx";
import type {GitHubSearchResponse} from "./types.ts"
import Search from "./Search.tsx";
import UserList from "./UserList.tsx";
const App = () => {
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const url = debouncedSearch ? `https://api.github.com/search/users?q=${debouncedSearch}` : null
  const {data, error, loading} = useFetch<GitHubSearchResponse>(url)
  useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedSearch(search)
      }, 300)
  return () => clearTimeout(timer)
  }, [search])

    return (
        <>
          <div>
            <Search search={search} setSearch={setSearch}/>
            {search && <UserList users={data?.items ?? []} />}
          </div>
        </>
    )
}

export default App