
import './App.css'
/*import {CorrectUserList, IncorrectUserList} from "./SingleResponsibility";*/
/*import {CorrectButton, IncorrecButton} from "./OpenClosePrinciple";
import {ChevronLeft} from "./components/Icon/ChevronLeft.tsx";*/
/*import {RedCorrectButton, RedIncorrectButton} from "./LiskovSustitutionPrinciple";*/
/*import {SegregationPrincipal} from "./InterfaceSegregationPrinciple";*/
import {DepencyInversion} from "./DepencyInversion"
function App() {

  return (
    <div>
    {/*    <IncorrectUserList/>
        <CorrectUserList />*/}
     {/*   <IncorrecButton iconType={"left"} title={"Incorrect Left"} />
        <CorrectButton icon={({fontSize}) => <ChevronLeft size={fontSize}/>}>
          Correct Left
        </CorrectButton>
        <CorrectButton icon={() => <ChevronLeft size={24}/>}>
            Correct Left
        </CorrectButton>*/}
{/*        <RedIncorrectButton isBig>Red Incorrect Button </RedIncorrectButton>
        <RedCorrectButton fontSize={"20px"}>Red Correct Button</RedCorrectButton>*/}
        {/*<SegregationPrincipal/>*/}
        <DepencyInversion/>
    </div>
  )
}

export default App
