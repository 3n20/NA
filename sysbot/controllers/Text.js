var Log = require('../controllers/Log');
function Text() { }

Text.prototype.replace = function(integracao, text){
    
    var textFinal = text;

    while(text.search("{") != -1)
        {	
            var pos_inicio = text.search("{");
            var pos_fim = text.search("}");
                                
            var value = text.substring(pos_inicio+1, pos_fim);
            
            textFinal = textFinal.replace(value, integracao.result[0][value]);
                                
            text = text.substring(pos_fim+1,text.length); 

        }
    textFinal = textFinal.replace(/{/g, '');
    textFinal = textFinal.replace(/}/g, '');
    
    Log.Add('info', null, 'text.replace', 'Chaves de valores substituidas com o retorno da API com sucesso', null, { texto: text }, false);
    return textFinal;
}

module.exports = new Text();