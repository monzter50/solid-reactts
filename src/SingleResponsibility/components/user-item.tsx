interface IUserItem {
    name?:string;
    username?:string;
    email?:string;
}
export const UserItem = ({name,username,email}:IUserItem) => {
    return(
        <div>
            <p>{name}</p>
            <p>{username}</p>
            <p>{email}</p>
            <div>---------------</div>
        </div>
    )
}