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
Nos indica que ningún cliente debería verse obligado a depender de métodos que no utiliza.

#### Ejemplo

Pongamos un ejemplo práctico: Imaginemos que visitamos un restaurante con una **Cocina Multicultural**. Este nos presenta un menú extenso con variedad de recetas, desde opciones mexicanas, pasando por japonesas, hasta italianas. Esta variedad, aunque puede parecer atractiva, en realidad viola el **Principio de Segregación de Interfaces**. Los problemas que surgen incluyen:

- Un menú sobrecargado de información.
- Una ineficiencia en el tiempo que toma al cliente decidir qué ordenar.
- Confusión para algunos comensales que podrían sentirse abrumados ante tantas opciones.

Una solución efectiva sería segmentar este amplio menú en sub-menús más específicos, organizados por tipo de cocina. De esta manera, se logra:

- Una especialización en la oferta.
- Facilitar la experiencia de elección para el cliente.
- Agilizar el proceso de toma de decisiones.

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
Podemos observar cómo se viola el **Principio de Segregación**, ya que estamos incorporando todos los atributos dentro de nuestro componente, cuando en realidad solo hacemos uso de `name`. Esto es similar a lo que habíamos observado en el ejemplo del menú; concentrar toda la información en un único componente carece de sentido.

###### Solución
Corregir este componente es realmente sencillo:

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
Ahora, solo pasaremos la información que verdaderamente requiere nuestro componente, lo que mejora significativamente su legibilidad.

#### Dependency Inversion Principle
Este principio nos señala que se debe depender de abstracciones y no de concreciones. En otras palabras, múltiples interfaces específicas para el cliente son preferibles a una interfaz de propósito general.

#### Ejemplo

Consideremos una instalación eléctrica. Imagina que no existieran enchufes estándar y que cada enchufe estuviera diseñado exclusivamente para un aparato eléctrico en particular. Esto implicaría que cada vez que desees usar un nuevo aparato, tendrías que llamar a un electricista y realizar una nueva instalación específica para ese dispositivo. No solo sería complejo al querer usar diversos aparatos, sino también costoso de mantener.
Por el contrario, lo que comúnmente se aplica hoy en día es el uso de un conector estándar. En caso de que un aparato eléctrico no cuente con esta conexión estándar, existen adaptadores que realizan la conversión necesaria. Esta estrategia nos brinda flexibilidad y facilita el mantenimiento.


##### Código

Una vez entendido esto, veamos un ejemplo como se rompe el principio con React.
Usaremos un pedazo de código que ya habíamos usado antes.
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
En este escenario, `fetch` actúa como una dependencia ya que el componente se apoya en él para su correcto funcionamiento, resultando en un alto acoplamiento.
Si deseáramos modificar esta dependencia, tendríamos que hacerlo en todos los componentes donde se utiliza. Para abordar este problema, podemos considerar la 
siguiente solución:

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

Es probable que te cuestiones la necesidad de agregar todas esas configuraciones. Sin embargo, como podrás notar, cada dependencia se ha ido abstrayendo, 
generando así un desacoplamiento. Si en algún momento decidimos reemplazar `fetch` por `axios`, simplemente nos dirigimos a `RequestFactory.ts` y efectuamos 
el cambio en la dependencia. ¡Y ya estaría!

De esta manera, nuestro componente ahora se apoya en una abstracción. En este contexto, dicha abstracción es representada por una interfaz de Typescript. 
Utilizamos esa misma interfaz en `userServices` para asegurarnos de que su definición esté alineada con la firma de la interfaz.

Espero que esta explicación haya sido clara y de gran utilidad para todos. Personalmente, este ejercicio ha sido de gran aprendizaje para mí y
estoy ansioso de conocer ¡su feedback!
