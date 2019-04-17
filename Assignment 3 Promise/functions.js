function getCustomer(id) {
    return new Promise((resolve,reject)=> {
      setTimeout(() => {
        resolve({ 
          id: 1, 
          name: 'Mosh Hamedani', 
          isGold: true, 
          email: 'email' 
        });
      }, 4000);  
    
    });
    }
  
  function getTopMovies() {
    return new Promise((res,rej)=>
    {
      setTimeout(() => {
        res(['movie1', 'movie2']);
      }, 4000);
    });
    
  }
  
  function sendEmail(email, movies) {
    return new Promise((res,rej)=>
    {
      setTimeout(() => {
        res(`Email sent to ${email} with ${movies}...`);
      }, 4000);
    });
    
  }

  module.exports.getCustomer=getCustomer;
  module.exports.getTopMovies=getTopMovies;
  module.exports.sendEmail=sendEmail;