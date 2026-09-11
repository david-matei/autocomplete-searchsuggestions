# GitHub User Autocomplete

A React + TypeScript autocomplete search application that searches GitHub users as you type.

The project focuses on **debounced search, asynchronous data fetching, request cancellation, controlled inputs, and clean component responsibilities**.

## Features

* Controlled search input
* 300ms search debouncing
* GitHub Users Search API integration
* Loading, error, and empty states
* Request cancellation with `AbortController`
* Protection against stale search results
* TypeScript API response types
* Reusable generic `useFetch<T>` hook
* Component-based architecture

## Tech Stack

* React
* TypeScript
* Vite
* GitHub REST API
* CSS

## How It Works

The application separates the user's immediate input from the value used to trigger an API request.

```text
User types
    ↓
search
    ↓
300ms debounce
    ↓
debouncedSearch
    ↓
useFetch
    ↓
GitHub API
    ↓
User results
```

### Why Debouncing?

Without debouncing, typing:

```text
react
```

would potentially generate five requests:

```text
r
re
rea
reac
react
```

Instead, the application waits until the user has stopped typing for 300ms before making the request.

### Request Cancellation

If the user searches for one term and then quickly searches for another, the previous request is cancelled using `AbortController`.

```text
Search "react"
    ↓
Request A starts

Search changes to "redux"
    ↓
Request A is aborted
    ↓
Request B starts
```

This prevents an older request from overwriting newer search results.

## Project Structure

```text
src/
├── App.tsx
├── Search.tsx
├── UserList.tsx
├── fetch.tsx
└── types.ts
```

### `App`

Responsible for:

* Owning the search state
* Debouncing the search
* Constructing the API URL
* Fetching users
* Passing data to child components

### `Search`

A controlled input component.

It receives:

```ts
search
setSearch
```

and reports changes back to `App`.

### `UserList`

Responsible only for displaying the current state of the search:

```text
Loading
Error
No users found
User results
```

### `useFetch`

A reusable generic hook responsible for:

* Fetching data
* Tracking loading state
* Tracking errors
* Storing response data
* Cancelling requests with `AbortController`

It accepts:

```ts
useFetch<T>(url: string | null)
```

Passing `null` means there is currently nothing to fetch.

## API

The application uses GitHub's user search endpoint:

```text
https://api.github.com/search/users?q={search}
```

The response has the following relevant structure:

```ts
type GitHubSearchResponse = {
    total_count: number
    incomplete_results: boolean
    items: GitHubUser[]
}

type GitHubUser = {
    login: string
    id: number
    avatar_url: string
    html_url: string
}
```

## Important React Concepts Practiced

This project was built to reinforce several React fundamentals:

* Controlled components
* State ownership
* Derived values
* `useEffect`
* Effect cleanup
* Debouncing with `setTimeout`
* `clearTimeout`
* `AbortController`
* Async state management
* Conditional rendering
* Component responsibility
* Generic custom hooks
* TypeScript generics
* Race-condition prevention

## Running the Project

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open the local development URL provided by Vite.

## Example

Search for:

```text
react
```

The application waits 300ms after the last keystroke and then requests matching GitHub users.

If no users are found:

```text
No users found.
```

If the request is still running:

```text
Loading...
```

If the request fails, the API error is displayed.

## Learning Goal

The primary goal of this project was not simply to build an autocomplete component, but to understand **why each piece of React state and asynchronous logic exists**.

In particular:

```text
search
```

represents the user's immediate input, while:

```text
debouncedSearch
```

represents the delayed value used to trigger network requests.

This separation allows the UI to respond immediately while preventing unnecessary API requests.
