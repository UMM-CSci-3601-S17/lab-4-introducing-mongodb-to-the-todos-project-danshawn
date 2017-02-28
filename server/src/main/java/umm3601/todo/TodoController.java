package umm3601.todo;

import com.mongodb.MongoClient;
import com.mongodb.client.AggregateIterable;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Accumulators;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Sorts;
import com.mongodb.util.JSON;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;


import java.io.IOException;
import java.util.*;

import static com.mongodb.client.model.Filters.eq;

public class TodoController {

    private final MongoCollection<Document> todoCollection;

    public TodoController() throws IOException {
        // Set up our server address
        // (Default host: 'localhost', default port: 27017)
        // ServerAddress testAddress = new ServerAddress();

        // Try connecting to the server
        //MongoClient mongoClient = new MongoClient(testAddress, credentials);
        MongoClient mongoClient = new MongoClient(); // Defaults!

        // Try connecting to a database
        MongoDatabase db = mongoClient.getDatabase("test");

        todoCollection = db.getCollection("todos");
    }

    // List todos
    public String listTodos(Map<String, String[]> queryParams) {

        List<Bson> aggregateParams = new ArrayList<Bson>();

        if (queryParams.containsKey("owner")) {
            String targetAge = (queryParams.get("owner")[0]);
            aggregateParams.add(Aggregates.match(eq("owner", targetAge)));
        }


        if (queryParams.containsKey("category")) {
                String targetAge = (queryParams.get("category")[0]);
                aggregateParams.add(Aggregates.match(eq("category", targetAge)));
        }
        if (queryParams.containsKey("body")) {
            String targetAge = (queryParams.get("body")[0]);
            aggregateParams.add(Aggregates.match(Filters.regex("body",targetAge)));
        }

        if (queryParams.containsKey("status")) {
            try {
                boolean status = Boolean.parseBoolean(queryParams.get("status")[0]);
                aggregateParams.add(Aggregates.match(eq("status", status)));
            }
            catch(NumberFormatException nfe)
            {
                nfe.printStackTrace();
            }
        }

        if (queryParams.containsKey("orderBy")) {
            String sortType = (queryParams.get("orderBy")[0]);
            aggregateParams.add(Aggregates.sort(Filters.eq(sortType,1))); //1 is Ascending, -1 is Descending
        }

        if (queryParams.containsKey("limit")) {
            try {
                int limit = Integer.parseInt(queryParams.get("limit")[0]);
                if(limit > 0) {
                    aggregateParams.add(Aggregates.limit(limit)); //1 is Ascending, -1 is Descending
                }
            }catch(NumberFormatException nfe){
                nfe.printStackTrace();
            }
        }

        AggregateIterable<Document> matchingTodos = todoCollection.aggregate(aggregateParams);
        return JSON.serialize(matchingTodos);
    }

    // Get a single todo
    public String getTodo(String id) {
        FindIterable<Document> jsonTodos
                = todoCollection
                .find(eq("_id", new ObjectId(id)));

//        Document jsonTodo
//                = todoCollection
//                .find(eq("_id", new ObjectId(id))).first();
//        if(jsonTodo != null)
//            return jsonTodo.toJson();
//        return null;
        Iterator<Document> iterator = jsonTodos.iterator();
        if(iterator.hasNext()) {
            Document todo = iterator.next();

            return todo.toJson();
        }
        else
            return null;
    }

    // Get the average age of all todos by company
//    public String getAverageAgeByCompany() {
//        AggregateIterable<Document> documents
//                = todoCollection.aggregate(
//                Arrays.asList(
//                        Aggregates.group("$company",
//                                Accumulators.avg("averageAge", "$age")),
//                        Aggregates.sort(Sorts.ascending("_id"))
//                ));
//        System.err.println(JSON.serialize(documents));
//        return JSON.serialize(documents);
//    }

}
