// swagger.js
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Charging Pile API',
      version: '1.0.0',
      description: '充電站管理 API 文件',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'], // 會掃描這些檔案中的 Swagger 註解
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
