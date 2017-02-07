export default class Client{

	findAll(callback){
    	fetch('/notes') 
  			.then(function(response) {
    		 return response.json();
  			}).then(function(data){
  				console.log(data);
  				callback(data);
  			});

	}

	find(callback,id){
		fetch('/notes/'+id)
			.then(function(response) {
    		 return response.json();
  			}).then(function(data){
  				console.log(data);
  				callback(data);
  			});
	}

	create(titre, contenu, callback){
		console.log(titre);
		fetch("/notes",
{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({title: titre, contenu: contenu})
})
.then(callback)
	}

	remove(id, callback){
		console.log(id);
		fetch('/notes/'+id,{
			method: 'DELETE',
			headers:{
				'Accept' : 'application/json',
			},
		})
		.then(callback)
	}
};