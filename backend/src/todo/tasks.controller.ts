import { Body, Controller, Delete, Get, NotFoundException, NotImplementedException, Param, Patch, Post, Redirect, Res, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTodoDto } from 'src/DTO/create-todo.dto';
import { pipe } from 'rxjs';
import { status } from 'src/app.entity';


@Controller('tasks')
export class TasksController {
    constructor(private readonly taskservice: TaskService) {

    }
    @Get()
    getTask() {
        return this.taskservice.findalltask();
    }
    @Post()
    // @Redirect()
        createTask(@Body(ValidationPipe) data: CreateTodoDto) {
            
        return this.taskservice.createTask(data);
        }

    @Patch(':id')
    updateTask(
        @Body('status')status: status,
        @Param('id') id:number
        ): any
    {
        return this.taskservice.update(id, status)
    }
    @Delete(':id')
    deleteTask(
        @Param('id') id:number
        ): any
    {
        return this.taskservice.delete(id)
    }
    // @Get(':taskId')
    // getTaskById(@Param('taskId') id: number) {
    //     let task = this.taskservice.findtaskbyId(id);
        
    //     if (!task) {
    //         throw new NotFoundException('Task with Id ${id} not found')
    //     }
    //     return task;
    // }

  
}
