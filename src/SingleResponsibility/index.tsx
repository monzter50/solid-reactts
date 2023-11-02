import {useEffect,useState} from "react";
import {useFetchUser} from "./hooks/useFetchUser.tsx";
import {UserItem} from "./components/user-item.tsx";
export const IncorrectUserList = () => {
    const [users, setUsers] = useState([])
    useEffect(()=>{
       const userFetch = async () =>{
           try{
               const response = await fetch('https://jsonplaceholder.typicode.com/users')
               const userList = await response.json()
               setUsers(userList)
           }catch (e){
               console.error(e)

           }

        }
        userFetch().catch(null)
    },[])
    return(
        <div>
            {users.map(({name,username,email}) =>(
                <div>
                    <p>{name}</p>
                    <p>{username}</p>
                    <p>{email}</p>
                    <div>---------------</div>
                </div>
            ))}
        </div>
    )
}

export const CorrectUserList = () => {
    const {users} = useFetchUser()
    return(
        <div>
            {
                users.map(({name,username,email})=>(
                    <UserItem name={name} username={username} email={email}/>
                ))
            }
        </div>
    )
}