
interface IUser{

    name?:string;
    username?:string;
    phone?:string
}
export const IncorrectGrettings = (user:IUser) =>{

    return (
        <p>{user?.name}</p>
    )
}
export const CorrectGrettings = ({name}:{name:string}) =>{

    return (
        <p>{name}</p>
    )
}
export function SegregationPrincipal(){
    const user = {
        name: 'John Doe',
        username: '@johndoe',
        phone: '+9999999999',
    }

    return(
        <>
           <IncorrectGrettings {...user}/>
            <CorrectGrettings name={user.name}/>
        </>
    )
}