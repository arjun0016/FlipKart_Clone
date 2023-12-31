import React from "react";
import { AppBar, Toolbar, Box, Typography,styled, IconButton, Drawer, ListItem, List } from "@mui/material";
import { useState } from "react";
import Search from "./Search";
import CustomButton from "./CustomButton";
import { Link } from "react-router-dom";
import {Menu} from '@mui/icons-material';

const StyledHeader = styled(AppBar)`
  background: #2874f0;
  height: 55px;
`;
const Component = styled(Link)`
  margin-left: 12%;
  line-height: 0;
  text-decoration:none;
  color:inherit;
`;
const SubHeading = styled(Typography)`
  font-size: 10px;
  font-style: italic;
`;
const PlusImage = styled("img")({
  width: 10,
  height: 10,
  marginLeft: 4,
});

const CustomButtonWrapper = styled(Box)(({theme})=>({
  margin:' 0 5% 0 auto',
  [theme.breakpoints.down('md')]:{
    display:"none"
  }
  
}))

const MenuButton = styled(IconButton)(({theme})=>({
  display:'none',
  [theme.breakpoints.down('md')]:{
    display:'block'
  }
}))

const Header = () => {
  const loginUrl =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png";
  const subUrl =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png";
const [open,setOpen] = useState(false);
const handleOpen= ()=>{
  setOpen(true);

}
const handleClose=()=>{
  setOpen(false);
}
const list = () => (
  <Box style={{ width: 200 }} onClick={handleClose}>
    <List>
      <ListItem button>
        <CustomButton />
      </ListItem>
    </List>
  </Box>
);

  return (
    <StyledHeader>
      <Toolbar style={{ minHeight: 55 }}>
          <MenuButton color="inherit" onClick={handleOpen}>
            <Menu/>
          </MenuButton>

        <Drawer open={open} onClose={handleClose}>
         {list()}
        </Drawer>

        <Component to="/">
          <img src={loginUrl} alt=" " style={{ width: 75 }} />

          <Box style={{ display: "flex" }}>
            <SubHeading>
              Explore
              <Box component="span" style={{ color: "yellow" }}>
                {" "}
                plus
              </Box>
            </SubHeading>

            <PlusImage src={subUrl} alt="" />
          </Box>
        </Component>
        <Search />
        <CustomButtonWrapper>
          <CustomButton />
        </CustomButtonWrapper>
      </Toolbar>
    </StyledHeader>
  );
};

export default Header;
