import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { Todo } from "./todo";
import { TodoListComponent } from "./todo-list.component";
import { TodoListService } from "./todo-list.service";
import { Observable } from "rxjs";
import { PipeModule } from "../../pipe.module";

describe("Todo list", () => {

    let todoList: TodoListComponent;
    let fixture: ComponentFixture<TodoListComponent>;

    let todoListServiceStub: {
        getTodos: () => Observable<Todo[]>
    };

    beforeEach(() => {
        // stub TodoService for test purposes
        todoListServiceStub = {
            getTodos: () => Observable.of([
                {
                    id: "1234",
                    owner: "Blanche",
                    status: true,
                    body: "dfds fdfsdfdsfds",
                    category: "homework"
                },
                {
                    id: "2354",
                    owner: "Fry",
                    status: false,
                    body: "ghdfasij dhsfkjdashfkj",
                    category: "software design"
                },
                {
                    id: "3456",
                    owner: "Blanche",
                    status: true,
                    body: "asdhfkjhds kjausdhfkjdhas",
                    category: "video games"
                }
            ])
        };

        TestBed.configureTestingModule({
            imports: [PipeModule],
            declarations: [ TodoListComponent ],
            // providers:    [ TodoListService ]  // NO! Don't provide the real service!
            // Provide a test-double instead
            providers:    [ { provide: TodoListService, useValue: todoListServiceStub } ]
        })
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(TodoListComponent);
            todoList = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("contains all the todos", () => {
        expect(todoList.todos.length).toBe(3);
    });

    it("contains a todo with owner 'Blanche'", () => {
        expect(todoList.todos.some((todo: Todo) => todo.owner === "Blanche" )).toBe(true);
    });

    it("contain a todo with owner 'Fry'", () => {
        expect(todoList.todos.some((todo: Todo) => todo.owner === "Fry" )).toBe(true);
    });

    it("doesn't contain a todo with owner 'Santa'", () => {
        expect(todoList.todos.some((todo: Todo) => todo.owner === "Santa" )).toBe(false);
    });

    it("has 2 todos that has a 'complete' status", () => {
        expect(todoList.todos.filter((todo: Todo) => todo.status === true).length).toBe(2);
    });

});