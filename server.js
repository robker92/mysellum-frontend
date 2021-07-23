const express = require("express");
const path = require("path");
const app = express();
const history = require("connect-history-api-fallback");
const port = process.env.PORT || 8080;

// app.use(history());
//*** */
// app.use(
//   history({
//     disableDotRule: true,
//     verbose: true,
//     // rewrites: [{ from: /\/frontend/, to: "/frontend-app/dist/index.html" }],
//   })
// );

// const staticFileMiddleware = express.static(path.join(__dirname, "/dist"));

// app.use(staticFileMiddleware);
// app.use(
//   history({
//     disableDotRule: true,
//     verbose: true,
//     // rewrites: [{ from: /\/frontend/, to: "/frontend-app/dist/index.html" }],
//   })
// );
// app.use(staticFileMiddleware);
// ^ `app.use(staticFileMiddleware)` is included twice as per https://github.com/bripkens/connect-history-api-fallback/blob/master/examples/static-files-and-index-rewrite/README.md#configuring-the-middleware

// app.get("/", function(req, res) {
//   res.render(path.join(__dirname + "/dist/index.html"));
// });

// const publicPath = path.join(__dirname, "/frontend-app/dist");
// console.log(publicPath);
// console.log(process.cwd() + "/frontend-app/dist");
// app.use("/frontend", express.static(publicPath));
//*** */

// app.use(express.json());
// app.use(express.static(process.cwd() + "/frontend-app/dist"));

// app.use('/', history())
//"/a",
//(/*)?
// const publicPath = path.join(__dirname, "/frontend-app/dist");
// express.use("/frontend-app/", express.static(publicPath));

// let staticPath = path.posix.join('/en-us/credit-application/v2', 'public');
// app.use(
//   staticPath,
//   express.static(path.join(__dirname + "/frontend-app/dist/"))
// );
// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname+'/public/index.html'))
// });

// const staticFileMiddleware = express.static(
//   path.join(__dirname + "frontend-app/dist/") //
// );
// app.use(staticFileMiddleware);
// console.log(path.join(__dirname + "/dist"));
// app.use(express.static("dist"));
// path.join(__dirname + "/dist/")
// app.use("/", staticFileMiddleware);
// app.get("/*", (req, res) => {
//   // res.sendFile(path.join(__dirname + "/frontend-app/dist/index.html"));
//   res.render(path.join(__dirname, "/frontend-app/dist/index.html"));
// });
// // console.log(staticFileMiddleware);
// console.log(path.join(__dirname + "/frontend-app/dist/"));
// app.use(staticFileMiddleware);
app.use(
  history({
    // disableDotRule: true,
    verbose: true,
  })
);
// app.use(staticFileMiddleware);
console.log(path.join(__dirname + "/dist/index.html"));
app.use(express.static(path.join(__dirname + "/dist")));
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/dist/index.html"));
});

// app.get("/api", (req, res) => {
//   console.log("API has been called");
//   res.send("API has beedn called");
// });

// app.get("/project-frontend/", (req, res) => {
//   console.log(process.cwd());
//   res.sendFile(process.cwd() + "/frontend-app/dist/index.html");
// });

app.listen(port, () => {
  console.log(`Server listening on the port: ${port}`);
});
