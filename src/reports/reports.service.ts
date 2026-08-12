import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './reports.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { User } from 'src/users/user.entity';
import { GetEstimateDto } from './dto/get-estimate.dto';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private readonly repo: Repository<Report>) { }

    async createEstimate(estimateDto: GetEstimateDto) {
        // esse :make significa que é a coluna do bdd
        return this.repo.createQueryBuilder()
            .select('*')
            .where('make = :make', { make: estimateDto.make })
            .getRawMany();
    }

    async create(reportDto: CreateReportDto, user: User) {
        const report = this.repo.create(reportDto);
        report.user = user;
        return await this.repo.save(report);
    }

    async changeApproval(id: string, approved: boolean) {
        const report = await this.repo.findOne({ where: { id: parseInt(id) } });
        if (!report) {
            throw new NotFoundException('report not found');
        }

        report.approved = approved;
        return await this.repo.save(report);
    }
}
