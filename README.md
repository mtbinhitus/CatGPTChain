# CatGPTChain - A simple cryptocurrency implementation
Thông tin cá nhân:
- MSSV: 1753030
- Họ Tên: Mai Thanh Bình
- 1 Link demo sản phẩm: https://drive.google.com/file/d/10brYxDs9nTzvBNXOyn82KjW0RsmUII0I/view?usp=sharing

## How to run the app
- Mở terminal/cmd/powershell thực hiện clone project:
```
git clone  https://github.com/mtbinhitus/CatGPTChain.git
```

**1. Backend**
- Mở terminal/cmd/powershell tại thư mục ``server``:
- Cài đặt dependencies:
```
npm install
```
- Chạy server:
```
npm run start
```
![image](https://github.com/mtbinhitus/CatGPTChain/assets/57026807/ee9e2dd1-d2be-4517-bf2e-4ed3fce18380)

- Chạy nhiều node:
```
node app.js -p 3001 --name 1
node app.js -p 3002 --name 2 --peers http://localhost:3001
```
![image](https://github.com/mtbinhitus/CatGPTChain/assets/57026807/441a97d3-b160-426a-aeca-e27ff860d2ba)
![image](https://github.com/mtbinhitus/CatGPTChain/assets/57026807/3ac62df5-0052-4142-aba3-e23793be00d2)


- Truy cập swagger API
``
http://localhost:3001/api-docs/
``
![image](https://github.com/mtbinhitus/CatGPTChain/assets/57026807/77382357-71f3-4a47-bfef-cde95851cfb8)
![image](https://github.com/mtbinhitus/CatGPTChain/assets/57026807/158b927e-12db-484b-81ca-9f29c99b3428)

**2. Frontend**
- Mở terminal/cmd/powershell tại thư mục ``client-react``:
- Cài đặt dependencies:
```
npm install
```
- Chạy client:
```
npm run start
```
- Truy cập Client:
``
http://localhost:3000/
``

**CatGPT Explorer**

![image](https://github.com/mtbinhitus/CatGPTChain/assets/57026807/2cac0041-003c-4f20-956d-2625594265bb)

![image](https://github.com/mtbinhitus/CatGPTChain/assets/57026807/3e2a9f07-8f89-4a78-b5b9-b6a9e9a412b1)

![image](https://github.com/mtbinhitus/CatGPTChain/assets/57026807/c26fd8ff-b4be-4f4f-9631-e3f0ec72033d)

**CatGPT Wallet**

![image](https://github.com/mtbinhitus/CatGPTChain/assets/57026807/3833240a-9e38-44dd-b686-e524e05b3f05)

![image](https://github.com/mtbinhitus/CatGPTChain/assets/57026807/90e5612b-085c-4d60-b3be-b0d18b2112dc)

![image](https://github.com/mtbinhitus/CatGPTChain/assets/57026807/becd75fe-2269-43dc-b4e0-1ec4882f670a)

![image](https://github.com/mtbinhitus/CatGPTChain/assets/57026807/2010590f-3dc1-4393-9e51-07b304f89ef1)

## Tài liệu tham khảo
1. Blockchain Implement Logic: https://github.com/conradoqg/naivecoin
2. UI & CSS: https://react.dev/ & https://tailwindcss.com/
3. Wiki Bitcoin: https://en.bitcoin.it/wiki/Mining#Reward
4. Naivecoin: https://lhartikk.github.io/
5. P2P Blockchain Network: https://medium.com/coinmonks/part-4-implementing-blockchain-and-cryptocurrency-with-pow-consensus-algorithm-9201eb7e8a41
