import { React, useEffect, useState} from 'react'
import { RxCross2, RxCircle } from "react-icons/rx";
import Popup from './components/Popup';
import Record from './components/Record';
import Grid from '@mui/material/Unstable_Grid2';
import './App.css';

const ARRAY_INITIAL = Array.from({ length: 9 })

function App() {
  const [turno, setTurno] = useState(true)
  const [arr, setArr] = useState(ARRAY_INITIAL)
  const [open, setOpen] = useState(false);
  const [winner, setWinner] = useState()
  const [match, setMatch] = useState([])
  const [count, setCount] = useState(0);
  const [lookMatch, setLookMatch] = useState(false)
  const [title, setTitle] = useState();

  useEffect(() => {
    if(!lookMatch){
      checkWinner()
    }
  },[arr])

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    addMatch()
    setArr(ARRAY_INITIAL)
    setWinner(null)
  }

  const resetMatch = () => {
    setLookMatch(false)
    setArr(ARRAY_INITIAL)
  }

  const addMatch = () =>{
    setCount(count + 1)
    const newMatch = {
      id: count,
      movements: arr,
      winner: winner
    }
    setMatch([...match, newMatch])
    console.log([...match, newMatch])
  }

  const checkMatch = (id) =>{
    match.forEach(item => {
      if(item.id === id){
        setLookMatch(true)
        setArr(item.movements)
        setTitle(item.winner)
      }
    })
  }

  const checkWinner = () => {
    if(arr[0] && arr[0] === arr[1] && arr[1] === arr[2]){
      setWinner(arr[0])
      handleOpen()
    }
    else if(arr[3] && arr[3] === arr[4] && arr[4] === arr[5]){
      setWinner(arr[3])
      handleOpen()
    }
    else if(arr[6] && arr[6] === arr[7] && arr[7] === arr[8]){
      setWinner(arr[6])
      handleOpen()
    }
    else if(arr[0] && arr[0] === arr[3] && arr[3] === arr[6]){
      setWinner(arr[0])
      handleOpen() 
    }
    else if(arr[1] && arr[1] === arr[4] && arr[4] === arr[7]){
      setWinner(arr[1])
      handleOpen()
    }
    else if(arr[2] && arr[2] === arr[5] && arr[5] === arr[8]){
      setWinner(arr[2])
      handleOpen()
    }
    else if(arr[0] && arr[0] === arr[4] && arr[4] === arr[8]){
      setWinner(arr[0])
      handleOpen()
    }
    else if(arr[2] && arr[2] === arr[4] && arr[4] === arr[6]){
      setWinner(arr[2])
      handleOpen()
    }
    else if(arr.every(item => item)){
      handleOpen()
    }
  }

  const renderTitle = () =>{
    if(lookMatch){
      if(title){
        return `Winner: Player ${title}`
      }
      else{
        return `Empate`
      }
    }
    else{
        return `Game turn player ${turno ? "1" : "2"}`
    }
  }

  const addTurn = (id) =>{
    if(!arr[id]){
      const arrCopy = [...arr]
      arrCopy[id] = turno ? 1 : 2
      setArr(arrCopy)
      setTurno(!turno)
    }
  }

  const renderCell = (value,id) => <div className="cell" onClick={() => addTurn(id)} key={id} id={`cell${id+1}`}>{
    !!value && (value === 1 ? <RxCross2/> : <RxCircle/>)
  }
  </div>

  const renderCells = () => {
    return(
      <>
        {
          arr.map((item,i) => renderCell(item,i))
        }
      </>
    )
  }

  

  return (
    <div className="App">
      <Grid container>
        <Grid md={3} xs={12}>
          <Record match={match} lookMatch={lookMatch} resetMatch={resetMatch} checkMatch={checkMatch}/>
        </Grid>
        <Grid md={9} xs={12}>
        <p className='turno'>
          {renderTitle()}
        </p>
        <div className="main">
          <div className="grid" type="button">
            {renderCells()}
          </div>
        </div>
        </Grid>
      </Grid>
      <Popup handleClose={handleClose} open={open} player={winner}/>
    </div>
  );
}

export default App;
