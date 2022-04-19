const { gql } = require('apollo-server');
const axios = require('axios');
const redis = require('../../config');
const urlPostgre = 'http://a2d1-139-0-237-101.ngrok.io/';
const urlMamang = 'https://big-penguin-91.loca.lt/';
const urlClient = 'https://splendid-wombat-11.loca.lt/';

const typeDefs = gql`
    extend type Query {
        orders: [Order]
        order(id: ID!): Order
        updateStatusOrder(id: ID!): Order
        updateCancelOrder(id: ID!): Order
    }

    type responseOrder {
        message: String
    }

    extend type Mutation {
        createOrder(
            service: Int
            noInvoice: String
            price: Int
            date: String
            time: String
            statusOrder: String
            statusPayment: String
            address: String
            paymentMethod: String
            clientId: ID!
            mamangId: ID!
        ): responseOrder
        updateStatusOrder(id: ID!): responseOrder
        updateCancelOrder(id: ID!): responseOrder
        deleteOrder(id: ID!): responseOrder
    }

    extend type Mamang {
        order: [Order]
    }
    extend type Client {
        order: [Order]
    }

    extend type History {
        order: Order
    }

    type Order {
        id: ID
        service: String
        invoiceNumber: String
        price: Int
        orderStatus: String
        paymentStatus: String
        clientId: ID
        address: String
        paymentMethod: String
        date: String
        time: String
        mamangId: ID
        createdAt: String
        updatedAt: String
        mamang: Mamang
        client: Client
    }
`;

const resolvers = {
    Query: {
        orders: async () => {
            try {
                let ordersCache = await redis.get('orders');
                let clientCache = await redis.get('clients');
                let mamangCache = await redis.get('mamangs');
                let orders;

                if (!mamangCache) {
                    mamangCache = await axios.get(urlMamang + 'mamangs');
                    mamangCache = mamangCache.data;
                    redis.set('mamangs', JSON.stringify(mamangCache));
                } else {
                    mamangCache = JSON.parse(mamangCache);
                }
                if (!clientCache) {
                    clientCache = await axios.get(urlClient + 'clients');
                    clientCache = clientCache.data;
                    redis.set('clients', JSON.stringify(clientCache));
                } else {
                    clientCache = JSON.parse(clientCache);
                }
                if (!ordersCache) {
                    ordersCache = await axios.get(urlPostgre + 'orders');
                    ordersCache = ordersCache.data;
                    redis.set('orders', JSON.stringify(ordersCache));
                } else {
                    ordersCache = JSON.parse(ordersCache);
                }
                return ordersCache.map((order) => {
                    const mamang = mamangCache.find((mamang) => mamang._id == order.mamangId);
                    const client = clientCache.find((client) => client._id == order.clientId);
                    return {
                        ...order,
                        mamang,
                        client,
                    };
                });
            } catch (err) {
                throw new Error(err);
            }
        },
        order: async (parent, args, context, info) => {
            try {
                const orderCache = await redis.get('orders');
                let clientCache = await redis.get('clients');
                let mamangCache = await redis.get('mamangs');
                let order;
                let mamang;
                let client;

                console.log(orderCache);
                if (!orderCache) {
                    console.log(`masuk`);
                    order = await axios.get(urlPostgre + 'orders/' + args.id);
                    console.log(`masuk`, order);
                    order = order.data;
                } else {
                    console.log(
                        `masuk`,
                        JSON.parse(orderCache).find((order) => order.id == args.id)
                    );
                    order = JSON.parse(orderCache).find((order) => order.id == args.id);
                }
                if (!mamangCache) {
                    mamangCache = await axios.get(urlMamang + 'mamangs');
                    mamangCache = mamangCache.data;
                    redis.set('mamangs', JSON.stringify(mamangCache));
                } else {
                    console.log(`masuk sini`, order);
                    mamangCache = JSON.parse(mamangCache);
                    mamang = mamangCache.find((mamang) => mamang._id === order.mamangId);
                    console.log(mamang, mamangCache);
                }
                if (!clientCache) {
                    clientCache = await axios.get(urlPostgre + 'clients');
                    clientCache = clientCache.data;
                    redis.set('clients', JSON.stringify(clientCache));
                } else {
                    clientCache = JSON.parse(clientCache);
                    client = clientCache.find((client) => client._id === order.clientId);
                }

                return {
                    ...order,
                    mamang,
                    client,
                };
            } catch (err) {
                throw new Error(err);
            }
        },
    },

    Mutation: {
        createOrder: async (parent, args, context, info) => {
            try {
                console.log(`masuk`, args);
                const order = await axios.post(urlPostgre + 'orders', {
                    ...args,
                    mamangName: 'ujang',
                    clientName: 'dadang',
                });

                console.log(`masuk`, order.data);
                await redis.del('orders');
                return order.data;
            } catch (err) {
                throw new Error(err);
            }
        },
        updateStatusOrder: async (parent, args, context, info) => {
            try {
                const order = await axios.patch(urlPostgre + 'orders/edit/done/' + args.id);
                await redis.del('orders');
                await redis.del('logs');
                console.log(order.data);
                return order.data;
            } catch (err) {
                throw new Error(err);
            }
        },
        updateCancelOrder: async (parent, args, context, info) => {
            try {
                const order = await axios.patch(urlPostgre + 'orders/edit/cancel/' + args.id);
                await redis.del('orders');
                await redis.del('logs');
                console.log(order.data);
                return order.data;
            } catch (err) {
                throw new Error(err);
            }
        },
        deleteOrder: async (parent, args, context, info) => {
            try {
                const order = await axios.delete(urlPostgre + 'orders/delete/' + args.id);
                await redis.del('orders');
                await redis.del('logs');
                return order.data;
            } catch (err) {
                throw new Error(err);
            }
        },
    },

    Mamang: {
        order: async (parent, args, context, info) => {
            try {
                let orderCache = await redis.get('orders');
                if (!orderCache) {
                    orderCache = await axios.get(urlPostgre + 'orders');
                    orderCache = orderCache.data;
                } else {
                    orderCache = JSON.parse(orderCache);
                }
                return orderCache.filter((order) => order.mamangId == parent._id);
            } catch (err) {
                throw new Error(err);
            }
        },
    },

    Client: {
        order: async (parent, args, context, info) => {
            try {
                let orderCache = await redis.get('orders');
                if (!orderCache) {
                    orderCache = await axios.get(urlPostgre + 'orders');
                    orderCache = orderCache.data;
                } else {
                    orderCache = JSON.parse(orderCache);
                }
                return orderCache.filter((order) => order.clientId == parent._id);
            } catch (err) {
                throw new Error(err);
            }
        },
    },

    History: {
        order: async (parent, args, context, info) => {
            try {
                let orderCache = await redis.get('orders');
                if (!orderCache) {
                    orderCache = await axios.get(urlPostgre + 'orders/');
                    orderCache = orderCache.data;
                } else {
                    orderCache = JSON.parse(orderCache);
                }
                return orderCache.find((order) => order.id == parent.orderId);
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
