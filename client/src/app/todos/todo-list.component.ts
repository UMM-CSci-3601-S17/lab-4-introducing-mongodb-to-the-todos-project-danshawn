import { Component, OnInit } from '@angular/core';
import { TodoListService } from "./todo-list.service";
import { Todo } from "./todo";
import { FilterBy } from "./filter.pipe";

@Component({
    selector: 'todo-list-component',
    templateUrl: 'todo-list.component.html',
    providers: [ FilterBy ]
})

export class TodoListComponent implements OnInit {
    public todos: Todo[];
    public progress1 : string;

    //Must have these defined to nullstring so that
    //they aren't "undefined"
    public filterOwner : string = "";
    public filterCategory : string = "";
    public filterBody : string = "";
    public filterStatus : string = "";
    public sortBy : string = "";



    constructor(private todoListService: TodoListService) {
        // this.todos = this.todoListService.getTodos();
    }

    ngOnInit(): void {
        /*this.todoListService.getTodos().subscribe(
            todos => this.todos = todos,
            err => {
                console.log(err);
            }
        );*/

        setInterval(this.freakout, 500);

    }

    private formRequest(owner:string, category: string, status: string, body:string, orderBy:string) : string
    {
        var param_map = new Array();
        if (owner != "")
            param_map["owner"] = owner;
        if(category != "")
            param_map["category"] = category;
        if(status != "")
            param_map["status"] = status;
        if(body != "")
            param_map["body"] = body;
        if(orderBy != "")
            param_map["orderBy"] = orderBy;

        var prefix = "?";
        var parameters = "";

        /**
         * Construct params string by the value of the elements of which are enabled
         */
        for (var param in param_map) {
            parameters += prefix + param + "=" + param_map[param]; //Construct ?owner=Name&limit=3 etc.
            prefix = "&";
        }
        return parameters;
    }

    public doRequest(owner:string, category: string, status: string, body:string, orderBy:string)
    {
        var req : string = this.formRequest(owner, category, status, body, orderBy);
        this.todoListService.getFilteredTodos(req).subscribe(
            todos => this.todos = todos,
            err => {
                console.log(err);
            }
        );
    }

    public freakout(): void {
        var progress_bar1 : Element = document.getElementById("progress_bar1");
        var progress_bar2 : Element = document.getElementById("progress_bar2");
        var progress_bar3 : Element = document.getElementById("progress_bar3");
        var progress_bar4 : Element = document.getElementById("progress_bar4");


        progress_bar1.setAttribute("style", "width: " + Math.random()*100 + "%");
        progress_bar2.setAttribute("style", "width: " + Math.random()*100 + "%");
        progress_bar3.setAttribute("style", "width: " + Math.random()*100 + "%");
        progress_bar4.setAttribute("style", "width: " + Math.random()*100 + "%");
    }

    foo(): void{
        alert('wHAADSFD');
    }

}

