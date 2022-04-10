const express = require('express');
const router = express.Router();
const history = require('../model/orderHistory');
const historyItem = require('../model/orderHistoryItem');
const auth = require('../middleware/auth')

router.get('/', auth,
async function(req, res) {
    //check that userid is positive int and size in range and order id is empty set
    try {
      
       //userIds = parseInt(request.params.userId); this should be modified when auth works
       let userIds = 2;
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
router.get('/:orderId', auth,
async function(req, res) {
  let userIds = 2;//this should be changed when auth works
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
      }
    }
      catch(err){
        console.log(err);
        res.sendStatus(400);
      }

    
      
  });

router.post('/', auth, async(req, res) => {
  // Send create request
  console.log(req.body);
  let data = await history.create(req.body);
  console.log("routerdata", data);
  try {
    if(data.affectedRows === 1) {
        console.log(data.affectedRows);
        res.json(data);
    } else if(data.affectedRows === 0) {
        res.sendStatus(400);
    } else {
        res.sendStatus(500);
    }
  } catch (err) {
    res.send("ID does not match");
  };
});

  module.exports = router;