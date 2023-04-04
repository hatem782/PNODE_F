const swaggerAutogen = require('swagger-autogen')()
const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/AllRoutes.routes.js']
const models =require('../models/project.module.js')

const doc = {
    info: {
      title: 'ISAMM Backend',
      description: 'This project is a node js backend dedicated to ..',
    },
    host: 'localhost:8085/api',
    schemes: ['http'],
    'definitions': {
        Project: {
            type: 'object',
            properties: {
                title: {
                    type: 'String',
                    description: 'Project Title ...'
                }
            }
        }
    }

  };

swaggerAutogen(outputFile, endpointsFiles,doc).then(() => {
    require('../server.js')
})