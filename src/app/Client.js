class Client {

    static findAll() {
        return fetch('/notes')
            .then(function (response) {
                if (response.status == 204) {
                    return 'No notes';
                }
                return response.json();
            })
            .then(function (data) {
                return data;
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    static findOneById(id) {

    }

    static delete(id) {

    }

    static create(title, content) {

    }
}

export default Client;