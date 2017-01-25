class Client{

	findAll() {
		fetch('localhost:3000/notes')
		.then(function (response) {
			if(response.status == 204) {
				return 'No notes';
			}
			return response.json();
		});
	}

	findOneById(id) {
		
	}

	delete(id) {
		
	}

	create(title, content) {
		
	}
}

export default Client;