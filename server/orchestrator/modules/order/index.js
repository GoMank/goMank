const { gql } = require('apollo-server');
const axios = require('axios');
const redis = require('../../config');
const url = 'http://localhost:3000/';

const typeDefs = gql`
    extend type Query {
        orders: [Order]
        order(id: ID!): Order
    }

    extend type Mamang {
        order: Order
    }
    extend type Client {
        order: Order
    }

    extend type History {
        order: Order
    }

    type Order {
        id: ID!
        service: String
        noInvoice: String
        price: Int
        date: String
        statusOrder: String
        statusPayment: String
        address: String
        paymentMethod: String
        clientId: ID!
        mamangId: ID!
        mamang: [Mamang]
        client: [Client]
    }
`;

const resolvers = {
    Query: {
        orders: async (parent, args, context, info) => {
            try {
                const ordersCache = await redis.get('orders');
                let orders = JSON.parse(ordersCache);

                if (!orders) {
                    orders = await axios.get(url + 'orders');
                    orders = orders.data;
                    redis.set('orders', JSON.stringify(orders));
                }

                return orders;
            } catch (err) {
                throw new Error(err);
            }
        },

        order: async (parent, args, context, info) => {
            try {
                const orderCache = await redis.get('orders');
                let orders = JSON.parse(orderCache);
                let order;
                if (!orders) {
                    order = await axios.get(url + 'orders' + args.id);
                    order = order.data;
                }
                order = orders.find((order) => order.id === args.id);
                return order;
            } catch (err) {
                throw new Error(err);
            }
        },
    },

    Mamang: {
        order: async (parent, args, context, info) => {
            try {
                const orderCache = await redis.get('orders');
                let orders = JSON.parse(orderCache);
                let order;
                if (!orders) {
                    order = await axios.get(url + 'orders' + args.id);
                    order = order.data;
                }
                order = orders.find((order) => order.id === args.id);
                return order;
            } catch (err) {
                throw new Error(err);
            }
        },
    },

    Client: {
        order: async (parent, args, context, info) => {
            try {
                const orderCache = await redis.get('orders');
                let orders = JSON.parse(orderCache);
                let order;
                if (!orders) {
                    order = await axios.get(url + 'orders' + args.id);
                    order = order.data;
                }
                order = orders.find((order) => order.id === args.id);
                return order;
            } catch (err) {
                throw new Error(err);
            }
        },
    },

    History: {
        order: async (parent, args, context, info) => {
            try {
                const orderCache = await redis.get('orders');
                let orders = JSON.parse(orderCache);
                let order;
                if (!orders) {
                    order = await axios.get(url + 'orders' + args.id);
                    order = order.data;
                }
                order = orders.find((order) => order.id === args.id);
                return order;
            } catch (err) {
                throw new Error(err);
            }
        },
    },
};

module.exports = {
    typeDefs,
    resolvers,
};
