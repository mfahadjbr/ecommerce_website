import Stripe from 'stripe'
if(!process.env.STRIPE_SECRET_KEY){
    throw new Error('Missing Stripe secret key');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string,{
    apiVersion: '2024-11-20.acacia',
})
export default stripe