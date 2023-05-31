import { Injectable } from '@nestjs/common';
import { CSV } from './entities/csv.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CsvService {
    constructor(@InjectRepository(CSV) private readonly csvRepository: Repository<CSV>) {
    }

    async processCsv(file: Express.Multer.File) {
        const csvContent = file.buffer.toString("utf-8");
        const rows = csvContent.split("\n");
        let columnCount = rows[0].split(";").length;
        rows.splice(0, 1)

        for (let i = 0; i < rows.length; i++) {
            const row = (rows[i].split(";"));
            const Csv = new CSV();
            Csv.username = row[0];
            Csv.identifier = Number(row[1]);
            Csv.first_name = row[2];
            Csv.last_name = row[3];
            await this.csvRepository.save(Csv);
        }

        return { message: 'CSV file processed successfully.', columnCount };
    }

    findAll():Promise<CSV[]> {
        return this.csvRepository.find();
      }
    
}
