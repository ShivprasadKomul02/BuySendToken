const HDWalletProvider = require('@truffle/hdwallet-provider');
const express = require("express");
const bodyParser = require("body-parser");
const app = express(); 

const { MongoClient } = require("mongodb");
const uri ="mongodb://renai:mecasso@34.132.175.83:27017/mecasso";
const client = new MongoClient(uri);

const charmabi = require('./charmabi.js');
const daoabi = require('./SocTokDAO_ABI.js');

var Web3 = require('web3');

const config = {
	//private: "1f2cee2378fc5b01acb32099a7ce727616a28a7e862142f8e72aef61f4568dc2",
  //owner: "0x8391c675d2f3588ff97a336E0A6b368546e4F322",
	//rpc:"http://127.0.0.1:7545",
  //charmAddress:"0xc5c30e6b9dc76f545d32831e1546f79537260298"
  //private: "2c0389a1e970dc33f82499c595763b2aab98f1e42410174ed9d352530643aca8",
  //private:"c3d414ba34f032294590df2710a27ceae423dda3cf9450f5081fefae4cb325e1",
 private:"3711184aff12f5ae1a779b8c8f9a7ec6aef7cc1de85a896cc3d52ebc3b226c07",
 // private:"34e26d0b86924fb4f1e6d96c9560d0bed78496d996180633872004848d40cf0b",
   // private:"c3d414ba34f032294590df2710a27ceae423dda3cf9450f5081fefae4cb325e1",
  rpc: "https://speedy-nodes-nyc.moralis.io/5a65aeefd6cc8930e6f47455/polygon/mumbai",
  //rpc: "https://speedy-nodes-nyc.moralis.io/833cf87df6d280847ac4787c/polygon/mumbai",
  //rpc:"https://mumbai.polygonscan.com/address/0x8391c675d2f3588ff97a336e0a6b368546e4f322"
  //rpc: "https://rpc-mumbai.maticvigil.com/v1/6f0befe99ee36acaf02cfd01729e89fd04d9426e",
  //ownerAddress: "0xB418Ef86F473229c31c36a6e7aF1ACa4674e07e4",  
  ownerAddress:"0x8391c675d2f3588ff97a336E0A6b368546e4F322",
  charmAddress:"0x526637f44f0d8979cCE28A5397eafF3471C48f5a",
  charmXnew:"0x2b79cca533f4cbd5c7cd73d436aebf0f11843e62"
}

const owner = new HDWalletProvider(config.private, config.rpc)
const web3 = new Web3(owner)

//const maker = new HDWalletProvider(config.private, config.rpc)
//const web3 = new Web3(maker)


const charmAbi = JSON.parse(charmabi);

const contract = new web3.eth.Contract(charmAbi, config.charmAddress)



//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true })); 

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var server = app.listen(process.env.PORT || 5000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);	
	});


  app.post("/mintCharm", function(req,res){

    //req.body.receiver - Address
      var sendResponseObject={};
    contract.methods.mint(req.body.receiver,1).send({from: config.ownerAddress}, function(error, transactionHash){
          if(error) {
            console.log("Error at mint charm");
          }
      })
      .on('error', function(error)
        { console.log("error at mintcharm",error); })
      .on('transactionHash', function(transactionHash)
      
      { 
        sendResponseObject['txHash'] = transactionHash;
        console.log("txHash",transactionHash); 
     })
      .on('receipt', function(receipt){
        sendResponseObject['receipt'] =receipt;
      console.log("receipt",receipt);
      

      res.send(sendResponseObject);

      });
    })


    app.post("/getTokenomics", function(req,res){

      //req.body.receiver - Address
      var sendResponseObject={};

      const ABI = JSON.parse(daoabi);

    const token = new web3.eth.Contract(ABI, req.body.DAOAddress);  


    token.methods.balanceOf(req.body.creatorAddress).call({from: config.owner}).then(function(response,err){

      if(response)
     {
      sendResponseObject['creatorBalance'] = response;

 
            token.methods
            .cap()	 
            .call({from: config.owner}).then(function(response,err){
                                     
                if(response) 
                  {
                  sendResponseObject['cap'] = response;
                 

           token.methods
            .totalSupply()	 
            .call({from: config.owner}).then(function(response,err){

              if(response) 
                {
                  sendResponseObject['totalSupply'] = response;
                  
                  let jsonString= JSON.stringify(sendResponseObject)
                  console.log(jsonString,"response");
                  res.send(jsonString);  
                }
              else
                {
                  sendResponseObject['error'] = err;
                  let jsonString= JSON.stringify(sendResponseObject)
                  res.send(jsonString);
                }
            });
          }
          else
                {
                  sendResponseObject['error'] = err;
                  let jsonString= JSON.stringify(sendResponseObject)
                  res.send(jsonString);
                }
            });
          }
          else
                {
                  sendResponseObject['error'] = err;
                  let jsonString= JSON.stringify(sendResponseObject)
                  res.send(jsonString);
                }
            });
          })    


    
  
  
  


