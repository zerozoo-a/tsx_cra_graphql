import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';

const endpoint='https://graphql-pokemon2.vercel.app';
const query = `{
  query{
    pokemon(name:"Charizard"){
      name
      image
    }
  }
}`
function App() {
  async function onClick(){
    await fetch(
      endpoint,{
      method:"POST",
      headers:{"Content-Type": "application/json"},
      body:JSON.stringify({query})
    }).then(res=>res.json()).then(res=>{
      console.log('show me: ',res)
      setPokemons(pre=>[...pre,{...res.data.query.pokemon}])
    });

  }

  // type pokeState = {name:string, image:string};
  interface pokeState{
    name:string;
    image:string;
  }
  const [pokemons,setPokemons]=useState<pokeState[]>([{name:'', image:''}]);
  return (
    <div className="App">
      <header className="App-header">
        <h1>hello pokemon!</h1>
        <h3>{pokemons.map((v,i:number)=><div key={`${v.name}${i}`}>{v.name}</div>)}</h3>
        <button onClick={onClick}>call pokemon!!
      </button>


      </header>
    </div>
  );
}

export default App;
