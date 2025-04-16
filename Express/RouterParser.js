/**
 * /user
 * /user/:id
 * /user/:id/posts
 * /user/:id/posts/:postId
 * /user/:id/posts/:postId/comments
 * /user/:id/posts/:postId/comments/:commentId
 */

/**
 * input: route: sting,
 *        params: object
 *
 * output: /profile/5/comment/0
 *
 * run: node filename.js
 */

const ActiveRoutes = {
  coments: "/profile/:user_id/comment/:comment_id",
};

const RouterParser = (route, params = {}) => {
  const parts = route.split("/"); // ["", "post", ":user_id", "comment", ":comment_id"]
  const routes = [];

  parts.forEach((part, idx) => {
    if (part.startsWith(":")) {
      const key = part.replace(":", ""); // "user_id"
      if (Object.hasOwn(params, key)) {
        routes.push(params[key]);
      } else {
        routes.push(part); // :user_id
      }
    } else {
      routes.push(part);
    }
  });
  let path = routes.join("/");

  // Query
  // 1- has query
  // 2- Object.keys(params.query) => [keys] => ["page", 'limit", "sort"]
  //                                  ["page=1", 'limit=10", "sort=asc"]
  // 3- query[key] => page=1 limit=10 sort=asc <= `${key}=${query[key]}`
  return path;
};

console.log(
  RouterParser(ActiveRoutes.coments, {
    user_id: 3,
    query: {
      page: 1,
      limit: 10,
      sort: "asc",
      search: "abc",
    },
  })
);

// /profile/3/comment/:comment_id?page=1&limit=10&sort=asc
// path =
// queries = page=1&limit=10&sort=asc

// return `${path}?${query}`










