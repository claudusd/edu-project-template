class Client{
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

	create(object){

	}

	remove(id){

	}
}
const client = new Client()
export default client;
