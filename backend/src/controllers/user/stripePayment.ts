import mongoose from 'mongoose';
import log4js from "log4js";
const logger = log4js.getLogger();
const stripeSecretKey = require('stripe')(process.env.STRIPE_SECRET_KEY);
const publishableKey = process.env.PUBLISHABLE_KEY;

const stripe = (async (req: any, res: any) => {
    const session: any = await mongoose.startSession();
    session.startTransaction();

    try {

        const session = await stripeSecretKey.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'inr', // INR for india, 
                        product_data: {
                            name: 'T-shirt',
                        },
                        unit_amount: 2000,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
        });

        return res.send({ url: session.url });

    } catch (err: any) {
        logger.info('stripe' + process.env.APP_GET_MESSAGE,);
        logger.info(err);
        await session.abortTransaction();
        session.endSession();
        return res.send(err);
    }

})

const renderBuyPage = async (req: any, res: any) => {

    try {

        return res.send('buy', {
            key: publishableKey,
            amount: 25
        })

    } catch (error: any) {
        console.log(error.message);
    }
}


// Export default
export default {
    stripe,
    renderBuyPage
} as const;
