import { Typography,Box , styled} from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';



const Heading =styled(Box)`
padding:15px 24px;
background:#fff;
border-bottom:1px solid #f0f0f0;

`

const ActuatHeading= styled(Typography)`
color:#878787;
`
const Container = styled(Box)`
padding:15px 24px;
background:#fff;
& > p{
    margin-bottom :20px;
    font-size:14px;
}
& > h6{
    margin-bottom :20px;
}
`

const Price = styled(Box)`
float:right;
`
const Discount = styled(Typography)`
color:green;
font-weight:500
`

const TotalView = ({cartItems}) => {
    const [price,setPrice]= useState(0);
    const [discount,setDiscount]= useState(0);

    useEffect(()=>{
        totalAmount();
    },[cartItems])

    const totalAmount= ()=>{
        let price= 0, discount = 0 ;
        cartItems.map(item=>{
            price += item.price.mrp;
            discount += (item.price.mrp - item.price.cost);

        });
        setPrice(price);
        setDiscount(discount)
    }

  return (
    <Box>
        <Heading>
            <ActuatHeading>PRICE DETAILS</ActuatHeading>
        </Heading>
        <Container>
            <Typography>Price ({cartItems?.length}item)
            <Price component="span">₹{price}</Price>
            </Typography>
            <Typography>Discount
            <Price component="span">-₹{discount}</Price>
            </Typography>
            <Typography>Delivery Charges
            <Price component="span">Free</Price>
            </Typography>
            <Typography component="h6">Total Amount
            <Price component="span">₹{price - discount}</Price>
            </Typography>
            <Discount>You will save ₹{discount} on this order</Discount>

        </Container>

    </Box>
  )
}

export default TotalView