class Client {
	findAll(callback) { 
		 fetch('/notes')
			.then(function (response) { return response.json()})
			.then(callback)
			.catch((error) => {
				console.error(error);
			});
	};
	find(id, callback) {
		fetch('/notes/'+id)
			.then(function (response) { return response.json()})
			.then(callback)
			.catch((error) => {
				console.error(error);
			});

	};
	create(note, callback) {
		fetch('/notes', {
		  method: 'POST',
		  headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify(note)
		})
			.then(function (response) { return response.json()})
			.then(callback)
			.catch((error) => {
				console.error(error);
			});
	};
	remove(id, callback) {
		fetch('/notes/' +id, {
		  method: 'DELETE'/*,
		  headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify(note)*/
		})
			.then(function (response) { return response })
			.then(callback)
			.catch((error) => {
				console.error(error);
			});
	};
}


export default Client;
