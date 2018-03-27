/*

1. JSON function is used to convert the infromation in string in java script
2. Browser local storage store the string value only 
3. JSON.parse convets the string to its original data type
4. JSON.parse converts anything to  string 
5. storage.getItem(keyName) return a DOMString containing the value of the key. If the key does not exist, null is returned.keyname      containing the name of the key you want to retrieve the value of.
6. storage.setItem(keyName, keyValue)  Here  A DOMString containing the name of the key you want to create/update. keyvalue is a        DOMString containing the value you want to give the key you are creating/updating. Its return value is null .....
*/

        
// selecting the form id that is to be submit        
  document.getElementById("form").addEventListener('submit',savebookmark);
        
      //Making function that will save the web site name and website url         
        function savebookmark(e){
         // selection of id of web site name and website url    
          var siteName = document.getElementById('sitename').value;
          var siteUrl = document.getElementById('siteurl').value;
    
    
      //  cheacking the both filleds are filled and URL is of valid type 
         if(!formvalidation(siteName,siteUrl)){
             return false;
           }
       
      // Creating an object of bookmark that has member sitename and site url
            var bookmark = {
    	        name:siteName,
    	        url:siteUrl
            }
    
    // Storing the site name and aite url in local storage
            //If codition if if there is nothing stored already
    if(localStorage.getItem('information') === null){
                 // craeting an array 
                   var bm = [];
                 //adding to the array 
                   bm.push(bookmark);
                 //  store into localstorage
                   localStorage.setItem('information',JSON.stringify(bm));
 
          }
  
         //ELSE condition if there is alredy some informations are  stored
     else{
         
        // get the saved information from local storage into the array bm[] which already declared
          var bm = JSON.parse(localStorage.getItem('information'));
        
         // Store the new website information inthe array
          bm.push(bookmark);
         
         //Store the array again in the local storage
          localStorage.setItem('information',JSON.stringify(bm));    
       }
    
        //Reset the form again after saving the information  
           document.getElementById("form").reset();
	
        //After submitting the new website information aaging display the information by calling the fetch function    
         fetch();       
  
//This will prevent the again submitting the form  with the previous information after refreshing            
    e.preventDefault();
}
    
        
        //Displaying the bookmarks by using fetching function
       
    function fetch(){
        //getting bookmarked from local storage
        var x = JSON.parse(localStorage.getItem('information'));
        var y = document.getElementById('displayresult');
    
        
        // Build output by using the mthod inerhtml property of the displayresult in a loop
        displayresult.innerHTML = '';
         for(var i=0;i<x.length;i++){
            var name = x[i].name;
            var url = x[i].url;
            y.innerHTML += '<div class="well">'+
                '<h3>' + name + '<br><br>' +
                '<a href="'+url+'" target="_blank" class="btn btn-default">Visit</a>'+
                  '<a style="margin-left:10px;" onclick="deletebookmark(\''+url+'\')" href="#" class="btn btn-danger">Delete</a>'+              
              '</h3>'+  
              '</div>';
            
         }
    }
         
    
      // Function to delete the bookmarked web site information by giving the parameter urlof the web site 
      function deletebookmark(url){
          
          // Storing the already saved information in an array x 
            var x = JSON.parse(localStorage.getItem('information'));
            for(var i=0;i< x.length;i++){
            if(x[i].url == url){
            
                //The splice() method adds/removes items to/from an array, and returns the removed item(s).
                 // first parameter fs for which element
                 // second parameter is for how many elements
                 //3rd parameter is  Optional. The new item(s) to be added to the array
                x.splice(i,1);
            
            }   
            }
            localStorage.setItem('information',JSON.stringify(x));
            fetch();
        }

        
//Creating function for form validation  
        function formvalidation(siteName,siteUrl){
              
             if(!siteName || !siteUrl){
                alert('Please fill the appropriate input');
                return false;
            }
var regex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
            var c = new RegExp(regex);
             if(!siteUrl.match(c)){
              alert("Enter the valid URL");  
              return false;
                }   
               return true;   
      }
        
        