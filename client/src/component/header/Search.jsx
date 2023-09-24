import React, { useEffect } from 'react'
import {InputBase,Box, List,ListItem} from '@mui/material'
import styled from '@emotion/styled'
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {getProducts} from '../../redux/action/productAction'
import { Link } from 'react-router-dom';

const SearchContainer= styled(Box)`
background:#fff;
width:38%;
border-radius:2px;
margin-left:10px;
display:flex;
`
const SearchIconWrapper = styled(Box)`
color:black;
padding:5px;
display:flex;
`

const InputSearchBase = styled(InputBase)`
padding-left:20px;
width:100%;
`
const ListWrapper = styled(List)`
position:absolute;
background:#ffffff;
color:#000;
margin-top:36px;

`

const Search = () => {
  const[text, setText] =useState('')
  const dispatch=useDispatch();

  const {products} = useSelector(state=>state.getProducts);

  useEffect(()=>{
    dispatch(getProducts())
  },[dispatch])

  const getText=(text)=>{
    setText(text)

  }
  return (
    <SearchContainer>
    <InputSearchBase  
    placeholder='Search for products,brands and more'
    onChange={(e)=>getText(e.target.value)}
    value={text}
    />
    <SearchIconWrapper>
        <SearchIcon/>
    </SearchIconWrapper>
      {
        text && 
        <ListWrapper>
          {
            products.filter(product=>product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product=>(
              <ListItem> 
                <Link 
                to={`/product/${product.id}`}
                onClick={()=>{setText('')}}
                style={{textDecoration:"none",color:'inherit'}}>
                {product.title.longTitle}
                </Link>
              </ListItem>
            ))
          }
        </ListWrapper>
      }


    </SearchContainer>
 )
}

export default Search