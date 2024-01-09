import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TaskService } from './task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl:'./task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  constructor(private fb:FormBuilder,private taskservice:TaskService,private router:Router) { }

  ngOnInit(): void {
    this.getAllTaskList();
    this.isListView=true;
  }

  
  TaskForm=this.fb.group({
    taskId:[Validators.required],
    taskName:['',Validators.required],
    startDate:['',Validators.required],
    dueDate: ['', Validators.required],
    priority:['',Validators.required],
    description:['',Validators.required],
   });

   isUpdateTask:boolean=false;
   ListOfTask:any=[];
   isListView:boolean=true;
 

   get taskId(){
    return this.TaskForm.get('taskId');
  }
  get taskName(){
    return this.TaskForm.get('taskName');
  }
  get startDate(){
    return this.TaskForm.get('startDate');  
  }
  
  get dueDate(){
    return this.TaskForm.get('duedate');  
  }
  get priority(){
    return this.TaskForm.get('priority');  
  }
  get description(){
    return this.TaskForm.get('description');  
  }

  getAllTaskList(){
    this.isListView=true;
    this.ListOfTask=[];
    this.ListOfTask=this.taskservice.getAllTaskList();
  }

  addTask(){
      let task=this.TaskForm.value;
      if(!this.isUpdateTask){
        this.taskservice.addTask(task);
      }
     else{
        this.taskservice.editTask(task);
        this.isUpdateTask=false;
     }
     this.TaskForm.reset();
     this.getAllTaskList();
  }
  deleteTask(taskId:number){
    let alertbox=confirm('Do you want to delete the record of taskid '+taskId+' ?');
    if(alertbox==true)
    {
      this.taskservice.deleteTasks(taskId);
      this.getAllTaskList();
    }
  
  }
      
  editTask(task: any) {
      this.isUpdateTask = true;
      this.TaskForm.setValue({
        taskId: task.taskId,
        taskName: task.taskName,
        startDate: task.startDate,
        dueDate: task.dueDate,  
        priority: task.priority,
        description: task.description,
      });
  }
  
completedTask(taskId:number){
    this.taskservice.completedTask(taskId);
    alert("Are you sure? Do you want to move to complete this task?");
    this.getAllTaskList();
 }
 

getcompletedTasks(){
    this.isListView=false;
    this.ListOfTask=[];
   this.ListOfTask=this.taskservice.getcompletedTaskList();
  }

clearForm()
  {
    this.TaskForm.reset();
    this.isUpdateTask=false;
  }

}
