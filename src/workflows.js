/** Fictional demonstration data. No live enterprise connections. */
export const stages = ['Quoted', 'Approved', 'Fulfillment', 'Completed'];
export const initialProducts = [
 {sku:'EQ-101',name:'Commercial Mixer',category:'Equipment',onHand:4,reorderPoint:2,price:2450},
 {sku:'EQ-104',name:'Stainless Prep Table',category:'Equipment',onHand:6,reorderPoint:4,price:790},
 {sku:'ST-210',name:'Wire Shelving Kit',category:'Storage',onHand:5,reorderPoint:7,price:210},
 {sku:'EQ-116',name:'Convection Oven',category:'Equipment',onHand:2,reorderPoint:2,price:5200},
 {sku:'SM-302',name:'Food Storage Containers',category:'Supplies',onHand:24,reorderPoint:12,price:38},
 {sku:'EQ-143',name:'Undercounter Refrigerator',category:'Equipment',onHand:3,reorderPoint:2,price:3200}
];
export const initialOrders = [
 {id:'SO-1001',customer:'Harbor Café',sku:'EQ-101',quantity:1,stage:'Quoted',date:'Oct 14, 2026'},
 {id:'SO-1002',customer:'Pine Street Bistro',sku:'EQ-104',quantity:2,stage:'Approved',date:'Oct 15, 2026'},
 {id:'SO-1003',customer:'Northwind Kitchen',sku:'ST-210',quantity:8,stage:'Approved',date:'Oct 16, 2026'},
 {id:'SO-1004',customer:'Sunset Bakery',sku:'EQ-116',quantity:1,stage:'Fulfillment',date:'Oct 17, 2026'},
 {id:'SO-1005',customer:'Cedar Dining Co.',sku:'SM-302',quantity:5,stage:'Completed',date:'Oct 12, 2026'},
 {id:'SO-1006',customer:'Bluebird Catering',sku:'EQ-143',quantity:1,stage:'Quoted',date:'Oct 18, 2026'}
];
export function productFor(order,products){return products.find(p=>p.sku===order.sku)}
export function canAdvance(order,products){
 if (order.stage==='Completed') return {ok:false,reason:'Already completed'};
 if(order.stage==='Approved') { const item=productFor(order,products); if(!item || item.onHand<order.quantity) return {ok:false,reason:`Insufficient inventory: ${item?.onHand??0} available, ${order.quantity} required`}; }
 return {ok:true,reason:''};
}
export function advanceOrder(order,products){
 const check=canAdvance(order,products);
 if(!check.ok) return {order,error:check.reason};
 const nextStage=stages[stages.indexOf(order.stage)+1];
 const item=productFor(order,products);
 const nextProducts=nextStage==='Fulfillment'?products.map(p=>p.sku===order.sku?{...p,onHand:p.onHand-order.quantity}:p):products;
 return {order:{...order,stage:nextStage},products:nextProducts,error:null};
}
export function restock(products,sku,amount){
 if(!Number.isInteger(amount)||amount<=0) throw new Error('Restock must be a positive whole number');
 return products.map(p=>p.sku===sku?{...p,onHand:p.onHand+amount}:p);
}
export function summarize(orders,products){
 return {total:orders.length,active:orders.filter(o=>o.stage!=='Completed').length,fulfilled:orders.filter(o=>o.stage==='Completed').length,lowStock:products.filter(p=>p.onHand<=p.reorderPoint).length, pipeline:orders.filter(o=>o.stage!=='Completed').reduce((sum,o)=>sum+(productFor(o,products)?.price??0)*o.quantity,0)};
}
