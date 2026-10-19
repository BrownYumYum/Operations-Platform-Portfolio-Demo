/** Entirely fictional data and independently written demo logic. */
export const initialOrders = [
  {id:'SO-1001', customer:'Harbor Café', product:'Commercial Mixer', quantity:1, stock:4, stage:'quoted'},
  {id:'SO-1002', customer:'Pine Street Bistro', product:'Prep Table', quantity:2, stock:6, stage:'approved'},
  {id:'SO-1003', customer:'Northwind Kitchen', product:'Wire Shelving', quantity:8, stock:5, stage:'quoted'},
  {id:'SO-1004', customer:'Sunset Bakery', product:'Convection Oven', quantity:1, stock:2, stage:'fulfillment'}
];
export const stages = ['quoted','approved','fulfillment','completed'];
export function advanceOrder(order) {
  if (!order || !stages.includes(order.stage)) throw new Error('Unknown order stage');
  const next = stages[stages.indexOf(order.stage)+1];
  if (!next) return {...order, error:'Order is already completed'};
  if (next === 'fulfillment' && order.stock < order.quantity) return {...order, error:'Insufficient simulated inventory'};
  return {...order, stage:next, error:null};
}
export function summarize(orders) {
  return {total:orders.length, ready:orders.filter(o=>o.stage==='approved').length,
    inProgress:orders.filter(o=>o.stage==='fulfillment').length,
    exceptions:orders.filter(o=>o.stock<o.quantity).length};
}
