# React + Solid Principale
Hola chicos espero que esté bien, este repositorio me gustaría tocar un poco sobre temas de solid
y profundizarlo con React Js y Typescript.

Creo que el primero pregunta que nos gustaría resolver sería.

### ¿Qué son los principios solid?
Bueno, son principios o normas que nos enseña una forma de programar o diseñar sistemas y 
esto fue impulsado por la comunidad de software, pero más que nada por Robert C.Martin
o como todos lo conoce como Uncle Bob.

Los principios Solid es una abrevacion para recordar los 5 principios:

- **S** Single Responsibility Principle _(Principio de Responsabilidad Única)_
- **O** Open-Closed Principle _(Principio de Abierto/Cerrado)_
- **L** Liskov Substitution Principle _(Principio de Sustitución de Liskov)_
- **I** Interface Segregation Principle _(Principio de Segregación de Interfaces)_
- **D** Dependency Inversion Principle _(Principio de Inversión de Dependencias)_

#### Single Responsibility Principle
Este principio nos informa que cada clase o función debe tener una responsabilidad única.
#### Ejemplo
Pongamos un ejemplo: si estamos en un restaurante, cada personal tiene una responsabilidad específica. El chef tiene la responsabilidad de asegurarse de que lo que se entrega en la cocina cumpla con la receta, el mesero tiene la función de tomar órdenes y llevarlas a la cocina, el cocinero de salsas es responsable de preparar las salsas para los platillos, etc.
Ahora imaginemos que rompamos este principio y que una persona haga la toma de órdenes, checar que los platillos estén correctos y que haga todo dentro de la cocina, esto rompe con
el primer principio, la persona que hace eso, aparte demorar, puede hacer algo mal en todo ese proceso y no entregarnos un platillo de excelencia.
Y esto pasa igual con el codigo, ya que esto causa muchos problemas al momento de querer nosotros mantenerlo. 

Ahora, imaginemos que rompemos este principio y que una persona realice la toma de órdenes, verifique que los platillos estén correctos y realice todas las tareas dentro de la cocina. Esto rompe con el primer principio, ya que la persona que realiza estas tareas, además de demorar, puede cometer errores en todo ese proceso y no entregarnos un platillo de excelencia. Esto es aplicable igualmente al código, ya que esto causa muchos problemas al momento de querer mantenerlo.

##### Codigo
Veamos un fragmento de código con React donde rompemos este primer principio.
Imaginemos que tenemos un componente que se llama UserList y este nos entrega una lista de usuarios.
``` typescript jsx 
import {useEffect,useState} from "react";

export const IncorrectUserList = () => {
const [users, setUsers] = useState([]);

useEffect(()=>{
    const userFetch = async () => {
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
```
Podemos observar que este componente tiene muchas responsabilidades:

##### Renderizar una lista.
``` typescript jsx 
      {users.map(({name,username,email}) =>(
            <div>
                <p>{name}</p>
                <p>{username}</p>
                <p>{email}</p>
                <div>---------------</div>
            </div>
      ))}
``` 
##### Hacer una solicitud a un endpoint:
``` typescript jsx 
  useEffect(()=>{
    const userFetch = async () => {
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
``` 
##### Mostrar ítems de usuarios:
``` typescript jsx 
    <div>
        <p>{name}</p>
        <p>{username}</p>
        <p>{email}</p>
        <div>---------------</div>
    </div>
``` 
###### Solución

Una forma más fácil para esto es empezar a desacoplar y dividir responsabilidades para este componente.

Creamos un custom hook:
``` typescript jsx 
import {useEffect,useState} from "react";

export const useFetchUser = () =>{
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

    return {users}
}
``` 
Creamos igualmente un componente llamado `UserItem`:

``` typescript jsx 
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
``` 
Una vez que logremos dividir estas responsabilidades, el componente se vería algo como este:

``` typescript jsx 
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
``` 
Nuestro componente se ve más limpio y claro, esto nos ayuda a poder darle un mejor mantenimiento a nuestro código.

