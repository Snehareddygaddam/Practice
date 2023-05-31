import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CsvModule } from './csv/csv.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'nest-db',
      synchronize: true,
      entities:[__dirname+ '/**/*.entity{.ts,.js}']
    }),
    UserModule,
    CsvModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
