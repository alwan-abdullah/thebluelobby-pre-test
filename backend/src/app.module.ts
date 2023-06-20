import { Module } from '@nestjs/common';
import { AppEntity } from "./app.entity";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskManagerModule } from './todo/task_manager/task_manager.module';
import { TasksController } from './todo/tasks.controller';
import { TaskService } from './todo/task.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: "localhost",
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'tbl_pretest',
      synchronize: true,
      entities: [AppEntity],
      logging: true
    }),
    TypeOrmModule.forFeature([AppEntity]),
    TaskManagerModule
  ],
  controllers: [AppController, TasksController],
  providers: [AppService, TaskService],
})
export class AppModule {}
