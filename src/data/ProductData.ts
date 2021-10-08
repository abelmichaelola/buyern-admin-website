import Product from "../Models/Product";

var ProductData:Product = {
    id:"foodId",
    name:"Amala and Ewedu",
    isAvailable:true,
    items: [
        {id:"foodItemId", about:"Amala is made from cassava flake only", isAvailable:true, name:"Amala",quantity:20, price:{currency:"₦",main:150.00}},
        {id:"foodItemId", about:"lalala", isAvailable:true, name:"Ewedu",quantity:undefined, price:{currency:undefined,main:0}},
        {id:"foodItemId", about:"Stewer", isAvailable:true, name:"Fish Stew",quantity:undefined, price:{currency:"₦",main:20.00}},
        {id:"foodItemId", about:"meater", isAvailable:true, name:"Meat",quantity:20, price:{currency:"₦",main:20.00}},
        {id:"foodItemId", about:"ponmoer", isAvailable:true, name:"Ponmo",quantity:20, price:{currency:"₦",main:20.00}},
        {id:"foodItemId", about:"fisher", isAvailable:true, name:"Fish",quantity:20, price:{currency:"₦",main:20.00}},
        {id:"foodItemId", about:"spagger", isAvailable:true, name:"Spaghetti",quantity:undefined, price:{currency:"₦",main:20.00}},
        {id:"foodItemId", about:"beanser", isAvailable:true, name:"Beans",quantity:undefined, price:{currency:"₦",main:20.00}},
]
}

var getProductData = (id: string, name: string): Product => {
    return {
    id:id,
    name:name,
    isAvailable:true,
    items: [
        {id:"foodItemId", about:"Amala is made from cassava flake only", isAvailable:true, name:"Amala",quantity:20, price:{currency:"₦",main:150.00}},
        {id:"foodItemId", about:"lalala", isAvailable:true, name:"Ewedu",quantity:undefined, price:{currency:undefined,main:0}},
        {id:"foodItemId", about:"Stewer", isAvailable:true, name:"Fish Stew",quantity:undefined, price:{currency:"₦",main:20.00}},
        {id:"foodItemId", about:"meater", isAvailable:true, name:"Meat",quantity:20, price:{currency:"₦",main:20.00}},
        {id:"foodItemId", about:"ponmoer", isAvailable:true, name:"Ponmo",quantity:20, price:{currency:"₦",main:20.00}},
        {id:"foodItemId", about:"fisher", isAvailable:true, name:"Fish",quantity:20, price:{currency:"₦",main:20.00}},
        {id:"foodItemId", about:"spagger", isAvailable:true, name:"Spaghetti",quantity:undefined, price:{currency:"₦",main:20.00}},
        {id:"foodItemId", about:"beanser", isAvailable:true, name:"Beans",quantity:undefined, price:{currency:"₦",main:20.00}},
]
    }
};
export {getProductData}
export default ProductData;