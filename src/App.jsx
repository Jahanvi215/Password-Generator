import { useCallback, useEffect, useRef, useState } from "react"


function App() {
  const[length, setLength] = useState(8)
  const[numberAllowed, setNumberAllowed] = useState(false)
  const[characterAllowed, setCharacterAllowed] = useState(false)
  const[password, setPassword] = useState("")
  const [color, setColor] = useState("#1f66ba")

  const passwordRef = useRef(null)

  const PasswordGenerator = useCallback(()=>{
    let pass = ""
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if  (numberAllowed) {
      str +="123456789"}
    if  (characterAllowed) {
      str +="!@#$%^&*-_+=[]{}~"}
    
    for(let i=1 ;i <= length ;i++) {
      let char =Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
     setPassword(pass)
  }
  ,[length, numberAllowed, characterAllowed, setPassword])

  const CopyToClipboard = useCallback(() =>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,999)
    window.navigator.clipboard.writeText(password)
  },[password])
 
  useEffect(() =>{
    PasswordGenerator()
  },
  [length, numberAllowed, characterAllowed, PasswordGenerator])
   
  return (
    <>
     
      <div className=" w-full max-w-md mx-auto shadow-lg rounded-lg px-4 py-3 my-8 bg-gray-700 text-orange-600">
      <h1 className=" text-center text-2xl text-white my-3 py-4">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 my-5">
        <input 
        type="text"
        value={password}
        readOnly
        placeholder="Password"
        className=" outline-none w-full py-1 px-3"
        ref={passwordRef}
         />
         <button 
         style={{backgroundColor: color}}
         className=" outline-none  text-white px-3 py-2 shrink-0"
         onClick={()=> {
          CopyToClipboard(),
          setColor("#f4a444")}} >copy</button>
        </div>
        <div className=" flex text-sm gap-x-2 text-lg cursor-pointer">
            <div className=" flex items-center gap-x-1">
              <input 
              type="range"
              min={8}
              max={100}
              value={length}
              className=" cursor-pointer"
              onChange={(e) => {setLength(e.target.value)}}
               />
               <label htmlFor="length" >Length: {length}</label>
            </div>

            <div className=" flex items-center gap-x-1">
              <input 
              type="checkbox"
              className=" cursor-pointer"
              defaultChecked= {numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed(( prev ) => !prev);
              }}
               />
               <label htmlFor="numberInput" >Numbers</label>
            </div>

            <div className=" flex items-center gap-x-1 ">
              <input 
              type="checkbox"
              className=" cursor-pointer"
              defaultChecked= {characterAllowed}
              id="characterInput"
              onChange={() => {
                setCharacterAllowed(( prev ) => !prev);
              }}
               />
               <label htmlFor="characterInput">Characters</label>
            </div>
        </div>
      </div>
    </>
  )
}

export default App
