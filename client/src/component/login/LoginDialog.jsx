import React from "react";
import { useState ,useContext} from "react";
import { authenticateSignup,authenticateLogin } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
import {
  Dialog,
  TextField,
  Box,
  Button,
  Typography,
  styled,
} from "@mui/material";
// import { useTheme } from "@emotion/react";

const Component = styled(Box)`
  height: 70vh;
  width: 90vh;
`;
const Image = styled(Box)`
  background: #2874f0
    url(https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png)
    center 85%
    no-repeat;
  height: 82%;
  width: 28%;
  padding:45px 35px;
  & > p, & h5{
    color:#fff;
    font-Weight:600;
}
`
const Wrapper = styled(Box)`
display:flex;
flex-direction:column;
padding:25px 35px;
flex:1;
& > div, & > Button,& > p{
    margin-top:16px
}
`
const LoginButton = styled(Button)`
text-transform:none;
background:#fb641b;
color:#fff;
height:48px;
border-radius:2px;

`
const RequestOTP = styled(Button)`
text-transform:none;
background:#fff;
color:#2874f0;
height:48px;
border-radius:2px;
box-shadow: 0 2px  4px 0 rgba(0 0 0/20%);

`
const Text = styled(Typography)`
font-size:12px;
color:#878787;
`
const CreatAccount = styled(Typography)`
font-size:14px;
text-align:center;
color:#2874f0;
font-weight:600;
cursor:pointer
`
const Error = styled(Typography)`
font-size:10px;
color:#ff6161;
line-height:0;
margin-top:10px;
font-weight:600;
`
const accountInitialvalues = {
    login:{
        view:"login",
        heading:"Login",
        subHeading:'Get access to your Orders, Wishlist and Recommendations'
    },
    signup:{
        view:"signup",
        heading:"Looks like you are new here!",
        subHeading:'sign up with your mobile number to get started'

    }
}

const signupInitialValues={
    firstname:'',
    lastname:'',
    username:'',
    email:'',
    password:'',
    phone:''
}
const loginInitialValues={
  username:'',
  password:''

}


const LoginDialog = ({ open, setOpen }) => {
const[account,toggleAccount] = useState(accountInitialvalues.login)
const [signup,setSignup] = useState(signupInitialValues)
const {setAccount} = useContext(DataContext)
const [login, setLogin] = useState(loginInitialValues)
const [error,setError] = useState(false)

  const handleClose = () => {
    setOpen(false);
    toggleAccount(accountInitialvalues.login)
    setError(false)
  };

  const Existing = () => {
    toggleAccount(accountInitialvalues.login)
  };


  const toggleSignup =()=>{
    toggleAccount(accountInitialvalues.signup);
  }
  const onInputchange = (e)=>{
    setSignup({...signup,[e.target.name]:e.target.value })

  }
  const signupUser=async()=>{
  let response =await authenticateSignup(signup)
    if(!response) return
    setAccount(signup.firstname)
    // console.log(response);
    handleClose();
  }


  const onValueChange=(e)=>{
    setLogin({...login,[e.target.name]:e.target.value});
  }

  const loginUser= async ()=>{
  let response =await authenticateLogin(login);
  if(response.status===200){
    handleClose();
    setAccount(response.data.data.firstname);
  }else{
    setError(true);

  }
  }

  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{sx:{maxWidth:"unset"}}}>
      <Component>
        <Box style={{ display: "flex" ,height:"100%" }}>
          <Image>
            <Typography variant="h5">{account.heading}</Typography>
            <Typography style={{marginTop:20}}>{account.subHeading}</Typography>

          </Image>
          { account.view ==="login" ? 
          <Wrapper >
            <TextField variant="standard" onChange={(e)=>onValueChange(e)} name="username" label="Enter Username" />
           { error && <Error >please Enter valid username or password</Error>}
            <TextField variant="standard" onChange={(e)=>onValueChange(e)} name="password" label="Enter Password" />
            <Text>
              By continuing, you agree to Flipkart's Terms of Use and Privacy
              Policy.
            </Text>
            <LoginButton onClick={()=>loginUser()}>Login</LoginButton>
            <Typography style={{textAlign:"center"}}>OR</Typography>
            <RequestOTP>Request OTP</RequestOTP>
            <CreatAccount onClick={()=>toggleSignup()}>New to flipkart? Create an account</CreatAccount>
          </Wrapper>
          :  
          <Wrapper >
            <TextField variant="standard" onChange={(e)=>onInputchange(e)} name="firstname" label="Enter Firstname" />
            <TextField variant="standard" onChange={(e)=>onInputchange(e)} name="lastname" label="Enter Lastname" />
            <TextField variant="standard" onChange={(e)=>onInputchange(e)} name="username" label="Enter Enter Username" />
            <TextField variant="standard" onChange={(e)=>onInputchange(e)} name="email" label="Enter Email" />
            <TextField variant="standard" onChange={(e)=>onInputchange(e)} name="phone" label="Enter Phone" />
            <TextField variant="standard" onChange={(e)=>onInputchange(e)} name="password" label="Enter Password" />
          
            <LoginButton onClick={()=>signupUser()}>Continue</LoginButton>
            <CreatAccount onClick={Existing} >Existing user? Log in</CreatAccount>
          </Wrapper>
           }
        </Box>
      </Component>
    </Dialog>
  );
};

export default LoginDialog;