#### Open-Closed Principle
En este principio nos habla que una clase o función debera poder ser
abierto a extensión pero cerrado la modificación. 
#### Ejemplo
Pongamos un ejemplo: Un ejemplo claro puede ser una libreria que solo maneja
libros en su inventario, pero ahora agregaran DVD en su inventario, pero para poder agregar DVD, los trata con libros entonces
tienes que modificar todo el sistema para eso, eso nos rompe nuestro principio, ya que tendremos que estar checando todo el sistema
la diferencia entre un libro y un DVD y esto es muy riesgoso.

Para resolver este riesgo, el sistema debería ser libre de aceptar la extension de nuevos módulos y debe estar cerrado a la
modificación. Una forma sería crear un propio sistema de DVD para poder gestionar y generar una forma que vivan en armonia, esto nos
dejara hacer más extensiones otros lados.

##### Codigo
Veamos un fragmento de código con React donde rompemos este primer principio.

Imaginemos que tenemos un componente que lo llamamos Button y este componente cuenta con diferentes tipos `icon`.

``` typescript jsx 
import {ChevronRight} from "../components/Icon/ChevronRight.tsx";
import {ChevronLeft} from "../components/Icon/ChevronLeft.tsx";
interface IncorrecButton {
    title?: string;
    iconType?: "left"|"right";
}
export const IncorrecButton = ({title,iconType}:IncorrecButton) => {
    return(
        <button>
            {iconType === "left" && <ChevronLeft/>}
            {iconType === "right" && <ChevronRight/>}
            {title}
        </button>
    )
}
```
``` typescript jsx 
 <IncorrecButton title="New Button" iconType="left" />
``` 
Podemos observar que este componente tiene un problema para extenderse y esto quiebra nuestro principios, esto va ser un caos si se quiere agregar un nuevo `Icon`.
``` typescript jsx 
 <button>
    {iconType === "left" && <ChevronLeft/>}
    {iconType === "right" && <ChevronRight/>}
    {iconType === "up" && <ChevronUp/>}
    {title}
</button>
``` 
###### Solución
Una forma de hacer este componente abierto a extension y cerrado a modificación para este caso el componente se vería algo como este:
``` typescript jsx 
interface CorrectButton{
    children:ReactNode,
    icon?: ({ fontSize }: { fontSize: number}) => ReactElement;
    appearance?: "large" | "small";

}
export const CorrectButton = ({children,icon, appearance="small"}:CorrectButton) => {
    const size = {
        small : 14,
        large:18
    }
    return (
        <button className={"button"}>
            {icon?.({fontSize:size[appearance]})}
            <span>
                {children}
            </span>
        </button>
    )
}
``` 

Permitiendo que nuestro componente no solo sea libre a elegir otro componente,
sino igual modificar el tamaño desde afuera.
``` typescript jsx 
 <CorrectButton icon={({fontSize}) => <ChevronLeft size={fontSize}/>}>
     Correct Left
 </CorrectButton>
 
<CorrectButton icon={() => <ChevronLeft size={24}/>}>
    Correct Left
</CorrectButton>
``` 
Nuestro componente podría extender a más iconos y su lectura es más clara.
#### Liskov Substitution Principle
En este principio nos habla que las Clases o funciones padres deberá poder ser reemplazables por clases o funciones hijas sin afectar los methods del programa.
#### Ejemplo
Un ejemplo típico es que tengamos una colección de aves y estas tenga una función de volar, pero en nuestra colección
llega un avestruz, como sabemos el avestruz no puede volar entonces empezamos a tener un problema para la función volar,
ya que una de nuestras aves no vuela, esto es lo que hace que rompa el principio de liskov.

Una solución es que dividamos la colección en dos tipos aves que vuelan y aves que caminan, ya la función se podría colocar en las colecciones de las aves que vuela y usar la función de volar y las que camina usar la función de caminar
esto no romperá el principio liskov.

