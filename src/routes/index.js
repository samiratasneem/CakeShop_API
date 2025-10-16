const express = require("express");
const router = express.Router();

const authRoutes = require("../modules/auth/auth.routes");
const cakeRoutes = require("../modules/cakes/cake.routes");
const orderRoutes = require("../modules/orders/order.routes");
const customOrderRoutes = require("../modules/customOrders/customOrder.routes");
const userRoutes = require("../modules/users/user.routes");

const moduleRoutes = [
	{
		path: "/auth",
		route: authRoutes,
	},
	{
		path: "/cakes",
		route: cakeRoutes,
	},
	{
		path: "/orders",
		route: orderRoutes,
	},
	{
		path: "/customOrders",
		route: customOrderRoutes,
	},
	{
		path: "/users",
		route: userRoutes,
	},
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

module.exports = router;
