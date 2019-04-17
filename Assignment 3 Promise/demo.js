function fun()
{
    console.log('alpha');
   setTimeout(()=>console.log('beta'),0);
   //console.log('beta'); 
   console.log('gamma');
}

fun();