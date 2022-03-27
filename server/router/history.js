const express = require('express');
const { response } = require('..');
const router = express.Router();
const history = require('../model/orderHistory');
const historyItem = require('../model/orderHistoryItem');


router.get('/',
  function(request, response) {
    //check that userid is positive int and size in range and order id is empty set
    try {
      
       //userIds = parseInt(request.params.userId); this should be modified when auth works
       let userIds = 2;
      console.log(userIds);
      
      //checks that is number and not infinity, if ok returns true
      if(Number.isFinite(userIds) && userIds > 0) {
        let data = history.get(userIds); 
        if(data.status === 400 || data.status === 500) {
          response.send(data.status);
         
        } else {
          //response.json(data);
          response.send(data);
        }
      }
    }
        catch(err){
      console.log(err);
      response.sendStatus(400);
    } 
    
  });
      
      //check that orderid is int and size in range and only positive
      router.get('/:orderId',
      function(request, response) {
       let userIds = 2;//this should be changed when auth works
        let orderIds="";
        try {
          orderIds = parseInt(request.params.orderId);
          console.log(orderIds);
          //checks that is number and not infinity, if ok returns true
          if(Number.isFinite(orderIds) && orderIds > 0 && Number.isFinite(userIds) && userIds > 0){
            let data = historyItem.get(userIds, orderIds)
               if(data.status === 500 || data.status === 400) {
                 response.send(data.status);
               } else {
                 response.send(data);
               }
        }
      }
        catch(err){
          console.log(err);
          response.sendStatus(400);
        }

    
      
      });

  module.exports = router;