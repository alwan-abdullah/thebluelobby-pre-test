import { Injectable, InternalServerErrorException, Param } from '@nestjs/common';
import { TaskModel } from './task.model';
import { InjectRepository } from '@nestjs/typeorm';
import { AppEntity, status } from 'src/app.entity';
import { Entity, Repository } from 'typeorm';
import { CreateTodoDto } from 'src/DTO/create-todo.dto';
import { promises } from 'dns';

@Injectable()
export class TaskService {
  async delete(id: number): Promise<any> {
    try {
      return this.repo.delete({id: id});
    } catch(err){
      throw new InternalServerErrorException('Something went wrong')
    }
      
    }
   async update(id: number, status: status): Promise<any> {
    try {
      await this.repo.update({id: id}, {status: status});
      return this.repo.findOne({ where: { id: id } })
    } catch(err){
      throw new InternalServerErrorException('Something went wrong')
    }
  
    }

  constructor (@InjectRepository(AppEntity) private repo: Repository<AppEntity>){

  }

async findalltask() : Promise<AppEntity[]> {
    return await this.repo.find();
  }

async createTask(CreateTodoDto: CreateTodoDto): Promise<any> {
  const todo: AppEntity = new AppEntity();
  const {task, desc} = CreateTodoDto;
  todo.task = task;
  todo.desc = desc;
  todo.status = status.ONGOING;
  

  this.repo.create(todo);
  return this.repo.save(todo);
}

  // findtaskbyId(id: number): TaskModel {
  //   return this._task.find(t => t.id == id);
  // }
  
//   findOne(@Param() params: any): string {
//     console.log(params);
//     // console.log(params);  
//     return `This action returns a #${params} cat`;
// }
}
