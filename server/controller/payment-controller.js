import paytmchecksum from "../paytm/PaytmChecksum.js"
import { paytmParams,paytmMerchantkey } from "../index.js"
import formidable from "formidable";
import { request } from "express";
import https from 'http'

export const addPaymentGateway = async(res,req)=>{
    try{
        let paytmCheckSum= await paytmchecksum.generateSignature(paytmParams, paytmMerchantkey);
        let params = {
            ...paytmParams, 'CHECKSUMHASH': paytmCheckSum
        }
        res.status(200).json(params);
    }catch(error){
        res.status(500).json({error:error.message})
    }

}

export const PaytmResponse = (res,req)=>{
    const form = new formidable.IncomingForm();
    let paytmCheckSum = req.body.CHECKSUMHASH;
    delete request.body.CHECKSUMHASH;

    let isVerifySignature = paytmchecksum.verifySignature(req.body,paytmMerchantkey,paytmCheckSum)
    if (isVerifySignature) {
        let paytmParams = {};
        paytmParams['MID']= req.body.MID;
        paytmParams['ORDER_ID']= req.body.ORDER_ID;
        paytmchecksum.generateSignature(paytmParams,paytmMerchantkey).then(function(checksum){
            paytmParams['CHECKSUMHASH'] = checksum;

            let post_data = JSON.stringify(paytmParams);

            let options = {
                hostname:'securegw-stage.paytm.in',
                port :443,
                path:'/order/status',
                headers:{
                    'content-Type': 'application/json',
                    'content-Length': post_data.length
                }
            }
            let res="";
            let post_req = https.request(options,function(post_res){
                post_res.on('data',function(chunk){
                    res += chunk;

                });
                post_res.on('end',function(){
                    let result = JSON.parse(res)
                    response.redirect('http://localhost:3000/')

                })
            });
            post_req.write(post_data);
            post_req.end();
        })


    }else{
        console.log('checksum mismatched');
    }
}