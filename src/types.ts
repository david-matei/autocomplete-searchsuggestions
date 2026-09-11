export type GitHubSearchResponse = {
    total_count: number
    incomplete_results: boolean
    items: GitHubUser[]
}

export type GitHubUser = {
    login: string
    id: number
    avatar_url: string
    html_url: string
}