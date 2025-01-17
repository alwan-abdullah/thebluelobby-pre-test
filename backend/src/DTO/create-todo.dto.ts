import { IsNotEmpty, MaxLength } from "class-validator";


export class CreateTodoDto {
@IsNotEmpty() 
@MaxLength(15, {message: 'Max Length is 15 Characters'})
task: string;
@IsNotEmpty() 
desc: string;

}