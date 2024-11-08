# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh




//OLD CODE

   let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "~!@#$%^&*_+-/";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length+1);
      //str.length + 1 ==
      pass += str.charAt(char);
    }

    //NEW CODE 

    
    let pass = "";
    let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let numbers = "0123456789";
    let specialChar = "~!@#$%^&*_+-/";
  
    let str = letters; // Start with letters only
  
    // Append numbers and special characters to the existing string
    if (numberAllowed) str += numbers;
    if (charAllowed) str += specialChar;
  
    // Ensure at least one number and/or special character is included if allowed
    if (numberAllowed) pass += numbers.charAt(Math.floor(Math.random() * numbers.length));
    if (charAllowed) pass += specialChar.charAt(Math.floor(Math.random() * specialChar.length));
  
    // Generate the remaining characters to fill the rest of the length
    for (let i = pass.length; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }