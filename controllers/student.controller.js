const UserModel = require("../models/user.module");
const bcrypt = require("bcrypt");
const readXlsxFile = require("read-excel-file/node");
const Mailer = require("../mails/Mail_Sender");

const RegisterAluminie = async (req, res) => {
  try {
    const { phoneNumber, email, password } = req.body;

    const existStudent = await UserModel.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    if (existStudent) {
      return res.status(409).json({
        Message: "Aluminie already exists with that email",
        Success: false,
      });
    }

    // CRYPTING PASSWORD
    const salt = process.env.SALT;
    const cryptedMdp = await bcrypt.hash(password, Number(salt));

    const newStudent = await UserModel.create({
      ...req.body,
      password: cryptedMdp,
      userName: phoneNumber,
    });
    const createdStudent = await newStudent.save();

    return res.status(200).json({
      Message: "Aluminie created suucessfully",
      Success: true,
      data: createdStudent,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const UpdatePromotion = async (req, res) => {
  try {
    const { _id } = req.params;
    // { classe, niveau, numero_classe, promotion }

    const updateStudent = await UserModel.findOneAndUpdate(
      { _id },
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!updateStudent) {
      return res.status(400).json({
        Message: "Failed to update student",
        Success: false,
      });
    }
    return res
      .status(200)
      .json({ Message: "Student updated successfully", data: updateStudent });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const BecomeDeplomated = async (req, res) => {
  try {
    const { _id } = req.params;
    // { promotion, deplome }

    const updateStudent = await UserModel.findOneAndUpdate(
      { _id },
      {
        $set: {
          ...req.body,
          role: "ALUMINIE",
          classe: "",
          niveau: "",
          numero_classe: "",
        },
      },
      { new: true }
    );
    if (!updateStudent) {
      return res.status(400).json({
        Message: "Failed to update student",
        Success: false,
      });
    }
    return res
      .status(200)
      .json({ Message: "Student updated successfully", data: updateStudent });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const CreateStudentsFromExl = async (req, res) => {
  try {
    let rows = await readXlsxFile(req.files.file.data);
    let failed_saved_students = [];
    let succeeded_saved_students = [];
    const salt = Number(process.env.SALT);

    for (let i = 1; i < rows.length; i++) {
      let row = rows[i];
      let student = {
        firstName: row[0],
        lastName: row[1],
        email: row[2],
        phoneNumber: row[3],
        birthDate: row[4],
        sex: row[5],
        classe: row[6],
        niveau: row[7],
        numero_classe: row[8],
        promotion: row[9],
        role: "STUDENT",
      };

      const existUser = await UserModel.findOne({
        $or: [{ email: student.email }, { phoneNumber: student.phoneNumber }],
      });

      if (existUser) {
        failed_saved_students.push({
          email: student.email,
          phoneNumber: student.phoneNumber,
        });
      } else {
        const cryptedMdp = await bcrypt.hash(
          student.phoneNumber.toString(),
          salt
        );

        const newStudent = await UserModel({
          ...student,
          password: cryptedMdp,
          userName: student.phoneNumber,
        });

        const createdStudent = await newStudent.save();
        if (!createdStudent) {
          failed_saved_students.push({
            email: student.email,
            phoneNumber: student.phoneNumber,
          });
        } else {
          succeeded_saved_students.push(createdStudent);

          let subject = "Authentication information";
          let content = `
          <div>
          <h2>Welcome ${student.firstName} ${student.lastName} to our plateforme</h2>
          <p>here you will find the informations about new account</p>
          <p>your login is : <b>${student.phoneNumber}</b> </p>
          <p>your M-D-P is : <b>${student.phoneNumber}</b> </p>
          <p>please make sure to change your password after you access to your account</p>
          </div>`;
          await Mailer.Mail_Sender(student.email, content, subject);
        }
      }
    }

    if (succeeded_saved_students.length === 0 && rows.length > 1) {
      return res.status(400).json({
        Message: "there's a problem while retreaving data from excel file",
        Success: false,
      });
    }

    return res.status(200).json({
      Message: "excel file successfully retreaved",
      data: {
        succeeded_saved_students,
        failed_saved_students,
      },
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

module.exports = {
  RegisterAluminie,
  UpdatePromotion,
  BecomeDeplomated,
  CreateStudentsFromExl,
};
