import express from "express"


const router= express.Router();
import { calculateTotalSale,
     countTotalOrders,
      createOrder,
       getAllOrders,
        getUserorders,
      calculateTotalSaleByDate,
     findOrderById,
     markOrderAsPaid,
     markOrderAsDelivered,
     deleteOrder
     } from "../controllers/orderController.js";

import {authenticate,authorizeAdmin} from "../middlewares/authMiddleware.js"

router.route("/").post(authenticate, createOrder).get(authenticate, authorizeAdmin, getAllOrders)
router.route("/mine").get(authenticate,getUserorders)
router.route("/total-orders").get(countTotalOrders)
router.route("/total-sales").get(calculateTotalSale)
router.route("/total-sales-by-date").get(calculateTotalSaleByDate)

router.route("/:id").get(authenticate,findOrderById)
router.route("/:id").delete(authenticate, deleteOrder)
router.route("/:id/pay").put(authenticate, markOrderAsPaid)
router.route("/:id/deliver").put(authenticate, authorizeAdmin, markOrderAsDelivered)
export default router