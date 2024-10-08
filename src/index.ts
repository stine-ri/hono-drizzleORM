import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import {logger} from 'hono/logger'
import {csrf} from 'hono/csrf'
import {trimTrailingSlash} from 'hono/trailing-slash'
import { userRouter } from './Users/user.router'
const app = new Hono()

// inbuilt middlewares
app.use(logger()) //logs requests and response on the console
app.use(csrf())   //prevents csrf attacks by checking request headers
app.use(trimTrailingSlash()) // remove trailing slashes in our requests

//default routes
app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.notFound((c)=>{
    return c.text("Route not found", 404)
})

// custom routes
app.route('/api', userRouter)




const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
