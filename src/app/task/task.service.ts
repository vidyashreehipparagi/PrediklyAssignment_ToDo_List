import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  TaskList:any=[];

  constructor(){
      this.TaskList=[
          {taskId:1,taskName:"Add student to Drive",startDate:"2023-10-10",dueDate:"2023-11-11",priority:"Medium",description:"Changes must be reflected in database ",status:"new"}
      ];
  }

  public getAllTaskList():any{
      const task=[];
      for(let i=0;i<this.TaskList.length;i++){
          if(this.TaskList[i].status=='new'){
            task.push( this.TaskList[i]);
          }
      }
      return task;
  }

  public addTask(task:any):any{
      this.TaskList.push({taskId:task.taskId,taskName:task.taskName,startDate:task.startDate,dueDate:task.dueDate,priority:task.priority,description:task.description,status:"new"});
  }

  public deleteTasks(taskId:number){
    let i=0;
    for(;i<this.TaskList.length;i++){
        if(this.TaskList[i].taskId==taskId)
        {
          break;
        }
    }
    this.TaskList.splice(i,1);
}

  public editTask(task:any):any{
      for(let i=0;i<this.TaskList.length;i++){
          if(this.TaskList[i].taskId==task.taskId){
              this.TaskList[i].taskName=task.taskName;
              this.TaskList[i].startDate=task.startDate;
              this.TaskList[i].dueDate=task.dueDate;
              this.TaskList[i].priority=task.priority;
              this.TaskList[i].description=task.description;
              this.TaskList[i].status="new";
              break;
          }
      }
  }


  completedTask(taskId:number)
  {
  for(let i=0;i<this.TaskList.length;i++){
          if(this.TaskList[i].taskId===taskId){
              this.TaskList[i].status="done";
              
              break
          }
      }
     
  }
 
  getcompletedTaskList(){
      const task=[];
      for(let i=0;i<this.TaskList.length;i++){
          if(this.TaskList[i].status=='done'){
                task.push( this.TaskList[i]);
          }
      }
      return task;
  }
 
}
