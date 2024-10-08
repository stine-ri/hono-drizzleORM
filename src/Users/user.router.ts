import {Hono} from "hono";
import { type Context } from "hono";
export const userRouter = new Hono();


const users =[
    {
       id:1,
       name: "John Doe",
       email: "john@example.com" 
    },
    {
        id:2,
        name: "Jane Doe",
        email: "jane@example.com"
    }
]

// get all users
userRouter.get("/users", (c:Context) => {
    return c.json(users, 200);
});

// get a user

userRouter.get("/users/:id", (c:Context) => {
  const id = Number (c.req.param("id"));
  console.log(id)
//   return c.text(`user id is ${id} ` , 200)  to get thge id of the user
  const user =users.find((user) => user.id ===id);
  if(!user){
    return c.json("User not found", 404);
  }
  return c.json(user,200)
});

//create a user
userRouter.post("/users", async(c:Context)=>{
    const user =  await c.req.json();
    if (!user){
        return c.json("invalid user", 404)

    }
    users.push(user);
    return c.json(user, 201);
})

//update a user

userRouter.put("/users/:id", async(c:Context)=>{
    const id = Number(c.req.param("id"));
    const user = users.find((user) => user.id ===id);
    if(!user){
        return c.json("User not found", 404);
    }
    const updatedUser = await c.req.json();
    if (!updatedUser){
        return c.json("invalid user", 404)

    }
    user.name = updatedUser.name;
    user.email = updatedUser.email;
    return c.json(user, 200);
})