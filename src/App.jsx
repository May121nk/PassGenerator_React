import React, { useState, useCallback, useEffect, useRef } from "react";

const App = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberALlowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [Password, setPassword] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  //USE REF HOOK

  const PasswordRef = useRef(null); // default value na ho to null dete hai
  //use call back function ko memorize karta hai
  const PassGenerator = useCallback(() => {
    let pass = "";
    let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let numbers = "0123456789";
    let specialChar = "~!@#$%^&*_+-/";

    let str = letters; // Start with letters only

    // Append numbers and special characters to the existing string
    if (numberAllowed) str += numbers;
    if (charAllowed) str += specialChar;

    // Ensure at least one number and/or special character is included if allowed
    if (numberAllowed)
      pass += numbers.charAt(Math.floor(Math.random() * numbers.length));
    if (charAllowed)
      pass += specialChar.charAt(
        Math.floor(Math.random() * specialChar.length)
      );

    // Generate the remaining characters to fill the rest of the length
    for (let i = pass.length; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char); //char at isse konsi index par aapko value chahiye vo decide karta hai
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    PasswordRef.current?.select();
    //current? = this is optional select because may be current value is 0
    PasswordRef.current?.setSelectionRange(0, 101); // isse range decide kar sakte hai ki kitni values aap select karna chahte hai
    window.navigator.clipboard.writeText(Password);
    // because you are working core react thats why you directly use *WINDOW* BECAUSE ULTIMATELY REACT COMPILE HOGI JAVASCRIPT MAI OR JAHA BHI YE RUN HOGI WAHA WINDOW OBJECT HOGA
    // BUT NEXT JS MAI ESA NHI HOTA BECAUSE WAHA PAI HOTI HAI SERVER SIDE RENDERING TO SARA CODE RUN HOTA HAI SERVER PAI OR SERVER PAR WINDOW OBJECT NHI HOTA

    // Set "Copied" state to true
    setIsCopied(true);

    // Revert the "Copied" text back to "Copy" after 2 seconds
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  }, [Password]); // use call back ke dependency mai vo values dedete hai jispr function dependent ho uske  change hone par

  //USE EFFECT HOOK JAB BHI HAMARA PAGE LOAD HOTA HAI TO FIRST TIME PAR YE CALL HOTA HAI OR AGAR KAHI PAR BHI KUCH CHANGE HUA TO YE VAPS SE RELOAD HOJATA HAI
  useEffect(() => {
    PassGenerator();
  }, [length, numberAllowed, charAllowed, PassGenerator]);

  return (
    <div className="w-full max-w-md text-2xl mx-auto shadow-md rounded-lg px-8 py-10  my-20 text-orange-500 bg-gray-700 ">
      <h1 className="text-white text-3xl mb-8 text-center">
        Password Generator
      </h1>
      <div className="flex  shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={Password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={PasswordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className={`py-0.5 px-3 outline-none shrink-0 ${
            isCopied ?  " all ease-in 0.5s bg-green-500 text-white" : "bg-blue-700 text-white"
          }`}>
          {isCopied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={8}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Length:({length})</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberALlowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  );
};

export default App;
