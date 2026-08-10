import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './reports.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private readonly repo: Repository<Report>) { }
}
