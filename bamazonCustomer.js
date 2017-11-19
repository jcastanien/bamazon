var mysql = require ("mysql");
var inquirer = require ("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "james",
    password: "password",
    database: "bamazonDB"
});

connection.connect(function(err){
    if (err) throw err;
    start();
});


function start() {
connection.query("select * from products", function(err, results) {
    if (err) throw err;
    for (var i = 0; i < results.length; i++){
    console.log('====================================');
    console.log('Item ID: ' + results[i].item_id);
    console.log('Product Name: ' + results[i].product_name);
    console.log('Price: $' + results[i].price)
    console.log('====================================');
    }
    inquirer
        .prompt([
            {
                name: "items",
                type: "rawlist",
                choices: function(){
                    var itemArray = [];
                    for (var i = 0; i < results.length; i++){
                        itemArray.push(results[i].product_name);
                    }
                    return itemArray;
                },
                message: "Which Item would you like to buy?"
            },
            {
                name: "Id",
                type: "input",
                message: "What is the ID of the product you'd like to buy?"
            },
            {
                name: "stock",
                type: "input",
                message: "How many units would you like to buy?"
            }
        ])
        .then(function(answer) {

            purchase(answer);
        
        })
        
})
}





function purchase(answer){
    connection.query("select * from products", { productId: 1 } ,function(err, results) {
        if (err) throw err;

    var chosenItem;

    console.log('console loging answer: ' + answer.Id);                      // 1
    console.log('console loging results[0].item_id: ' + results[0].item_id); // 1

    console.log('typeof answer: ' + typeof(answer.Id));
    console.log('typeof result: ' + typeof(results[0].item_id));

    // console.log(results[0].stock_quantity);  // How to get to stock quanity

    // for(var i = 0; i < results.length; i++) {
    //     console.log(results[i].stock_quantity);
    // }


    for (var i = 0; i < results.length; i++) {
        if (results[i].item_id === answer.Id) {
            // chosenItem = results[i];
            console.log('test');
        }
    }
    // console.log(chosenItem);
    // console.log(results[i]);

    if (chosenItem.stock_quantity > parseInt(answer.stock)){
    connection.query(
        "update products set ? where ?",
        [
            {
                stock_quantity: answer.stock
            },
            {
                item_id: answer.Id
            }
        ],
        function(error) {
            if (error) throw err;
            console.log("Item " + answer.Id + ": Order placed successfully!");
        }
    );
    } else {
    console.log("Low Inventory");
    }
    })
};