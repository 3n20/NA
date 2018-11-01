var request = require('request');


class UserInfoService {

    constructor(){}

    pesquisarUsuarioPorCodigo(iduser) {
        return new Promise(function(accept, reject){
            var endpoint = process.env.URL_CENTRAL_API + 'xp/userInfoByCode?iduser=' + iduser.trim();
            var options = {
                method: "GET",
                url: endpoint,
                timeout: 30000
            };

            request(options, function(err, response){
                if(err){
                    reject(err);
                }
                accept(response);
            });
        });
    }
}

module.exports = UserInfoService;