app.post("/addnewDAO", function(req,res){
	
		console.log("Reached here",req.body);
        
        var sendResponseObject={};
		
		addDAO(req.body).then(function(response,err){
		
		if(response)
		{
		
		 sendResponseObject['DAO_ID'] = response;

         addCreator(req.body).then(function(response,err){ 

        if(response)
        {
                        
        sendResponseObject['creator_ID'] = response;
                                
        console.log(sendResponseObject);
		console.log("sendResponseObject");
		let jsonString= JSON.stringify(sendResponseObject)
		res.send(jsonString);
		}
		else
		{
		
		 sendResponseObject['error'] = err;
		 
         console.log(sendResponseObject);
         console.log("sendResponseObject");
         let jsonString= JSON.stringify(sendResponseObject)
         res.send(jsonString);
		}
        })
        }

        else
		{
		
		 sendResponseObject['error'] = err;
		 
         console.log(sendResponseObject);
         console.log("sendResponseObject");
         let jsonString= JSON.stringify(sendResponseObject)
         res.send(jsonString);
		}
		
 })
});	


app.post("/addnewPost", function(req,res){
	
    console.log("Reached here",req.body);
    
    var sendResponseObject={};
    
    addPost(req.body).then(function(response,err){
    
    if(response)
    {
    
     sendResponseObject['ID'] = response;
                            
    console.log(sendResponseObject);
    console.log("sendResponseObject");
    let jsonString= JSON.stringify(sendResponseObject)
    res.send(jsonString);
    }
    else
    {
    
     sendResponseObject['error'] = err;
     
     console.log(sendResponseObject);
     console.log("sendResponseObject");
     let jsonString= JSON.stringify(sendResponseObject)
     res.send(jsonString);
    }
    })
    })

    
    app.post("/viewallPosts", function(req,res){
  
      console.log("Reached here",req.body);
          
      var sendResponseObject={};
      
      viewallPosts().then(function(response,err){
      
      if(response)
      {
            
      sendResponseObject['Posts'] = response;                   
      console.log(sendResponseObject);
      console.log("sendResponseObject");
      let jsonString= JSON.stringify(sendResponseObject)
      res.send(jsonString);
      }
      else
      {
      
       sendResponseObject['error'] = err;
       
       console.log(sendResponseObject);
       console.log("sendResponseObject");
       let jsonString= JSON.stringify(sendResponseObject)
       res.send(jsonString);
      }
      })
      })

    
    
    app.post("/viewallCreatorPosts", function(req,res){
  
      console.log("Reached here",req.body);
          
      var sendResponseObject={};
      
      viewallCreatorPosts(req.body.tokenName,req.body.DAOcontract).then(function(response,err){
      
      if(response)
      {
            
      sendResponseObject['Posts'] = response;                   
      console.log(sendResponseObject);
      console.log("sendResponseObject");
      let jsonString= JSON.stringify(sendResponseObject)
      res.send(jsonString);
      }
      else
      {
      
       sendResponseObject['error'] = err;
       
       console.log(sendResponseObject);
       console.log("sendResponseObject");
       let jsonString= JSON.stringify(sendResponseObject)
       res.send(jsonString);
      }
      })
      })

      app.post("/viewCreatorDAOs", function(req,res){
  
        console.log("Reached here",req.body);
            
        var sendResponseObject={};
        
        viewallDAOs(req.body.userID).then(function(response,err){
        
        if(response)
        {
              
        sendResponseObject['DAOs'] = response.DAOs;
        sendResponseObject['profilePhoto'] = response.profilePhoto;                  
        console.log(sendResponseObject);
        console.log("sendResponseObject");
        let jsonString= JSON.stringify(sendResponseObject)
        res.send(jsonString);
        }
        else
        {
        
         sendResponseObject['error'] = err;
         
         console.log(sendResponseObject);
         console.log("sendResponseObject");
         let jsonString= JSON.stringify(sendResponseObject)
         res.send(jsonString);
        }
        })
        })

        
      app.post("/viewallCreators", function(req,res){
  
        console.log("Reached here",req.body);
            
        var sendResponseObject={};
        
        viewCreators().then(function(response,err){
        
        if(response)
        {
              
        sendResponseObject['Creators'] = response;                   
        console.log(sendResponseObject);
        console.log("sendResponseObject");
        let jsonString= JSON.stringify(sendResponseObject)
        res.send(jsonString);
        }
        else
        {
        
         sendResponseObject['error'] = err;
         
         console.log(sendResponseObject);
         console.log("sendResponseObject");
         let jsonString= JSON.stringify(sendResponseObject)
         res.send(jsonString);
        }
        })
        })


