// const PrismaProxy = require("@prisma-cms/front/lib/setupProxy");

var proxy = require('http-proxy-middleware');

const cwd = process.cwd();

module.exports = function (app) {

  app.get("/voyager.worker.js", (req, res, next) => {
    res.sendFile(`${cwd}/node_modules/@prisma-cms/graphql-voyager/dist/voyager.worker.js`);
  });


  app.use(proxy(["/api/", "/images/"], {
    ws: true,
    target: 'https://modxclub.ru',
    changeOrigin: true,
    secure: false,
  }));

  // PrismaProxy(app);

};