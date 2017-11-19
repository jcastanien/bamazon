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


function start(){

    inquirer
        .prompt([
            {
            name: "masterList",
            type: "rawlist",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
            message: "Manager view"
            }
        ])
        .then(function(answer){
            if (answer.masterList === "View Products for Sale"){
                console.log("Products for Sale")
                products();
            } else if (answer.masterList === "View Low Inventory") {
                console.log("View Low Inventory")
                lowInven();
            } else if (answer.masterList === "Add to Inventory") {
                console.log("Add to Inventory")
                addInven();
            } else if (answer.masterList === "Add New Product") {
                console.log("Add New Product")
                addProducts();
            }
            
        })

    }

    function products(){
    connection.query("select * from products", function(err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++){
            console.log('====================================');
            console.log('Item ID: ' + results[i].item_id);
            console.log('Product Name: ' + results[i].product_name);
            console.log('Price: $' + results[i].price);
            console.log('Quantity: ' + results[i].stock_quantity);
            console.log('====================================');
        }
        start();
    })
}

    function lowInven(){
        connection.query("Select * from products where stock_quantity <= 5", function(err, results) {
            if (err) throw err;
            for (var i = 0; i < results.length; i++){
                console.log('====================================');
                console.log('Product Name: ' + results[i].product_name);
                console.log('Item ID: ' + results[i].stock_quantity);
        }
        start();
    })
}