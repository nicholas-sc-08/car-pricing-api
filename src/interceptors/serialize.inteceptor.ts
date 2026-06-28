import { NestInterceptor, ExecutionContext, CallHandler, UseInterceptors } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface ClassConstructor {
    new (...args: []): {}
}

export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) { }
    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        return handler.handle().pipe(
            map((data: any) => {
                return plainToClass(this.dto, data, {
                    // ele depois que transforma em uma classe os dados, exclui todos os dados que nao tem o @Expose() do outro arquivo
                    excludeExtraneousValues: true
                });
            })
        );
    }
}