const Batizados = require("../models/batismos");


module.exports = 
{
    getAllBatizados() {
        const allBatizados = Batizados.find({}).select({date:1, title:1, ref:1, _id:1});
        return allBatizados; 
    },

    lookUp (id) {
        console.log()
        return Batizados
            .findOne({_id: id})
            .exec()
    },
    
    elementoBatizado(){
        const allBatizados = Batizados.aggregate([{$project: {
            _id: 0,
            batizado: { $arrayElemAt: [{ $split: ["$title", ": "] }, 1] }
            }}, {$project: {
            batizado: { $arrayElemAt: [{ $split: ["$batizado", ". "] }, 0] },
            }}, {$project: {
                criança: "$batizado"
                }}, {$sort: {
                criança: 1
            }}]
    );
        return allBatizados; 
    },

    paisBatizado(){
            const allBatizados = Batizados.find({}).select({_id:1, pai:1, mae:1});
            return allBatizados; 
    },
    
    batizadosByAno(ano){
        const allBatizados = Batizados.find({ date: { $regex: '.*' + ano + '.*' } });
        return allBatizados; 
    },

    batizadosGrouped(){
        const allBatizados = Batizados.aggregate(
            [{$group: {
                _id: { $substr: ["$date", 0, 4] },
                conteudo: {
                  $addToSet:{ $substr: ["$date", 0, 4] }
                },
              
                  total:{$sum:1}
              }}, {$project: {
                _id:0,
                Ano:"$_id",
                total:1,
              
              }}, {$sort: {
                Ano: 1
              }}]
        );
        return allBatizados; 
    },


}


