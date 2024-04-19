const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://root:abcd12@cluster0.wmjixkk.mongodb.net/sadProject?retryWrites=true&w=majority&appName=Cluster0";
//const mongoURI = "mongodb+srv://root:abcd12@cluster0.wmjixkk.mongodb.net/sadProject?retryWrites=true&w=majority&appName=Cluster0";
//const mongoURI = "mongodb+srv://sadProject:abcd12@cluster0.wmjixkk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");

        const shops = mongoose.connection.db.collection("ShopName");
        const shop = await shops.find({}).toArray();
        global.shopName = shop;
        
        //console.log( global.shopName);

        const collection = mongoose.connection.db.collection("food_info");
        const data = await collection.find({}).toArray();
        global.food_items = data;
        //console.log("Global.food_items:", global.food_items);

        const meals = mongoose.connection.db.collection("mealType");
        const meal = await meals.find({}).toArray();
        global.mealtype = meal;
        //console.log( global.mealtype);
        //const userData = mongoose.connection.db.collection("user_info");
        //const dataUser = await userData.find({}).toArray();
        //global.user_data= dataUser;

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

/*
(async () => {
    await mongoDB();
})();   */


module.exports = mongoDB;