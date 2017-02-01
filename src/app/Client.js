class Client {

    findAll(callback) {
        fetch('/notes')
            .then(function (response) {
                if (response.status == 204) {
                    return 'Pas de notes';
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
                    return "Cette note n'existe pas";
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

    remove(id, callback) {
        fetch('/notes/' + id, {
             headers: {
              'Accept': 'application/json'
            },
            method: "DELETE"
        })
        .then(function(response){
            if(response.status == 204) {
                callback("Note supprimée");
            } else if(response.status == 404){
                callback("Cette note n'existe pas");
            }
            else {
                callback("Problème de suppression");
            }
        });
    }

    create(note, callback) {
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
            callback(data.id);
        });
    }
}

export default Client;