const authRouter = require("./authRoute")
const brandRouter = require('./brandRoute')
const productRouter = require('./productRoute')
const invoiceRouter = require('./invoiceRoute')
const purchaseRouter = require('./purchaseRoute')
const reportRouter = require('./reportRoute')

const routes = [
  {
    path: "/api/auth",
    handler : authRouter
  },
  {
    path: "/api/brand",
    handler : brandRouter
  },
  {
    path: "/api/product",
    handler : productRouter
  },
  {
    path: "/api/invoice",
    handler : invoiceRouter
  },
  {
    path: "/api/purchase",
    handler : purchaseRouter
  },
  {
    path: "/api/report",
    handler : reportRouter
  },
  {
    path: "/",
    handler : (req, res) =>{
      res.send("Alhamdulillah.Server is ready !")
    }
  }
]

const applyRoutes = (app)=>{
  routes.map(r=>{
    if(r.path === "/"){
      app.get(r.path,r.handler)
    }else{
      app.use(r.path,r.handler)
    }
  })
}

module.exports = applyRoutes