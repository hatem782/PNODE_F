const mongoose = require("mongoose");
const studentModule = require("./student.module");
const technologieModule = require("./technologie.module");
const Schema = mongoose.Schema;


const ProjectModel = new Schema(
    {
        students: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Student",
            }
        ],

        encadrants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Teacher",
            }
        ],
        technologies: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Technologie",
            }
        ],

        societe: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Socite",
        },
        type: {
            type: String,
            enum: ["PFA", "PFE", "Stage"],
           // default: "PFA",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        nbr_students_max: {
            type: Number,
          //  default: 2,
        },

        startDate: {
            type: Date,
        },


        endDate: {
            type: Date,
        },
        isValidatedByReponsable: {
            type: Boolean,
        },
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("Project", ProjectModel);
