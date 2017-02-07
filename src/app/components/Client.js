class Client{
  
  static findAll(callback){
		
	fetch ("/notes").then(function(response){
	
		if(response.status == 204){
			console.log("aucune notes");
			return [];
		}
		else if(response.status == 200){
			return  response.json();
		}
		else{
			return [];
		}		
	}).then(function(data){
		callback(data);
	});
	
		
  
  }
  
  static findById(callback,id){
	  fetch("/notes/" + id).then(function(response){		  	  
		  
		  if(response.status == 404){
			  return [];
		  }
		  return response.json()
		  
	  }).then(function(data){
		  callback(data)
	  });
	  
  }
  
  static suprNote(callback,id){
	  fetch("/notes/supr/" + id).then(function(response){
		  if(response.status == 404){
			  return "Fichier non existant";
		  }
		  else if(response.status == 204){
			return "Supression réussie !";
		  }	
		  return "Problème de supression";
	  }).then(function(data){
		  callback(data)
	  });
  }
  
  static createNote(callback, note){
	  fetch("/notes/create", 
			{ method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(note)
			}
	  ).then(function(response){
		  if(response.status == 201){
			console.log("Création réussie !");
			return response.json();
		  }	
		  return "Création de supression";
	  }).then(callback);

	}
}

export default Client;

