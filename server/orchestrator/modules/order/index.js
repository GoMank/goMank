const { gql } = require('apollo-server');
const axios = require('axios');
const redis = require('../../config');
const urlPostgre = 'https://fdb5-125-164-20-223.ngrok.io/';
const urlMongo = 'http://1e6b-139-0-237-101.ngrok.io/';

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
        ): Order
        updateStatusOrder(id: ID!): responseOrder
        updateCancelOrder(id: ID!): responseOrder
        deleteOrder(id: ID!): responseOrder
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
        invoiceNumber: String
        price: Int
        orderStatus: String
        paymentStatus: String
        clientId: ID!
        address: String
        paymentMethod: String
        mamangId: ID!
        mamang: Mamang
        client: Client
    }
`;

const resolvers = {
    Query: {
        orders: async () => {
            try {
                const ordersCache = await redis.get('orders');
                let clientCache = await redis.get('clients');
                let mamangCache = await redis.get('mamangs');
                let orders = JSON.parse(ordersCache);
                if (!mamangCache) {
                    mamangCache = await axios.get(urlMongo + 'mamangs');
                    mamangCache = mamangCache.data;
                    redis.set('mamangs', JSON.stringify(mamangCache));
                }
                if (!clientCache) {
                    clientCache = await axios.get(urlPostgre + 'clients');
                    clientCache = clientCache.data;
                    redis.set('clients', JSON.stringify(clientCache));
                }
                if (!orders) {
                    orders = await axios.get(urlPostgre + 'orders');
                    orders = orders.data;
                    redis.set('orders', JSON.stringify(orders));
                }
                // return orders;
                return orders.map((order) => {
                    const mamang = mamangCache.find((mamang) => mamang._id === order.mamangId);
                    const client = clientCache.find((client) => client._id === order.clientId);
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
                console.log(`masuk`, args.id);
                const orderCache = await redis.get('orders');
                let clientCache = await redis.get('clients');
                let mamangCache = await redis.get('mamangs');
                let orders = JSON.parse(orderCache);
                let order;
                let mamang;
                let client;
                if (!orders) {
                    order = await axios.get(urlPostgre + 'orders/' + args.id);
                    order = order.data;
                } else {
                    order = orders.find((order) => order.id == args.id);
                }
                if (!mamangCache) {
                    mamangCache = await axios.get(urlMongo + 'mamangs');
                    mamangCache = mamangCache.data;
                    redis.set('mamangs', JSON.stringify(mamangCache));
                } else {
                    mamangCache = JSON.parse(mamangCache);
                    mamang = mamangCache.find((mamang) => mamang._id === order.mamangId);
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
                // let mamangCache = await redis.get('mamangs');
                // let clientCache = await redis.get('clients');
                // if (!mamangCache || !clientCache) {
                //     const mamangs = await axios.get(urlMongo + 'mamangs');
                //     const clients = await axios.get(urlPostgre + 'clients');
                //     mamangCache = mamangs.data;
                //     clientCache = clients.data;
                //     redis.set('mamangs', JSON.stringify(mamangCache));
                //     redis.set('clients', JSON.stringify(clientCache));
                // }
                // const mamang = JSON.parse(mamangCache).find(
                //     (mamang) => mamang._id === args.mamangId
                // );
                // const client = JSON.parse(clientCache).find(
                //     (client) => client._id === args.clientId
                // );
                // console.log(`masuk`, mamang, client);

                const order = await axios.post(urlPostgre + 'orders', {
                    ...args,
                    mamangName: 'ujang',
                    clientName: 'dadang',
                });

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
                console.log(order.data);
                return order.data;
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
                    order = await axios.get(urlPostgre + 'orders' + args.id);
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
                    order = await axios.get(urlPostgre + 'orders' + args.id);
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
                    order = await axios.get(urlPostgre + 'orders' + args.id);
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
