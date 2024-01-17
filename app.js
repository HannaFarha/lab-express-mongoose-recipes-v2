const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const Recipe =require("./models/Recipe.model")
const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));


// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});
app.post ('/recipes',async(req,res)=>{
    console.log(req.body);
    const payload=req.body;
    try{
    const newRecipe=await Recipe.create(payload)
    res.status(201).json(newRecipe);
} catch(error){
    res.status(400).json({ error, message: "Duplicate somewhere" })
}});

    


app.get ('/recipes',(req,res)=>{
    Recipe.find()

   .then((recipes) => {
    
    res.json(recipes);
}).catch((error) => {
    console.error("Error while retrieving recipe ->", error);
    res.status(500).send({ error: "Failed to retrieve recipe" });
  });
});

app.put("/api/recipe/:recipeId", (req, res) => {
    const recipeId = req.params.recipeId;
    const updatedRecipeData = req.body;
  
    Recipe.findByIdAndUpdate(recipeId, updatedRecipeData, { new: true }) //findByIdAndUpdate(id, update, options, callback)
      .then((updatedRecipe) => {
        if (!updatedRecipe) {
          return res.status(404).json({ error: "Recipe not found" });
        }
        console.log("updated recipe by ID", updatedRecipe);
        res.json(updatedRecipe);
      })
      .catch((error) => {
        console.log("Error while updating recipe data".error);
        res.status(500).send({ error: "failed to update recipe" });
      });
  });
  app.delete("/api/recipe/:cohortId", async (req, res) => {
    const { cohortId } = req.params;
    try {
      const cohortDel = await Recipe.findByIdAndDelete(cohortId);
      res
        .status(202)
        .json({ message: `${cohortDel.title} was removed from database` });
    } catch (error) {
      console.log(error);
    }
  });

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route


//  Iteration 4 - Get All Recipes
//  GET  /recipes route


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route



// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
