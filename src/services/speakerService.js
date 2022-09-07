const axios = require('axios');
const { response } = require('express');


function speakerService(){
    function getSpeakerById(id){
        return new Promise((resolve, reject) => {
            axios
            .get('http://localhost:3000/speakers/' + id)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
        });
    }
    return {getSpeakerById};
}

module.exports = speakerService();