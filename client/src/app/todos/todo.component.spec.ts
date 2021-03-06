import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { Todo } from "./todo";
import { TodoComponent } from "./todo.component";
import { TodoListService } from "./todo-list.service";
import { Observable } from "rxjs";
import { PipeModule } from "../../pipe.module";

describe("Todo component", () => {

    let todoComponent: TodoComponent;
    let fixture: ComponentFixture<TodoComponent>;

    let todoListServiceStub: {
        getTodoById: (todoId: string) => Observable<Todo>
    };

    beforeEach(() => {
        // stub TodoService for test purposes
        todoListServiceStub = {
            getTodoById: (todoId: string) => Observable.of([
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
            ].find(todo => todo.id === todoId))
        };

        TestBed.configureTestingModule({
            imports: [PipeModule],
            declarations: [ TodoComponent ],
            providers:    [ { provide: TodoListService, useValue: todoListServiceStub } ]
        })
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(TodoComponent);
            todoComponent = fixture.componentInstance;
        });
    }));

    it("can retrieve Pat by ID", () => {
        todoComponent.setId("2354");
        expect(todoComponent.todo).toBeDefined();
        expect(todoComponent.todo.owner).toBe("Fry");
        expect(todoComponent.todo.body).toBe("ghdfasij dhsfkjdashfkj");
    });

    it("returns undefined for Santa", () => {
        todoComponent.setId("Santa");
        expect(todoComponent.todo).not.toBeDefined();
    });

});