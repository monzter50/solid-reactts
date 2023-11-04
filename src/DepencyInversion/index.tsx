import {useFetchUser} from "./hooks/useFetchUser.tsx";
import {UserItem} from "../SingleResponsibility/components/user-item.tsx";

export const DepencyInversion = () => {
    const {users} = useFetchUser()
    return(
        <div>
            {
                users?.map(({name,username,email})=>(
                    <UserItem key={name} name={name} username={username} email={email}/>
                ))
            }
        </div>
    )
}