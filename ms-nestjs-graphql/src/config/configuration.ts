export default () => ({
    port: process.env.ENVIROMENT ==='DESARROLLO_GRAPHQL'? parseInt(process.env.PORT_SERVER, 10) : 3001,
    cors:process.env.CORS,
    api:process.env.API
  }); 