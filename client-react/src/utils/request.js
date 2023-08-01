import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': 'application/json'
    },
});

export async function getAllBlocks() {
    const respone = await request.get(
        '/blockchain/blocks',
        {},
        {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        },
    ).then((res) => {
        return res.data;
    })
    .catch((error) => {
        return error;
    });

    return respone;
}

export async function getLatestBlock() {
    const respone = await request.get(
        '/blockchain/blocks/latest',
        {},
        {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        },
    ).then((res) => {
        return res.data;
    })
    .catch((error) => {
        return error;
    });

    return respone;
}

export async function getBlockByIndex(id) {
    const respone = await request.get(
        `/blockchain/blocks/${id}`,
        {},
        {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        },
    ).then((res) => {
        return res.data;
    })
    .catch((error) => {
        return error;
    });

    return respone;
}

export async function getBalanceByAddress(address) {
    const respone = await request.get(
        `/operator/${address}/balance`,
        {},
        {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        },
    ).then((res) => {
        return res.data;
    })
    .catch((error) => {
        return error;
    });

    return respone;
}

export default request;