##### Codigo
Una vez entendido esto, veamos un ejemplo como se rompe el principio con React.

##### Este sería la clase o función padre.
``` typescript jsx 
interface IButton {
    children:ReactNode;
    color?:string;
    fontSize?:string;
}
const Button = ({children,color,fontSize="12px"}:IButton) =>{
    return(
        <button style={{color,fontSize:fontSize}}>
            {children}
        </button>
    )
}
``` 
##### Este sería la clase o función hija.
Aquí empezamos a ver ciertas propiedades diferentes al padre, esto nos podría traer ciertos problemas
al querer sustituir nuestro componente.
``` typescript jsx 
interface  IRedIncorrectButton{
    children:ReactNode;
    isBig?:boolean;
}
export const RedIncorrectButton = ({children, isBig=false}:IRedIncorrectButton)=>{
    const size = isBig? "20px":"12px";
    return(
        <Button color={"red"} fontSize={size}>
            {children}
        </Button>
    )
}
``` 

Al momento de invocarlo todo al parecer funciona correctamente, pero que pasa si sustituimos este componente por el padre.
``` typescript jsx 
    <RedIncorrectButton isBig>
        Este boton funciona
    </RedIncorrectButton>
``` 
Al sustituir el componente en por el padre:
``` typescript jsx 
    <Button isBig>
        Este boton funciona
    </Button>
``` 
Esto nos ocasionaría un error, ya que su comportamiento debería ser heredable del Padre y el tipo no debería romperse
esto rompe el principio.
###### Solución
Esta forma de usar el componente no daria problemas en dado caso nosotros quisiéramos luego sustituir por `Botton`.
``` typescript jsx 
    <RedCorrectButton fontSize="20px">
        Este boton funciona
    </RedCorrectButton>
``` 

#### Interface Segregation Principle
En este principio nos habla sobre ningún cliente debería verse obligado a depender
de métodos que no utiliza.

#### Ejemplo
Veamos un ejemplo básico imaginemos que tenemos una **Cocina Multicultural**, este nos ofrece un menu
extenso de muchas recetas (Mexicana, Japonesas, italiana, etc.), esto viola el principio de **Interface Segregation Principle**,
cuáles podemos notar un Menú que tiene una sobre carga de información, ineficiencia de tiempo para poder tomar una decision y Confusion para algunos clientes, ya que podría
sentirse frustrados por la abrumadora información.

Una solución que se le puede dar este menú es dividirlo en Menus más chicos, dependendiendo del tipo de 
cocina y esto nos brinda una Especialización, una facilidad en el uso para los clientes y reduce el tiempo para la toma decisión.

##### Codigo
Una vez entendido esto, veamos un ejemplo como se rompe el principio con React.

``` typescript jsx 
interface IUser{
    name?:string;
    username?:string;
    phone?:string
}

export const IncorrectGrettings = (user:IUser) => {
    return (
        <p>{user?.name}</p>
    )
}

export function SegregationPrincipal(){
    const user = {
        name: 'John Doe',
        username: '@johndoe',
        phone: '+9999999999',
    }

    return(
        <IncorrectGrettings {...user}/>
    )
}
``` 
Aquí podemos como rompe el principio de la Segregación, ya que estamos agregando todos los atributos dentro de nuestro componente, cuando realmente solo usamos `name`, esto lo habiamos visto 
en el ejemplo del menú y tener toda la información en un solo componente no tiene sentido.

###### Solución
Una forma de corregir a este componente es realmente facil:

``` typescript jsx 

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
        <CorrectGrettings name={user.name}/>
    )
}
``` 
Ahora podemos solo vamos a estar pasando la información que realmente necesita nuestro componente y esto lo hace legible.

#### Dependency Inversion Principle

