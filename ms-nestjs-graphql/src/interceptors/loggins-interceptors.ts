import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Comprobar si es una solicitud HTTP o GraphQL
    const request = context.switchToHttp().getRequest();
    
    // Verificar si la solicitud es HTTP
    if (request) {
      const method = request.method;
      const url = request.url;
      const headers = JSON.stringify(request.headers);

      // Log de la solicitud HTTP
      console.log(`Incoming Request...`);
      console.log(`Method: ${method}`);
      console.log(`URL: ${url}`);
      console.log(`Headers: ${headers}`);
    } else {
      // Si no es una solicitud HTTP, estamos tratando con GraphQL
      console.log(`Incoming GraphQL Request...`);
    }

    // Tiempo de inicio para medir la duración de la respuesta
    const startTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        // Calcula el tiempo total y registra la respuesta
        const endTime = Date.now();
        console.log(`Response... ${endTime - startTime}ms`);
      }),
    );
  }
}