app.post("/viewUserDets", function(req,res){
  
  console.log("Reached here",req.body);
      
  var sendResponseObject={};
  
  viewUser(req.body.userID).then(function(response,err){
  
  if(response)
  {
   
    
  sendResponseObject['DAOs'] = response[0].DAOs;                   
  console.log(sendResponseObject);
  console.log("sendResponseObject");
  let jsonString= JSON.stringify(sendResponseObject)
  res.send(jsonString);
  }
  else
  {
  
   sendResponseObject['error'] = err;
   
   console.log(sendResponseObject);
   console.log("sendResponseObject");
   let jsonString= JSON.stringify(sendResponseObject)
   res.send(jsonString);
  }
  })
  })

  app.post("/viewUserTransactions", function(req,res){
  
    console.log("Reached here",req.body);
        
    var sendResponseObject={};
    
    viewUserTransactions(req.body.userID).then(function(response,err){
    
    if(response)
    {
          
    sendResponseObject['transactions'] = response;                   
    console.log(sendResponseObject);
    console.log("sendResponseObject");
    let jsonString= JSON.stringify(sendResponseObject)
    res.send(jsonString);
    }
    else
    {
    
     sendResponseObject['error'] = err;
     
     console.log(sendResponseObject);
     console.log("sendResponseObject");
     let jsonString= JSON.stringify(sendResponseObject)
     res.send(jsonString);
    }
    })
    })

    app.post("/viewCreatorTransactions", function(req,res){
  
      console.log("Reached here",req.body);
          
      var sendResponseObject={};
      
      viewCreatorTransactions(req.body.userID).then(function(response,err){
      
      if(response)
      {
            
      sendResponseObject['transactions'] = response;                   
      console.log(sendResponseObject);
      console.log("sendResponseObject");
      let jsonString= JSON.stringify(sendResponseObject)
      res.send(jsonString);
      }
      else
      {
      
       sendResponseObject['error'] = err;
       
       console.log(sendResponseObject);
       console.log("sendResponseObject");
       let jsonString= JSON.stringify(sendResponseObject)
       res.send(jsonString);
      }
      })
      })   
  
      app.post("/viewPrice", function(req,res){
  
        console.log("Reached here",req.body);
            
        var sendResponseObject={};
        
        viewPrice(req.body.tokenContract).then(function(response,err){
        
        if(response)
        {
              
        sendResponseObject['price'] = response;                   
        console.log(sendResponseObject);
        console.log("sendResponseObject");
        let jsonString= JSON.stringify(sendResponseObject)
        res.send(jsonString);
        }
        else
        {
        
         sendResponseObject['error'] = err;
         
         console.log(sendResponseObject);
         console.log("sendResponseObject");
         let jsonString= JSON.stringify(sendResponseObject)
         res.send(jsonString);
        }
        })
        })
      
        app.post("/viewallPrices", function(req,res){
  
          console.log("Reached here",req.body);
              
          var sendResponseObject={};
          
          viewallPrices().then(function(response,err){
          
          if(response)
          {
                
          sendResponseObject['prices'] = response;                   
          console.log(sendResponseObject);
          console.log("sendResponseObject");
          let jsonString= JSON.stringify(sendResponseObject)
          res.send(jsonString);
          }
          else
          {
          
           sendResponseObject['error'] = err;
           
           console.log(sendResponseObject);
           console.log("sendResponseObject");
           let jsonString= JSON.stringify(sendResponseObject)
           res.send(jsonString);
          }
          })
          })

          

          app.post("/returnSalesAgg", function(req,res){
  
            
                
            var sendResponseObject={};
            
            returnSalesaggregates().then(function(response,err){
            
            if(response)
            {
                  
            sendResponseObject['sales'] = response;
            
            console.log(sendResponseObject);
            console.log("sendResponseObject");
            let jsonString= JSON.stringify(sendResponseObject)
            res.send(jsonString);
            }
            else
            {
            
             sendResponseObject['error'] = err;
             
             console.log(sendResponseObject);
             console.log("sendResponseObject");
             let jsonString= JSON.stringify(sendResponseObject)
             res.send(jsonString);
            }
            })
            })

       


