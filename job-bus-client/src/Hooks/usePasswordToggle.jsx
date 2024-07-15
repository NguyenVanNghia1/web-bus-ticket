import React, { useState } from 'react';
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

const usePasswordToggle = () => {
  const [visible, setVisibility] = useState(false);

  const Icon = visible ? <FaRegEyeSlash onClick={() => setVisibility(visible => !visible)}/> : <FaRegEye onClick={() => setVisibility(visible => !visible)}/>;

  const InputType = visible ? "text" : "password";

  return [ InputType, Icon ]; 
};

export default usePasswordToggle;