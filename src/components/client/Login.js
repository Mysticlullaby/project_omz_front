import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [input, setInput] = useState({
    clientId: "",
    clientPass: "",
  });

  const { clientId, clientPass } = input;

  const navigator = useNavigate();

  const handleValueChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onSubmit = async(e)
=>{
  e.preventDefault();
}


  return <div></div>;
};

export default Login;
