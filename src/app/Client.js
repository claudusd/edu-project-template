class Client {

    findAll(callback) {
        fetch('/notes')
            .then(function (response) {
                if (response.status == 204) {
                    return 'No notes';
                }
                return response.json();
            })
            .then(function(data){
                callback(data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    findOneById(id, callback) {
        fetch('/notes/' + id)
            .then(function (response) {
                if (response.status == 404) {
                    return 'Not found';
                }
                return response.json();
            })
            .then(function(data){
                callback(data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    remove(id) {
        console.log(id);
        fetch('/notes/' + id, {
             headers: {
              'Accept': 'application/json'
            },
            method: "DELETE"
        })
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
        });
    }

    create(note) {
        console.log(JSON.stringify(note));
        fetch('/notes', {
             headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(note)
        })
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
        });
    }
}

export default Client;