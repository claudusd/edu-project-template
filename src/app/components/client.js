class Client{
	
	//Find all notes on server
	findAll(callback){
		fetch("/notes")
		.then(function(response){
			if(response.ok){
				return response.json();
			}
			else{
				return [];
			}
		}).then(callback);
	
	}

	//Find one note by id
	find(id, callback){
		fetch("/notes/"+id)
		.then(function(response){
			if(response.ok){
				return response.json();
			}
			else{
				return [];
			}
		}).then(callback);
	}

	//Create a new note with given json object
	create(jsonObject, callback){
		fetch("/notes/",{
			method: 'POST', 
			headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', }, 
			body: JSON.stringify(jsonObject)
			}
		).then(function(response){
			if(response.ok){
				return response.json();
			}
			else{
				return [];
			}
		}).then(callback);
	}

	//Delete a note using it's id
	delete(id, callback){
		fetch("/notes/" + id,{
			method: 'DELETE', 
			headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', }
			}
		).then(function(response){
			return response;
		}).then(callback);
	}
}
const client = new Client()
export default client;