En este principio nos habla sobre debera uno debe depender de abstracciones, no de concreciones, osea entre muchas interfaces específicas de cliente son mejores que una interfaz de propósito general.
#### Ejemplo
Un ejemplo que podría observar es cuando vemos una instalación electrica, imagínate que no tuvieras enchufes estandar y
que cada enchufe dependa de un aparato electrico y que cada vez que quieras usar un aparato electrico tengas que llamar a un electricista y hacer una instalación
para poder usarlo, esto sería muy complejo para poder usar diferentes aparatos y muy costoso de mantener.

Ahora pensemos lo que hoy en día se aplica, se maneja un conector standard y en dado caso que un aparato electrico no tenga esta coneccion standard, se maneja conectores que hacen esa conversion
eso nos da flexibilidad y es más facil de mantener.

##### Codigo

Una vez entendido esto, veamos un ejemplo como se rompe el principio con React.
Usaremos un pedazo de cdigo que ya habíamos usado antes.
``` typescript jsx 
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
``` 
En este caso, fetch es una dependencia porque el componente depende de él para que pueda funcionar correctamente (tiene alto acoplamiento).
Cuando queramos cambiar esta dependencia tendria que ser en todos los componentes, entonces para solucionar esto podemos aplicar algo como esto:

``` typescript jsx 
// RequestFactory.ts
export default function RequestFactory({
          method = 'GET',
          endpoint = '',
          params = { limit: 10, offset: 0 },
               baseUrl,
          args
      }: IBaseConfigParams) {
    // Opciones por defecto estan marcadas con un *
    const query = Object.keys(params)?.map(k => encodeURIComponent(k) + '=' + encodeURIComponent(String(params[k])))
        .join('&');
    const replace = args?.url !== undefined;
    const uri = replace ? args?.url : `${baseUrl}${endpoint}?${query}`;
    return fetch(uri, {
        method, // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        // credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
        ...args,
    });
    // parses JSON response into native JavaScript objects
}
``` 
``` typescript jsx 
// settings.ts
interface Request{
    endpoint:string;
    defaultErr?:string
}

export function get({
                endpoint,
                defaultErr = "We have a error"
            }:Request):Promise<any>{
    return new Promise(function (resolve, reject) {
        RequestFactory({
            method: 'GET',
            endpoint: endpoint,
            baseUrl:"https://jsonplaceholder.typicode.com"
        })
            .then(response => {
                if (response.status !== 200) {
                    return reject({ defaultErr, status: response.status });
                }
                return response.json();
            })
            .then(result => {
                let response = result;
                if (response.data) {
                    response = response.data;
                }
                resolve({ data: response, count: result?.count || 0 });
            })
            .catch(error => {
                return reject(error.response);
            })
            .finally(() => {});
    });
}
``` 

``` typescript jsx 
// userServices.ts
export interface User {
    name?:string;
    email?:string;
    username?:string;
}
export interface ResponseUser{
    data?:User[]

}
function getUserServices(): Promise<ResponseUser>{
    return get({
        defaultErr:"We have error when get user",
        endpoint:"/users"
    })
}

export {
    getUserServices
}
``` 
``` typescript jsx 
    useEffect(()=>{
        const userFetch = async () =>{
            try{
                const response:ResponseUser = await getUserServices()
                const userList = response.data ?? []
                setUsers(userList)
            }catch (e){
                console.error(e)
            }

        }
        userFetch().catch(null)
    },[])
``` 

Y te preguntas para que agregar todas esas configuraciones, como te das cuenta cada dependecia se fue abstrayendo y generando 
desacoplamiento, cuando quisieras cambiar de usar `fetch` por `axios`, solo nos vamos hacia `RequestFactory.ts` y ahi cambiamos
la dependencia y ¡listo!.

Ahora nuestro componente depende de una abstracción, en este caso, la abstracción es representada por una interfaz de Typescript. Esa misma interfaz la usamos 
en `userServices` para que su definición sea acorde con la firma de la interfaz.

Espero que esto haya sido de mucha ayuda para ustedes, para mi fue de gran práctica esto y espero escuchar ¡su feedback!