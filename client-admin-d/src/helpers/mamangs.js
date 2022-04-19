const listMamang = () => {
    const listMamangs = [
        {
            "_id": "62559dcfc9054d53a273fb14",
            "email": "mamang@mail.com",
            "name": "mamang123",
            "phoneNumber": "0822123456",
            "gender": "male",
            "address": {
                "type": "Point",
                "coordinates": [
                    107.01118835699735,
                    -6.269429087104287
                ]
            },
            "image": "https://i1.sndcdn.com/avatars-000009789474-uztegm-t500x500.jpg",
            "rekNumber": "1234567",
            "saldo": 5000
        },
        {
            "_id": "62559ddfc9054d53a273fb15",
            "email": "mamang123@mail.com",
            "name": "mamang123456",
            "phoneNumber": "0822123456",
            "gender": "male",
            "address": {
                "type": "Point",
                "coordinates": [
                    107.0111476,
                    -6.2694103
                ]
            },
            "image": "https://i1.sndcdn.com/avatars-000009789474-uztegm-t500x500.jpg",
            "rekNumber": "1234567",
            "saldo": "2000"
        },
        {
            "_id": "6255ac5b192510a0ea77be65",
            "name": "kuda",
            "email": "kuda@mail.com",
            "address": {
                "type": "Point",
                "coordinates": [
                    107.01118835699735,
                    -6.269429087104287
                ]
            },
            "phoneNumber": "12345",
            "gender": "male",
            "image": "https://i1.sndcdn.com/avatars-000009789474-uztegm-t500x500.jpg",
            "rekNumber": "123456",
            "saldo": 0
        },
        {
            "_id": "625b9a52f58c2b1e38ee21f5",
            "email": "mamang12377test@mail.com",
            "name": "mamang12345677test",
            "phoneNumber": "0822123456",
            "gender": "male",
            "address": {
                "type": "Point",
                "coordinates": [
                    107.01118835699735,
                    -6.269429087104287
                ]
            },
            "image": "https://i1.sndcdn.com/avatars-000009789474-uztegm-t500x500.jpg",
            "rekNumber": "1234567",
            "saldo": 0
        },
        {
            "_id": "625b9a53f58c2b1e38ee21f6",
            "email": "mamang12377test@mail.com",
            "name": "mamang12345677test",
            "phoneNumber": "0822123456",
            "gender": "male",
            "address": {
                "type": "Point",
                "coordinates": [
                    107.01118835699735,
                    -6.269429087104287
                ]
            },
            "image": "https://i1.sndcdn.com/avatars-000009789474-uztegm-t500x500.jpg",
            "rekNumber": "1234567",
            "saldo": 0
        },
        {
            "_id": "625b9a54f58c2b1e38ee21f7",
            "email": "mamang12377test@mail.com",
            "name": "mamang12345677test",
            "phoneNumber": "0822123456",
            "gender": "male",
            "address": {
                "type": "Point",
                "coordinates": [
                    107.01118835699735,
                    -6.269429087104287
                ]
            },
            "image": "https://i1.sndcdn.com/avatars-000009789474-uztegm-t500x500.jpg",
            "rekNumber": "1234567",
            "saldo": 0
        },
        {
            "_id": "625b9f7485ef221da1e0c6f1",
            "email": "testMamang@mail.com",
            "phoneNumber": "0822123456",
            "name": "testingMamang",
            "gender": "male",
            "address": {
                "type": "Point",
                "coordinates": [
                    107.01118835699735,
                    -6.269429087104287
                ]
            },
            "image": "https://i1.sndcdn.com/avatars-000009789474-uztegm-t500x500.jpg",
            "rekNumber": "82292838",
            "saldo": 0
        },
        {
            "_id": "625ba0028e6519ca13bbcf6d",
            "email": "testMamang@mail.com",
            "phoneNumber": "0822123456",
            "name": "testingMamang",
            "gender": "male",
            "address": {
                "type": "Point",
                "coordinates": [
                    107.01118835699735,
                    -6.269429087104287
                ]
            },
            "image": "https://i1.sndcdn.com/avatars-000009789474-uztegm-t500x500.jpg",
            "rekNumber": "82292838",
            "saldo": 0
        },
        {
            "_id": "625ba01d67cac2203edd96f3",
            "email": "testMamang@mail.com",
            "phoneNumber": "0822123456",
            "name": "testingMamang",
            "gender": "male",
            "address": {
                "type": "Point",
                "coordinates": [
                    107.01118835699735,
                    -6.269429087104287
                ]
            },
            "image": "https://i1.sndcdn.com/avatars-000009789474-uztegm-t500x500.jpg",
            "rekNumber": "82292838",
            "saldo": 0
        },
        {
            "_id": "625ba053b25beb60fe360662",
            "email": "testMamang@mail.com",
            "phoneNumber": "0822123456",
            "name": "testingMamang",
            "gender": "male",
            "address": {
                "type": "Point",
                "coordinates": [
                    107.01118835699735,
                    -6.269429087104287
                ]
            },
            "image": "https://i1.sndcdn.com/avatars-000009789474-uztegm-t500x500.jpg",
            "rekNumber": "82292838",
            "saldo": 0
        },
        {
            "_id": "625ba088c746d26d66867950",
            "email": "testMamang@mail.com",
            "phoneNumber": "0822123456",
            "name": "testingMamang",
            "gender": "male",
            "address": {
                "type": "Point",
                "coordinates": [
                    107.01118835699735,
                    -6.269429087104287
                ]
            },
            "image": "https://i1.sndcdn.com/avatars-000009789474-uztegm-t500x500.jpg",
            "rekNumber": "82292838",
            "saldo": 0
        },
        {
            "_id": "625e7e175638c70a81809acf",
            "email": "testMamang@mail.com",
            "phoneNumber": "0822123456",
            "name": "testingMamang",
            "gender": "male",
            "address": {
                "type": "Point",
                "coordinates": [
                    107.01118835699735,
                    -6.269429087104287
                ]
            },
            "image": "https://i1.sndcdn.com/avatars-000009789474-uztegm-t500x500.jpg",
            "rekNumber": "82292838",
            "saldo": 0
        }
    ]
    return listMamangs
}

module.exports = listMamang