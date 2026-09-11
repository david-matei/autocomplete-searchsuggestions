import type {GitHubUser} from "./types.ts"

type UserListProps = {
    users: GitHubUser[]
}

const UserList = ({users}: UserListProps) => {
    return (
        <div>
            {users.map(user => {
                return <div key={user.id}>
                    <p>{user.avatar_url}</p>
                    <p>{user.login}</p>
                </div>
            })}
        </div>
    )
}

export default UserList