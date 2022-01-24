import { users } from '#data/users.js'
import { orders } from '#data/orders.js'
import { foods } from '#data/foods.js'

export default {
	Mutation: {
		addFood: (_, { foodName , foodImg }) => {
			try {
				let newFood = {
					food_id: foods.length + 1,
					food_name:foodName,
					foof_img:foodImg
				}
	
				foods.push(newFood)
	
				return {
					status: 200,
					message: "The order has succesfully added!",
					data: newFood
				}
			} catch(error) {
				return {
					status: 400,
					message: error.message
				}
			}
		},
		changeFood:(_,{foodId, foodImg})=>{
            try{
				let changedFood = [foods.find(food=>food.food_id==foodId)]
				let index = foods.findIndex(food => food.food_id == foodId)
				let deletedFoods = foods.splice(index, 1)
				
				changedFood.food_id=foodId
				changedFood.food_img=foodImg
				foods.push(changedFood)
				return {
					status: 200,
					message: "The Food has succesfully changed!",
					data:changedFood
				}
			}catch(error){
				return {
					status: 400,
					message: error.message,
				}
			}
        },
		deleteFood: (_, { foodId }) => {
			try {
				let index = foods.findIndex(food => food.food_id == foodId)
				if(index == -1) throw new Error("There is no such food!")

				let deletedFood = foods.splice(index, 1)

				return {
					status: 200,
					message: "The user has succesfully deleted!",
					data: deletedFood
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
		foods: (_, { foodId }) => {
			return foods.filter(food => foodId ? food.food_id == foodId : true)
		},
	},

	Food: {
		foodId:   parent => parent.food_id,
		foodName: parent => parent.food_name,
		foodImg:  parent => parent.food_img,
	},
}