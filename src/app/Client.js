class Client {

    findAll(getMarks) {
        fetch('/notes')
            .then(function (response) {
                if (response.status == 204) {
                    return 'Pas de notes';
                }
                return response.json();
            })
            .then(function(data){
                getMarks(data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    findOneById(id, getMark) {
        fetch('/notes/' + id)
            .then(function (response) {
                if (response.status == 404) {
                    getMark("Cette note n'existe pas");
                }
                return response.json();
            })
            .then(function(data){
                getMark(data);
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