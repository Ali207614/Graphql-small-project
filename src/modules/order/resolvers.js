import { users } from '#data/users.js'
import { orders } from '#data/orders.js'
import { foods } from '#data/foods.js'

export default {
	Mutation: {
		addOrder: (_, { foodId,userId , count }) => {
			try {
				let newOrder = {
					order_id: orders.length + 1,
					user_id:userId,
					foof_id:foodId,
					count:count
				}
	
				orders.push(newOrder)
	
				return {
					status: 200,
					message: "The order has succesfully added!",
					data: newOrder
				}
			} catch(error) {
				return {
					status: 400,
					message: error.message
				}
			}
		},
		changeOrder:(_,{orderId ,foodId, count})=>{
            let changedOrder = [orders.find(order=>order.order_id==orderId)]
			let index = orders.findIndex(order => order.order_id == orderId)
			let deletedOrders = orders.splice(index, 1)
			
			changedOrder.order_id=orderId
			changedOrder.food_id=foodId
			changedOrder.count=count
			orders.push(changedOrder)
			return {
				status: 200,
				message: "The Order has succesfully changed!",
			} 
        },
		deleteOrder: (_, { orderId }) => {
			try {
				let index = orders.findIndex(order => order.order_id == orderId)
				if(index == -1) throw new Error("There is no such user!")

				let deletedOrder = orders.splice(index, 1)

				return {
					status: 200,
					message: "The user has succesfully deleted!",
					data: deletedOrder
				}

			} catch(error) {
				return {
					status: 400,
					message: error.message
				}
			}
		}
	},
	Query: {
		orders: (_, { userId, orderId }) => {
			if(userId) {
				return orders.filter(order => order.user_id == userId)
			}

			if(orderId) {
				return [orders.find(order => order.order_id == orderId)]
			}

			return orders
		},
	},

	Order: {
		orderId: parent => parent.order_id,
		user:    parent => users.find(user => user.user_id == parent.user_id),
		food:    parent => foods.find(food => food.food_id == parent.food_id)
	}
}