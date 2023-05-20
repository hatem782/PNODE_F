//this controller is dedicated for recrutements , entreprises and everything related to professional life
const Joi = require("joi");
const SocieteModel = require("../models/Societe.model");
var mongoose = require('mongoose');
const PositionModel = require("../models/Position.model");
const userModule = require("../models/user.module");


const CreateSociete = async (req, res) => {
    // #swagger.tags = ['employement apis']
    // #swagger.description = 'Endpoint for creation of Societe '
    try {
        const {
            title,
            pays
        } = req.body;
        const exist = await SocieteModel.findOne({ title });
        if (exist)
            return res.status(409).json({
                Message: "Societe already exist",
                Success: false,
            });
        const newSociete = new SocieteModel({
            title,
            pays
        });
        const createdSociete = await newSociete.save();
        return res.status(200).json({
            Message: "Societe created suucessfully",
            Success: true,
            data: createdSociete,
        });



    }
    catch (error) {
        console.log("##########:", error);
        res.status(500).send({ Message: "Server Error", Error: error.message });
    }

}

const getAllSociete = async (req, res) => {
// #swagger.tags = ['employement apis']
    // #swagger.description = 'Endpoint return list of entreprises '

    try
    {
        const listSociete = await SocieteModel.find({
         });
          return res
            .status(200)
            .json({ Message: "Projects found successfully ", data: listSociete });
    }
    catch(error){
        console.log("##########:", error);
        res.status(500).send({ Message: "Server Error", Error: error.message });
    }
}

const startPositionInSociete = async (req,res) => {
    // #swagger.tags = ['employement apis']
    // #swagger.description = 'affect an alumini to a new position in an entreprise ( societe) '
    try {
        const {
            designation,
            societe,
            alumini,
            startDate,
            endDate
        } = req.body;
    /*     const exist = await PositionModel.findOne({ title });
        if (exist)
            return res.status(409).json({
                Message: "Societe already exist",
                Success: false,
            }); */
        const newSociete = new PositionModel({
            designation,
            societe,
            alumini,
            startDate,
            endDate
        });
        const createdSociete = await newSociete.save();
        return res.status(200).json({
            Message: "Position  affected suucessfully",
            Success: true,
            data: createdSociete,
        });



    }
    catch (error) {
        console.log("##########:", error);
        res.status(500).send({ Message: "Server Error", Error: error.message });
    }

}


const getAllPositionsByAllumini = async (req,res) => {
    // #swagger.tags = ['employement apis']
    // #swagger.description = 'Endpoint return list of positions and societe by Alumini  '
    const {idAlumini}=req.body;
    try
    {
        var r=[];
        const list=await PositionModel.find({alumini:idAlumini})
        .populate({
            path: 'societe',
            options: { limit: 2 }
          });
          return res.status(200).json({
            Message: "list not empty",
            Success: true,
            data: list,
        });
    }
    catch(error)
    {

    }
}


const getAluminiStats = async (req, res) => {
    const { critere } = req.params;
  
    try {
      let groupByField;
      let projectFields;
  
      if (critere === 'promotion') {
        groupByField = '$Employee.promotion';
        projectFields = {
          promotion: '$_id',
        };
      } else if (critere === 'societe') {
        groupByField = '$Soceiete.title';
        projectFields = {
          societe: '$_id',
        };
      } else if (critere === 'pays') {
        groupByField = '$Soceiete.pays';
        projectFields = {
          pays: '$_id',
        };
      }
  
      const result = await PositionModel.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'alumini',
            foreignField: '_id',
            as: 'Employee',
          },
        },
        {
          $lookup: {
            from: 'societes',
            localField: 'societe',
            foreignField: '_id',
            as: 'Soceiete',
          },
        },
        { $unwind: '$Employee' },
        { $unwind: '$Soceiete' },
        {
          $group: {
            _id: {
              groupByField,
              promotion: '$Employee.promotion',
            },
            count: { $sum: 1 },
          },
        },
        {
          $group: {
            _id: '$_id.groupByField',
            promotions: {
              $push: {
                promotion: '$_id.promotion',
                count: '$count',
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            ...projectFields,
            promotions: 1,
          },
        },
      ]);
  
      return res.status(200).json({
        Message: 'List not empty',
        Success: true,
        data: result,
      });
    } catch (error) {
      console.log(JSON.stringify(error));
      return res.status(500).json({
        Message: 'An error occurred',
        Success: false,
      });
    }
  };
  
  

const getStatChommage=async(req,res)=>{
//average chommage moyenne depending on selection critéria ( diplome / promotion / technologie )
 // #swagger.tags = ['employement apis']
    // #swagger.description = 'Moyenne des anneés de chommage des allumini calculé en fonction du cirtére donneé'
        // #swagger.parameters['critere'] = { description: 'critére du groupement : [diplome  / promotion / technologie]' }

        const { critere } = req.params;
        console.log(critere)
try
{
 

      //can be grouped by diplome / promotion //skills
const result=await userModule.aggregate([
    
   {  $lookup: {
        from: 'positions',
        localField: '_id',
        foreignField: 'alumini',
        as: 'positions',
        "pipeline" : [{ "$sort": {"startDate":1}}, { "$limit" : 1 }] ,

    },},
    {$unwind: '$positions'},
  
    
    {
        $group:
           {
               _id: `$${critere}`,
               averageYearNumer:
                  {
                     $avg:
                        {
                           $dateDiff:
                              {
                                  //change start date to date obtion diplome
                                  startDate: "$diplomeDate",
                                  endDate: "$positions.startDate",
                                  unit: "year"
                              }
                         }
                  }
           }
     },
])
    
     return res.status(200).json({
       Message: "list not empty",
       Success: true,
       data: result,
   });
   
}
catch(error)
{
console.log(JSON.stringify(error))
}
}




module.exports = {
    CreateSociete,
    getAllSociete,
    startPositionInSociete,
    getAllPositionsByAllumini,
    getStatChommage,
    getAluminiStats
};