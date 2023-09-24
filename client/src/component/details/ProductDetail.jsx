import React from "react";
import { Typography ,Box, styled, Table, TableBody,TableCell, TableRow} from "@mui/material";
import {LocalOffer as Badge} from '@mui/icons-material';


const SmallText = styled(Box)`
font-size:14px;
vertical-align: baseline;
& > p{
    font-size:14px;
    margin-top:10px;
}
`

const StyledBadge= styled(Badge)`
margin-right:10px;
color:#00cc00;
font-size:15px

`

const ColumnText = styled(TableRow)`
font-size:14px;
vertical-align:baseline;
& > td{
    font-size:14px;
    margin-top:10px;
    border:none
}`

const ProductDetail = ({product}) => {
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png'
    const date= new Date(new Date().getTime()+(5 * 24 * 60 * 60 * 1000));
    const adURL = 'https://rukminim1.flixcart.com/lockin/774/185/images/CCO__PP_2019-07-14.png?q=50';
  return (
    <>
      <Typography>{product.title.longTitle}</Typography>
      <Typography style={{ marginTop: 5, color: "#878787", fontSize: 14 }}>
        8 Ratings & 1 Reviews
        <Box component="span">
          <img src={fassured} style={{ width: 77, marginLeft: 20 }} alt="f" />
        </Box>
      </Typography>
      <Typography>
        <Box component="span" style={{ fontSize: 28 }}>
          ₹{product.price.cost}
        </Box>
        &nbsp;&nbsp;&nbsp;
        <Box component="span" style={{ color: "#878787" }}>
          <strike>{product.price.mrp}</strike>
        </Box>
        &nbsp;&nbsp;&nbsp;
        <Box component="span" style={{ color: "#388e3c" }}>
          {product.price.discount}
        </Box>
      </Typography>
      <Typography>Available Offers</Typography>
      <SmallText>
        <Typography><StyledBadge/>Bank OfferFlat ₹200 off on HDFC Bank Credit/Debit Card on 3 months EMI Txns, Min Txn Value ₹10,000T&C </Typography>
        <Typography><StyledBadge/>Bank OfferFlat ₹500 off on HDFC Bank Credit/Debit Card on 6 months EMI Txns, Min Txn Value ₹10,000T&C</Typography>
        <Typography><StyledBadge/>Bank OfferFlat ₹500 off on HDFC Bank Credit/Debit Card on 9 months EMI Txns, Min Txn Value ₹10,000T&C</Typography>
        <Typography><StyledBadge/>Special PriceGet extra 10% off (price inclusive of cashback/coupon)T&C</Typography>
        <Typography><StyledBadge/>Combo OfferBuy 2 items save 5%; Buy 3 or more save 7%See all productsT&C</Typography>
        <Typography><StyledBadge/>Partner OfferPurchase now & get 1 surprise cashback coupon in FutureKnow More</Typography>
      </SmallText>
      <Table>
        <TableBody>
            <ColumnText>
                <TableCell style={{color:'#878787'}}>Delivery</TableCell>
                <TableCell style={{fontWeight:600}}>Delivery By {date.toDateString() } | ₹40</TableCell>
            </ColumnText>
            <ColumnText>
                <TableCell style={{color:'#878787'}}>Warranty</TableCell>
                <TableCell>No Warranty</TableCell>
            </ColumnText>
            <ColumnText>
                <TableCell style={{color:'#878787'}}>Seller</TableCell>
                <TableCell>
                    <Box style={{color:'#2874f0'}} component="span"> SuperComNet</Box>
                    <Typography>GST invoice available</Typography>
                    <Typography>View more sellors strating from ₹{product.price.cost}</Typography>
                </TableCell>
            </ColumnText>
            <ColumnText>
                <TableCell colSpan={2}>
                    <img src={adURL} style={{width:390}} alt="supercoins" />

                </TableCell>
            </ColumnText>
            <ColumnText>
                <TableCell style={{color:'#878787'}}>Discription</TableCell>
                <TableCell>{product.description}</TableCell>
            </ColumnText>
        </TableBody>
      </Table>
    </>
  );
};

export default ProductDetail;
