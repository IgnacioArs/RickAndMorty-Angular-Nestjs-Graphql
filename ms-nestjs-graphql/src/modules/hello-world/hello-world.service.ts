import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HelloWorldService {
    constructor(private readonly configService: ConfigService) {}

    getPort(): number {
        const port = this.configService.get<string>('port');
        const parsedPort = parseInt(port, 10);
        return parsedPort;
    }

    getCors(): string {
        const cors = this.configService.get<string>('cors');
        return cors;
    }

    getApiExternal(): string {
        const api = this.configService.get<string>('api');
        return api;
    }
}
