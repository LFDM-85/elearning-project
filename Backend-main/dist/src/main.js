"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const helmet_1 = require("helmet");
const dotenv = require("dotenv");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
dotenv.config();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const options = {
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        preflightContinue: false,
        optionsSuccessStatus: 200,
        credentials: true,
    };
    app.enableCors(options);
    app.use((0, helmet_1.default)());
    app.use((req, res, next) => {
        common_1.Logger.log(`Incoming Request: ${req.method} ${req.url}`);
        next();
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Documentation with Swagger - Elearning Project')
        .setDescription('Swagger (aka OpenApi) is a well-known library in the backend universe, being available for several languages and frameworks. It generates an internal website on your backend that describes, in great detail, each endpoint and entity structure present in your application.')
        .setVersion('1.0')
        .addTag('Users')
        .addTag('Auth')
        .addTag('Courses')
        .addTag('Lectures')
        .addTag('Assessments')
        .addTag('Works')
        .addTag('Attendance')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(5000);
}
bootstrap();
//# sourceMappingURL=main.js.map