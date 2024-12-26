import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Metadata } from "@/actions/CreateCheckoutSession";
import stripe from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/backendClient";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const headersList = await headers();
    const sig = headersList.get("stripe-signature");
    if (!sig) {
        return NextResponse.json({ error: "No Stripe signature" }, { status: 400 });
    }
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
        console.log("No Stripe webhook secret");
        return NextResponse.json({ error: "No Stripe webhook secret" }, { status: 400 });
    }    
    let event :Stripe.Event;
    try {
        event = Stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (error) {
        console.log("Error creating checkout session:", error);
        return NextResponse.json({ error: `Error creating checkout session ${error}` }, { status: 400 });
    }

    if(event.type === 'checkout.session.completed'){
        const session = event.data.object as Stripe.Checkout.Session;
        try {
            const order = await createOrderInSanity(session);
            console.log("Order created in Sanity:", order);
        }catch (error){
            console.error("Error creating checkout session:", error);
            return NextResponse.json({ error: `Order created in Sanity error: ${error}` }, { status: 400 });
        }
    }
    return NextResponse.json({ received: true });
}

async function createOrderInSanity(session: Stripe.Checkout.Session) {
    const {id,amount_total,currency,metadata,payment_intent,total_details} = session;
    const  {orderNumber,customerName,customerEmail,clerkUserId} = metadata as unknown as Metadata;


    const lineItemWithProduct = await stripe.checkout.sessions.listLineItems(
        id, 
        {expand: ["data.price.product"]}
    )
    const snaityProducts = lineItemWithProduct.data.map((item) => ({
        _key: crypto.randomUUID(),
        product: {
            _type: "reference",
            _ref: (item.price?.product as Stripe.Product)?.metadata?.id,
        },
        quantity: item?.quantity || 0,
    }));
    const order =await backendClient.create({
        _type:"order",
        orderNumber,
        customerName,
        stripeCheckoutSessionId:id,
        stripePaymentIntentId:payment_intent,
        stripeCustomerId: customerEmail,
        clerkUserId:clerkUserId,
        email:customerEmail,
        currency,
        amountDiscount: total_details?.amount_discount? total_details.amount_discount / 100 : 0,
        products: snaityProducts,
        totalPrice: amount_total? amount_total / 100 : 0,
        status:'paid',
        orderData: new Date().toISOString(),
    })
    return order;
}
