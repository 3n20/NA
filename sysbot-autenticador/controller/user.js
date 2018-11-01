var UserModel = require('../db/models/user');
function UserController() { }

UserController.prototype.UserMemory = function () {
    UserModel.find({}, function (err, user) {
        if (err || !user) {
            Log.Add('error', null, 'UserController.UserMemory', 'Erro ao carregar dados de Usuário.', null, { err: err }, true);
            return res.sendStatus(403);
        }
        _User = user;
        console.log("carregou memoria user")
    });
}

UserController.prototype.UserInsert = function (idproject, idnetwork, idsubnetwork, iduser, context_value, objeto) {
    var _this = this;
    UserModel.find({ idsubnetwork: idsubnetwork, iduser: iduser }, function (err, user) {
        if (user.length > 0) {
            Log.Add('info', null, 'UserControler.UserInsert', 'Usuário encontrado na base', null, { err: err }, true);
            console.log('encontrado na base inicial')    
        }
        else {
            var newUser = UserModel({
                idproject: idproject,
                idnetwork: idnetwork,
                idsubnetwork: idsubnetwork,
                iduser: iduser,
                context: { dt_created: new Date(), value: context_value}, 
                //context: { dt_created: new Date(), value: null},
                particulary: objeto,
                dt_created: new Date(),
                dt_updated: new Date()
            });

            newUser.save(function (err, newUser) {
                if (err){
                   Log.Add('error', null, 'UserController.UserInsert', 'Erro ao inserir Usuário na base.', null, { err: err }, true);
                   console.log('Não fez cadastro' + err)
                  
                _this.UserMemory();
               }else {
                    Log.Add('info', null, 'UserController.UserInsert', 'Usuário inserido na base com sucesso', null, { body: null }, true);
                    console.log('fez cadastro' + newUser)
               }
            });
            

        }

    });
}

UserController.prototype.UserUpdate = function (idsubnetwork, iduser, context_value, objeto) {


    var _this = this;
    UserModel.findOne({ idsubnetwork: idsubnetwork, iduser: iduser }, function (err, user) {
        
        if (err || !user) {
            Log.Add('error', req.originalUrl, 'UserController.UserUpdate', 'Usuario não encontrado.', req.ip, { err: err }, false);
            return res.sendStatus(403);
        }

        if (context_value)
            user.context = { dt_created: new Date(), value: context_value };

        user.particulary = objeto;
        user.dt_updated = new Date();

        user.save(function (err, user) {    
            if (err)
                console.log(err)
                Log.Add('error', req.originalUrl, 'UserController.UserUpdate', 'Erro ao atualizar usuário na base', req.ip, { err: err }, true);

            _this.UserMemory();
        });
    });
    Log.Add('info', req.originalUrl, 'UserController.UserInsert', 'Usuário atualizado na base', req.ip, { err: err }, true);
    console.log("fez update")
}

module.exports = new UserController();