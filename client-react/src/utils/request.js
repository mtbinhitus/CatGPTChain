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
        return res;
    })
    .catch((error) => {
        return error.response;
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
        return res;
    })
    .catch((error) => {
        return error.response;;
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
        return res;
    })
    .catch((error) => {
        return error.response;
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
        return res;
    })
    .catch((error) => {
        return error.response;
    });

    return respone;
}

export async function getInfoWalletById(id) {
    const respone = await request.get(
        `/operator/wallets/${id}`,
        {},
        {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        },
    ).then((res) => {
        return res;
    })
    .catch((error) => {
        return error.response;
    });

    return respone;
}


export async function createNewWalletByPassword(password) {
    const respone = await request
        .post(
            '/operator/wallets',
            {
                password
            },
            {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            },
        )
        .then((res) => {
            return res;
        })
        .catch((error) => {
            return error.response;
        });

    return respone;
}

export async function mineBlock(address) {
    const respone = await request
        .post(
            '/miner/mine',
            {
                rewardAddress: address,
                feeAddress: address
            },
            {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            },
        )
        .then((res) => {
            return res;
        })
        .catch((error) => {
            return error.response;
        });

    return respone;
}

export async function createNewAddressById(walletid, password) {
    const respone = await request
        .post(
            `/operator/wallets/${walletid}/addresses`,
            {},
            {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    password: password
                },
            },
        )
        .then((res) => {
            return res;
        })
        .catch((error) => {
            return error.response;
        });

    return respone;
}


export async function createTransaction(fromAds, toAds, amount, walletid,password) {
    const respone = await request
        .post(
            `/operator/wallets/${walletid}/transactions`,
            {
                fromAddress: fromAds,
                toAddress: toAds,
                amount: amount,
                changeAddress: fromAds
            },
            {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    password: password
                },
            },
        )
        .then((res) => {
            return res;
        })
        .catch((error) => {
            return error.response;
        });

    return respone;
}

export default request;
