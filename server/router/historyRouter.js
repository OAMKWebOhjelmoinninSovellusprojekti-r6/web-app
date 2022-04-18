const express = require('express');
const router = express.Router();
const history = require('../model/orderHistory');
const historyItem = require('../model/orderHistoryItem');
const auth = require('../middleware/auth.js');

router.get('/', auth, async function(req, res) {
    //check that userid is positive int and size in range
    try {
       let userIds = req.tokenData.userData.userId;
      console.log(userIds);
      
      //checks that is number and not infinity, if ok returns true
      if(Number.isFinite(userIds) && userIds > 0) {
        let data = await history.get(userIds); 
        if(data.status === 400 || data.status === 500) {
          res.sendStatus(data.status);
         
        } else {
          //response.json(data);
          res.send(data);
        }
      }
    }
        catch(err){
      console.log(err);
      res.sendStatus(400);
    } 
    
  });

      //check that orderid is int and size in range and only positive
      router.get('/:orderId', auth, async function(req, res) {
       let userIds = req.tokenData.userData.userId;
        let orderIds="";
        try {
          orderIds = parseInt(req.params.orderId);
          console.log(orderIds);
          //checks that is number and not infinity, if ok returns true
          if(Number.isFinite(orderIds) && orderIds > 0 && Number.isFinite(userIds) && userIds > 0){
            let data = await historyItem.get(userIds, orderIds)
               if(data.status === 500 || data.status === 400) {
                res.sendStatus(data.status);
               } else {
                 res.send(data);
               }
          } else {
            res.sendStatus(400);
          }
      }
      catch(err){
        console.log(err);
        res.sendStatus(400);

      }
      
  });
  router.get('/owner/:restaurantId', auth, async function(req, res) {
    
     let restaurantId = req.params.restaurantId;
     try {
       restaurantId = parseInt(req.params.restaurantId);
       console.log(restaurantId);
       //checks that is number and not infinity, if ok returns true
       if(Number.isFinite(restaurantId) && restaurantId > 0){
         let data = await historyItem.getByOwner(restaurantId);
            if(data.status === 500 || data.status === 400) {
             res.sendStatus(data.status);
            } else {
              res.send(data);
            }
       }
   }
   catch(err){
     console.log(err);
     res.sendStatus(400);

   }
   
});

router.post('/', auth, async(req, res) => {

  let userId = req.tokenData.userData.userId
  let restaurantId = req.body.restaurantId;
  let totalAmount = req.body.totalAmount;
  let deliveryAddress = req.body.deliveryAddress;

  if(
    userId != null
    && restaurantId != null
  ){
    let data = await history.create(
      userId,
      restaurantId,
      totalAmount,
      deliveryAddress
    );
    if(
      data.errorCode == 0
      && data.success == true
      && data.idorder_history != null
    ) {
      return res.status(200).send({
        idorder_history: data.idorder_history
      });
    }
  } else {
    return res.status(400).send({
      message: 'Invalid parameters'
    });
  }
  return res.status(500).send({
    message: 'Unknown error'
  });
});

  module.exports = router;