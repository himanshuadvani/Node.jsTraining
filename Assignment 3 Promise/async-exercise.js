var {getCustomer,getTopMovies,sendEmail}=require('./functions');

/**@author Himanshu Advani
* promise function 
*/

getCustomer(1).then((result)=>
{
  console.log(result);
  if(result.isGold)
  {
   return Promise.resolve(result);
  }
}).then(()=> {

  return getTopMovies();
}).then((result)=>
{
  console.log(result);
  return Promise.resolve();
}).then(()=>
{
  return sendEmail('himanshu.advani@harbingergroup.com','movie1');
}).then((result)=>
{
  console.log(result);
});








/**@author Himanshu Advani
* async/await function 
*/

async function getData()
{
  let customer=await getCustomer(1);

  console.log(customer);

  if(customer.isGold)
  {
    let result1=await getTopMovies();
    console.log(result1);
    
    let result2=await sendEmail('himanshu.advani@harbingergroup.com','movie1');
    console.log(result2);
   
  }
 
}

getData();