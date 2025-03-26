import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggingInterceptor } from './interceptors/loggins-interceptors';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Registra el interceptor globalmente
  app.useGlobalInterceptors(new LoggingInterceptor()); 

  // Obtener la instancia de ConfigService
  const configService = app.get(ConfigService);

  console.log("MOSTRANDO PORT GRAPHQL",configService.get<number>('port'));
  console.log("MOSTRANDO CORS GRAPHQL",configService.get<string>('cors'));
  console.log("MOSTRANDO API RICK AND MORTY GRAPHQL",configService.get<string>('api'));

  
  // Configuración de CORS
  app.enableCors({
    origin: configService.get<string>('cors'), // Permite todas las solicitudes en desarrollo
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    /* credentials: true, // Permitir cookies y autenticación */ // NO LO ASIGNO
  });

  // Configuración de Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('GRAPHQL API RICK AND MORTY')
    .setDescription('Documentación de la API de GRAPHQL MICROSERVICIO')
    .setVersion('1.0')
   /*  .addBearerAuth() */ // Agrega soporte para autenticación con Bearer Token // esta vez no lo usare
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/nestjs', app, document);

  // Obtener el puerto desde la configuración o usar el predeterminado (3000)
  const port = configService.get<number>('port');

  await app.listen(port);

  console.clear(); // Limpia la consola para destacar el mensaje de inicio
  console.log(`██████████████████████████████████████████████████████████████████`);
  console.log(`██**************************************************************██`);
  console.log(`██**************************************************************██`);
  console.log(`   GRAPHQL application is running at: http://localhost:${port}   `);
  console.log(`   Swagger Docs available at: http://localhost:${port}/api/nestjs   `);
  console.log(`   Apollo Docs available at: http://localhost:${port}/Graphql   `);
  console.log(`██**************************************************************██`);
  console.log(`██**************************************************************██`);
  console.log(`██████████████████████████████████████████████████████████████████`);
}

bootstrap();