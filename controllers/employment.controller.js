//this controller is dedicated for recrutements , entreprises and everything related to professional life
const Joi = require("joi");
const SocieteModel = require("../models/Societe.module");
const studentModule = require("../models/student.module");
var mongoose = require('mongoose');
const PositionModel = require("../models/Position.model");


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
            title
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
            designation
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


module.exports = {
    CreateSociete,
    getAllSociete,
    startPositionInSociete
};