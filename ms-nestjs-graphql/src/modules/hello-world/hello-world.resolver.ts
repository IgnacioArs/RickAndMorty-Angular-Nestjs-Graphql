import { Query, Resolver } from '@nestjs/graphql';
import { HelloWorldService } from './hello-world.service';


@Resolver()
export class HelloWorldResolver {
    constructor(private readonly helloWorldService: HelloWorldService) {}

    @Query(() => String, { description: 'Method initial microservice', name: 'hello' })
    helloWorld(): string {
        return 'HelloWorld';
    }

    @Query(() => Number, { description: 'RETORNA PUERTO DEL MICROSERVICIO', name: 'PortMicroservice' })
    portMicroservice(): number {
        return this.helloWorldService.getPort();
    }

    @Query(() => String, { description: 'RETORNA CORS SITIO DE SOLICITUD HABILITADO', name: 'CorsMicroservice' })
    corsMicroservice(): string {
        return this.helloWorldService.getCors(); 
    }

    @Query(() => String, { description: 'RETORNA API URL DONDE OBTENDREMOS LOS DATOS', name: 'ApiExternal' })
    apiExternal(): string {
        return this.helloWorldService.getApiExternal(); 
    }



}
