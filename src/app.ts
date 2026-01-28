import express, { Application } from "express";
import cors from 'cors'
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { providerRouter } from "./modules/provider/provider.router";
import { categoryRouter } from "./modules/category/category.router";
import { mealRouter } from "./modules/meal/meal.router";
import { orderRouter } from "./modules/order/order.router";
import { reviewRouter } from "./modules/review/review.router";

const app:Application = express();

app.use(cors({
    origin:process.env.APP_URL || "http://localhost:4000", //client side URL
    credentials:true
}))

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use (express.json());
app.get ("/", (req,res)=>{
    res.send("Hello World!")
})

app.use("/api/providers", providerRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/meals", mealRouter);
app.use("/api/orders", orderRouter);
app.use("/api/reviews", reviewRouter);

export default app