//===============================
// Services added by Manu

app.post("/getAllDAOs", function(req,res){
  console.log("Reached here",req.body);
  var sendResponseObject={};
  getAllDAOs().then(function(response,err){
      if(response)
      {
          sendResponseObject['creators'] = response;
          console.log(sendResponseObject);
          console.log("sendResponseObject");
          let jsonString= JSON.stringify(sendResponseObject)
          res.send(jsonString);
      }
      else
      {
          sendResponseObject['error'] = err;
          console.log(sendResponseObject);
          console.log("sendResponseObject");
          let jsonString= JSON.stringify(sendResponseObject)
          res.send(jsonString);
      }
  })
})

app.post("/checkUserExists", function(req,res){
  console.log("Reached here",req.body);
  var sendResponseObject={};
  userExists(req.body.userID).then(function(response,err){
      if(response)
      {
          sendResponseObject['result'] = response;
          console.log(sendResponseObject);
          let jsonString= JSON.stringify(sendResponseObject)
          res.send(jsonString);
      }
      else
      {
          sendResponseObject['error'] = err;
          console.log(sendResponseObject);
          console.log("sendResponseObject");
          let jsonString= JSON.stringify(sendResponseObject)
          res.send(jsonString);
      }
  })
})

app.post("/createNewUser", function(req,res){
  console.log("Reached here",req.body);
  var sendResponseObject={};
  addUser(req.body.userID, req.body.tokenName, req.body.contractAddress).then(function(response,err){
      if(response)
      {
          sendResponseObject['result'] = response;
          console.log(sendResponseObject);
          let jsonString= JSON.stringify(sendResponseObject)
          res.send(jsonString);
      }
      else
      {
          sendResponseObject['error'] = err;
          console.log(sendResponseObject);
          console.log("sendResponseObject");
          let jsonString= JSON.stringify(sendResponseObject)
          res.send(jsonString);
      }
  })
})

app.post("/queryDAO", function(req,res){
  console.log("Reached here",req.body);
  var sendResponseObject={};
  queryDAO(req.body.contractAddress).then(function(response,err){
      if(response)
      {
          sendResponseObject['queryresult'] = response;
          console.log(sendResponseObject);
          let jsonString= JSON.stringify(sendResponseObject)
          res.send(jsonString);
      }
      else
      {
          sendResponseObject['error'] = err;
          console.log(sendResponseObject);
          console.log("sendResponseObject");
          let jsonString= JSON.stringify(sendResponseObject)
          res.send(jsonString);
      }
  })
})

app.post("/addTransaction", function(req,res){

  console.log("Reached here",req.body);

  var sendResponseObject={};

  addTransaction(req.body).then(function(response,err){

      if(response)
      {
          sendResponseObject['transactionID'] = response;

          addUser(req.body.userID,req.body.tokenName,req.body.contractAddress).then(function(response,err){

              if(response)
              {

                  sendResponseObject['userID'] = response;
                  console.log(sendResponseObject);
                  console.log("sendResponseObject");
                  let jsonString= JSON.stringify(sendResponseObject)
                  res.send(jsonString);
              }
              else
              {

                  sendResponseObject['error'] = err;
                  console.log(sendResponseObject);
                  console.log("sendResponseObject");
                  let jsonString= JSON.stringify(sendResponseObject)
                  res.send(jsonString);
              }
          })

      }

      else
      {

          sendResponseObject['error'] = err;
          console.log(sendResponseObject);
          console.log("sendResponseObject");
          let jsonString= JSON.stringify(sendResponseObject)
          res.send(jsonString);
      }
  })
})


app.post("/addCharmTransaction", function(req,res){

  console.log("Reached here in addcharm transaction",req.body);

  var sendResponseObject={};

  addCharmTransaction(req.body).then(function(response,err){

      if(response)
      {
          sendResponseObject['transactionID'] = response;

                  console.log(sendResponseObject);
                  console.log("sendResponseObject");
                  let jsonString= JSON.stringify(sendResponseObject)
                  res.send(jsonString);
             
      }

      else
      {

          sendResponseObject['error'] = err;
          console.log(sendResponseObject);
          console.log("sendResponseObject");
          let jsonString= JSON.stringify(sendResponseObject)
          res.send(jsonString);
      }
  })
})

