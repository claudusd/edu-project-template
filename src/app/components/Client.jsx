

export default class Client{
	findAll(callback){

		fetch('/notes')
		.then(function(response){
			console.log('Response : '+ response)
			return response.json();

		}).then(callback)
		
	}

	find(id, callback){


		console.log("ID : "+id);
		fetch('/notes/'+id)
		.then(function(response){
			console.log('Response : '+ response)
			return response.json();

		}).then(callback)

	}

	create(object){

		fetch('/notes', {
			method: 'POST',
			headers: { 
				'Accept': 'application/json',
				'Content-Type': 'application/json', 
			},
			body: JSON.stringify({ 
				nom: object.nom,
				contenu: object.contenu, 
			}) 
		})
	}

	delete(id){

	}
}