app.post("/viewCharmOnChainBalance", function(req,res){

  console.log("Reached here",req.body);

  var sendResponseObject={};

  contract.methods.balanceOf(req.body.contract).call({from: config.owner}).then(function(result,err){
  
  console.log(result);

  if(result)
  {
  sendResponseObject['charmBalance'] = result;
  let jsonString= JSON.stringify(sendResponseObject)
  res.send(jsonString);  
  }
  else
  {
    sendResponseObject['error'] = err;
    let jsonString= JSON.stringify(sendResponseObject)
    res.send(jsonString);
  }
});
})

//Alternate model where Charm is an off-chain token
app.post("/viewCharmBalance", function(req,res){

  console.log("Reached here",req.body);

  var sendResponseObject={};

  returnCharmBalance(req.body).then(function(response,err){

      if(response)
      {
          sendResponseObject['charmBalance'] = response[0].charmBalance;

                  console.log(sendResponseObject);
                  console.log("sendResponseObject");
                  let jsonString= JSON.stringify(sendResponseObject)
                  res.send(jsonString);

      }

      
      else
      {

          sendResponseObject['error'] = err;
          console.log(sendResponseObject);
          console.log("sendResponseObject");
          let jsonString= JSON.stringify(sendResponseObject)
          res.send(jsonString);
      }
    })
  })

    
async function addTransaction(JSdoc) {

    try
    {

        await client.connect();

        const database = client.db("mecasso");

        const coll = database.collection("transactions");

        const doc = JSdoc;


        const results = await coll.insertOne(
            {

                tokenName: JSdoc.tokenName,
                baseAsset: JSdoc.baseAsset,
                buyerID: JSdoc.userID,
                sellerID: JSdoc.creator,
                DAOaddress: JSdoc.contractAddress,
                price: JSdoc.price,
                amount: JSdoc.amount,
                transactionDate: JSdoc.transactionDate
            }
        );

        console.log(

            `${results.insertedCount} documents were inserted with the _id: ${results.insertedId}`,

        );

        return results.insertedId;
    }
    catch(error)
    {
        console.log(error);
        return error;
    }
}


async function addCharmTransaction(JSdoc) {

  try
  {

      await client.connect();

      const database = client.db("mecasso");

      const coll = database.collection("charmtransactions");

    const results= await coll.insertOne(
          {

              tokenName: JSdoc.tokenName,              
              DAOaddress: JSdoc.contract,
              transactionDate: JSdoc.transactionDate,
              charm: 1
              
          }
      );
     console.log(`documents were inserted with the _id:`,results);
     console.log(results.insertedId);

      const coll2 = database.collection("posts");


const updateResult = await coll2.updateOne(
         { tokenName: JSdoc.tokenName,
          publisheddatetime: JSdoc.publisheddatetime} ,
        { $inc: { charm: +1 } });


     console.log("Update result:",updateResult);

      return results.insertedId;
  }
  catch(error)
  {
      console.log(error);
      return error;
  }
}


async function addDAO(JSdoc) {

	try 
	{
	
	 await client.connect();
	 
	 const database = client.db("mecasso");
	
	 const coll = database.collection("dao");
	 
	 const doc = JSdoc;
	 
     var Youtube = JSdoc.socialMedia.Youtube;

	 const results = await coll.insertOne(
        {
            _id: JSdoc.contractAddress,
            tokenName: JSdoc.tokenName,
            tokenSymbol: JSdoc.tokenSymbol,
            creator: JSdoc.creator,
            userID: JSdoc.userID,
            category: JSdoc.category,
            description: JSdoc.description,
            socialURI: JSdoc.socialURI,
            socialMedia: { Youtube: {
                        channelName: Youtube.channelName,
                        url: Youtube.url,
                        categories: Youtube.categories,
                        description: Youtube.description,
                        createdOn: Youtube.createdOn, 
                        thumbnail: Youtube.thumbnail.url,
                        subscribers: Youtube.subscribers,
                        media: Youtube.mediaCount,
                        views: Youtube.views }},
            socialURI: JSdoc.socialURI,
            launchPrice: JSdoc.socialURI,
            currentPrice: JSdoc.currentPrice,
            initalCreatorShare: JSdoc.initalCreatorShare
            
          }
     );
	
	 console.log(
	
		  `${results.insertedCount} documents were inserted with the _id: ${results.insertedId}`,
		
		);
		
	  return results.insertedId;
	  }
	  catch(error)
	  {
	  console.log(error);
      return error;
	  } 
	}




    async function addCreator(JSdoc) {

        try 
        {
        
         await client.connect();
         
         const database = client.db("mecasso");
        
         const coll = database.collection("creator");

         var Youtube = JSdoc.socialMedia.Youtube;
           
         const results = await coll.insertOne(
          {
              _id: JSdoc.userID,
              name: JSdoc.creator,
              DAOs: [{ tokenName: JSdoc.tokenName,
                      tokenSymbol: JSdoc.tokenSymbol,
                      contractAddress: JSdoc.contractAddress}],
              profilePhoto: Youtube.thumbnail.url,
              category: JSdoc.category,
              socialURI: JSdoc.socialURI,
              socialMedia: { Youtube: {
                          url: Youtube.url,
                          channelName: Youtube.channelName,
                          categories: Youtube.categories,
                          thumbnail: Youtube.thumbnail.url,
                          description: Youtube.description,
                          createdOn: Youtube.createdOn, 
                          subscribers: Youtube.subscribers,
                          media: Youtube.mediaCount,
                          views: Youtube.views }}
            }
       );     

         
       console.log(
	
        `${results.insertedCount} documents were inserted with the _id: ${results.insertedId}`,
      
      );
      
      return results.insertedId;
          }

          
          catch(error)
          {
          console.log(error);
          return error;
          } 

        }

        async function viewCreators() {
          //Put a cap on creators fetched on large data volume
          try 
          {
          
          await client.connect();
          
          const database = client.db("mecasso");
          
          const coll = database.collection("creator");
          
          
          const Cursor = await coll.find();
           
          const allValues = await Cursor.toArray();
          
          //console.log("Values",allValues)    
          //await Cursor.forEach(doc => console.log(doc))
              
          return allValues;
          
          
          }catch(error)
            {
            console.log(error);
            } 
          }
         
        async function addPost(JSdoc) {

            try 
            {
            
             await client.connect();
             
             const database = client.db("mecasso");
            
             const coll = database.collection("posts");
             
             const doc = JSdoc;

             
             const results = await coll.insertOne(
                {
                    
                    tokenName: JSdoc.tokenName,
                    tokenSymbol: JSdoc.tokenSymbol,
                    profilePhoto: JSdoc.profilePhoto,
                    DAOcontract: JSdoc.DAOcontract,
                    userID: JSdoc.userID,
                    heading: JSdoc.heading,
                    description: JSdoc.description,
                    image: JSdoc.image,
                    medialink: JSdoc.medialink,	
                    publisheddatetime: JSdoc.publisheddatetime,
                    charm: 0
                    
                  }
             );
            
             console.log(
            
                  `${results.insertedCount} documents were inserted with the _id: ${results.insertedId}`,
                
                );
                
              return results.insertedId;
              }
              catch(error)
              {
              console.log(error);
              return error;
              } 
            }      


            async function viewallPosts() {
              //Put a cap on posts fetched on large data volume

              try 
              {
              
              await client.connect();
              
              const database = client.db("mecasso");
              
              const coll = database.collection("posts");
              
              
              const Cursor = await coll.find({});
               
              const allValues = await Cursor.toArray();
              
              //console.log("Values",allValues)    
              //await Cursor.forEach(doc => console.log(doc))
                  
              return allValues;
              
              
              }catch(error)
                {
                console.log(error);
                } 
              }


            async function viewallCreatorPosts(tokenName,DAOcontract) {
              //Put a cap on posts fetched on large data volume

              try 
              {
              
              await client.connect();
              
              const database = client.db("mecasso");
              
              const coll = database.collection("posts");
              
              
              const Cursor = await coll.find(
                  {tokenName: tokenName,
                    DAOcontract: DAOcontract}
                  );
               
              const allValues = await Cursor.toArray();
              
              //console.log("Values",allValues)    
              //await Cursor.forEach(doc => console.log(doc))
                  
              return allValues;
              
              
              }catch(error)
                {
                console.log(error);
                } 
              }

            async function viewallDAOs(userID) {

                try 
                {
                
                await client.connect();
                
                const database = client.db("mecasso");
                
                const coll = database.collection("creator");
                
                console.log("userID",userID);
                //const Cursor = await coll.find({_id: userID},{DAOs:1, _id:0});
                const Cursor = await coll.find({_id: userID}).project({DAOs:1, profilePhoto:1, _id:0});  
                 
                const allValues = await Cursor.toArray();
                
                console.log("All DAOs Values",allValues)    
                //await Cursor.forEach(doc => console.log(doc))
                    
                return allValues[0];
                
                
                }catch(error)
                  {
                  console.log(error);
                  } 
                }

                async function viewPrice(contractAddress) {
                  //Put a cap on posts fetched on large data volume
    
                  try 
                  {
                  
                  await client.connect();
                  
                  const database = client.db("mecasso");
                  
                  const coll = database.collection("dao");
                  
                  
                  const Cursor = await coll.find(
                      {_id: contractAddress}).project({currentPrice:1, _id:0});

                      

                  const allValues = await Cursor.toArray();
                  
                  //console.log("Values",allValues)    
                  //await Cursor.forEach(doc => console.log(doc))
                      
                  return allValues;
                  
                  
                  }catch(error)
                    {
                    console.log(error);
                    } 
                  }

                  async function viewallPrices() {
                    //Put a cap on posts fetched on large data volume
      
                    try 
                    {
                    
                    await client.connect();
                    
                    const database = client.db("mecasso");
                    
                    const coll = database.collection("dao");
                    
                    
                    const Cursor = await coll.find({}).project({currentPrice:1, tokenName:1, tokenSymbol:1});
                     
                    const allValues = await Cursor.toArray();
                    
                    //console.log("Values",allValues)    
                    //await Cursor.forEach(doc => console.log(doc))
                        
                    return allValues;
                    
                    
                    }catch(error)
                      {
                      console.log(error);
                      } 
                    }


                async function viewUser(userID) {

                  try 
                  {
                  
                  await client.connect();
                  
                  const database = client.db("mecasso");
                  
                  const coll = database.collection("users");
                  
                  
                  const Cursor = await coll.find({_id:userID}).project({ DAOs:1, _id:0});

                  

                   
                  const allValues = await Cursor.toArray();
                  
                  console.log("User Values",allValues)    
                  await Cursor.forEach(doc => console.log(doc))
                      
                  return allValues;
                  
                  
                  }catch(error)
                    {
                    console.log(error);
                    } 
                  }


                  async function addTransaction(JSdoc) {

                    try 
                    {
                    
                     await client.connect();
                     
                     const database = client.db("mecasso");
                    
                     const coll = database.collection("transactions");
                     
                     const doc = JSdoc;

                     
                     const results = await coll.insertOne(
                        {
                            
                            tokenName: JSdoc.tokenName,
                            baseAsset: JSdoc.baseAsset,
                            buyerID: JSdoc.userID,
                            sellerID: JSdoc.creator,
                            DAOaddress: JSdoc.contractAddress,
                            price: JSdoc.price,
                            amount: JSdoc.amount,
                            transactionDate: JSdoc.transactionDate
                          }
                     );
                    
                     console.log(
                    
                          `${results.insertedCount} documents were inserted with the _id: ${results.insertedId}`,
                        
                        );
                        
                      return results.insertedId;
                      }
                      catch(error)
                      {
                      console.log(error);
                      return error;
                      } 
                    }
                    
                    async function addUser(userID,tokenName,contractAddress) {

                    try 
                    {
                    
                     await client.connect();
                     
                     const database = client.db("mecasso");
                    
                     const coll = database.collection("users");
                     
                    
                     const results =    await coll.updateOne(
                      {_id: userID},
                      {
                      $push: { DAOs: {tokenName,contractAddress} }
                      }, 
                      { upsert: true }
                      );
                   
                  //console.log(results);
          
                   console.log(
                  
                        `${results.result.n} documents were inserted with the _id: ${userID}`,
                      
                      );
                      
                    return userID;
                    }
                      catch(error)
                      {
                      console.log(error);
                      return error;
                      } 
                    }
                
                    async function viewUserTransactions(userID) {

                      try 
                      {
                      
                      await client.connect();
                      
                      const database = client.db("mecasso");

                      
                      const coll = database.collection("transactions");
                      
                      
                      const Cursor = await coll.find(
                          {buyerID: userID}
                          ).limit(10);
                       
                      const allValues = await Cursor.toArray();
                      
                      //console.log("Values",allValues)    
                      //await Cursor.forEach(doc => console.log(doc))
                          
                      return allValues;
                      
                      
                      }catch(error)
                        {
                        console.log(error);
                        } 
                      }

                      async function viewCreatorTransactions(userID) {

                        try 
                        {
                        
                        await client.connect();
                        
                        const database = client.db("mecasso");
                        
                        const coll = database.collection("transactions");
                        
                        
                        const Cursor = await coll.find(
                            {sellerID: userID}
                            );
                         
                        const allValues = await Cursor.toArray();
                        
                        //console.log("Values",allValues)    
                        //await Cursor.forEach(doc => console.log(doc))
                            
                        return allValues;
                        
                        
                        }catch(error)
                          {
                          console.log(error);
                          } 
                        }
    
                        //Version that works for Manu's code

                        async function returnSalesaggregates() {

                          try
                          {
                      
                              await client.connect();
                      
                              const database = client.db("mecasso");
                      
                              const coll = database.collection("transactions");
                      
                              const Cursor = await coll.aggregate(
                                  [
                                      {
                                          $group:
                                              {
                                                  _id: { tokenName: "$tokenName", baseAsset: "$baseAsset" },
                                                  sales: { $sum: { $multiply: [ "$price", "$amount" ] } },
                                                  count: { $sum: 1 }
                                              }
                                      },
                      
                                      {
                                          $lookup:
                                              {
                                                  from: "dao",
                                                  localField: "_id.tokenName",
                                                  foreignField: "tokenName",
                                                  as: "DAOdetails"
                                              }
                                      },
                                      {$match: {details: {$ne: []}}}
                                  ]
                              ).project({"_id": 1,
                                  "sales": 1,
                                  "count": 1,
                                  "DAOdetails.tokenName": 1,
                                  "DAOdetails.tokenSymbol": 1});
                      
                              const sales = await Cursor.toArray();
                      
                              console.log("Values",sales)
                              //await Cursor.forEach(doc => console.log(doc))
                      
                              return sales;
                      
                      
                          }catch(error)
                          {
                              console.log(error);
                          }
                      }
                        
                        //Better version - Can be adapted later
                        /*
                        async function returnSalesaggregates() {

                          try 
                          {
                          
                          await client.connect();
                          
                          const database = client.db("mecasso");
                          
                          const coll = database.collection("transactions");

                          const Cursor = await coll.aggregate(
                            [
                              {
                                $group:
                                  {
                                    _id: { tokenName: "$tokenName"},
                                    sales: { $sum: { $multiply: [ "$price", "$amount" ] } },
                                    count: { $sum: 1 }
                                  }
                              },

                              {
                                $lookup:
                                   {
                                      from: "dao",
                                      localField: "_id.tokenName",
                                      foreignField: "tokenName",
                                      as: "DAOdetails"
                                  }
                             },
                             {$match: {details: {$ne: []}}}
                            ]
                         );

                         const sales = await Cursor.toArray();      

                        
                          console.log("Values",sales)    
                          //await Cursor.forEach(doc => console.log(doc))
                              
                          return sales;
                          
                          
                          }catch(error)
                            {
                            console.log(error);
                            } 
                          }
                          */


                          async function returnCharmBalance(JSdoc) {

                            try
                            {
                        
                                await client.connect();
                        
                                const database = client.db("mecasso");
                        
                                const coll = database.collection("charmtransactions");

                                console.log(JSdoc,"JSdoc");
                                
                                /*
                                const Cursor = await coll.find(
                                  {tokenName: JSdoc.tokenName,              
                                    DAOaddress: JSdoc.DAOaddress}
                                  ).project( { "charmBalance" : { $sum: "$charm"} , _id : 0 });

                                  _id: { tokenName: "$tokenName", baseAsset: "$baseAsset" },
                                  */

                                  const Cursor = await coll.aggregate(
                                    [
                                      {
                                        $group:
                                          {
                                            _id: { tokenName: "$tokenName", DAOaddress: "$DAOaddress" },
                                            charmBalance: { $sum: "$charm" }
                                          }
                                      }
                                    ]).project({"_id": 1,
                                    "charmBalance": 1});

                                    const charms = await Cursor.toArray();
                      
                              console.log("Values",charms)
                      
                              return charms;
  
                            }catch(error)
                            {
                                console.log(error);
                            }
                        }
//=======================================
// Methods added by Manu

async function getAllDAOs() {
  try
  {
      await client.connect();
      const database = client.db("mecasso");
      const coll = database.collection("dao");
      const Cursor = await coll.find();
      const allValues = await Cursor.toArray();
      return allValues;
  }catch(error)
  {
      console.log(error);
  }
}

async function userExists(userID) {
  try
  {
      await client.connect();
      const database = client.db("mecasso");
      const coll = database.collection("users");
      const Cursor = await coll.find({"_id":userID}).count() > 0;
      return Cursor;
  }catch(error)
  {
      console.log(error);
  }
}

async function queryDAO(contractAddress) {
  try
  {
      await client.connect();
      const database = client.db("mecasso");
      const coll = database.collection("dao");
      console.log("CONTRACT ADDR: " + contractAddress)
      console.log("TYPE: " + typeof(contractAddress))
      const Cursor = await coll.find({"_id":contractAddress}).toArray();
      //const allValues = await Cursor.toArray();
      return Cursor;
  }catch(error)
  {
      console.log(error);
  }
}                            