const https = require("https");
const PaytmChecksum = require("../../../paytm/cheksum");
const PaytmConfig = require("../../../paytm/config");
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const {
    name,
    email,
    contact,
    address,
    total_products,
    amount,
    tax,
    shipping,
    total_amount,
    product_details,
  } = req.body;
  var txnToken;
  var orderDate = new Date();
  var orderId = `POID${orderDate.getFullYear()}${
    orderDate.getMonth() + 1
  }${orderDate.getDate()}${Math.floor(Math.random(4) * 100000)}`;

  const paytmParams = {};

  paytmParams.body = {
    requestType: "Payment",
    mid: PaytmConfig.PaytmConfig.mid,
    websiteName: PaytmConfig.PaytmConfig.website,
    orderId: orderId,
    callbackUrl: "https://gulshan.vercel.app/checkout",
    txnAmount: {
      value: total_amount,
      currency: "INR",
    },
    userInfo: {
      custId: email,
      mobile: contact,
    },
  };

  PaytmChecksum.generateSignature(
    JSON.stringify(paytmParams.body),
    PaytmConfig.PaytmConfig.key
  ).then(function (checksum) {
    paytmParams.head = {
      signature: checksum,
    };

    var post_data = JSON.stringify(paytmParams);

    var options = {
      // // for Staging
      // hostname: "securegw-stage.paytm.in",

      //for Production
      hostname: "securegw.paytm.in",

      port: 443,
      path: `/theia/api/v1/initiateTransaction?mid=${PaytmConfig.PaytmConfig.mid}&orderId=${orderId}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": post_data.length,
      },
    };

    var response = "";
    var post_req = https.request(options, function (post_res) {
      post_res.on("data", function (chunk) {
        response += chunk;
      });

      post_res.on("end", function () {
        response = JSON.parse(response);
        console.log(response);
        txnToken = response.body.txnToken;
        saveDataToDatabase(txnToken);
      });
    });

    post_req.write(post_data);
    post_req.end();
  });

  function saveDataToDatabase(token) {
    console.log(`token - ${token}`);
    try {
      const result = await prisma.orders.create({
        data: {
          OrderNumber: orderId,
          Name: name,
          Email: email,
          Contact: contact,
          Address: address,
          Amount: JSON.parse(amount),
          Tax: JSON.parse(tax),
          ShippingCharge: JSON.parse(shipping),
          TotalProducts: total_products,
          TotalAmount: JSON.parse(total_amount),
          ProductDetails: product_details,
          PaymentStatus: "Pending",
          OrderStatus: "Pending",
          customer: { connect: { email: email } },
        },
      });
      console.log(`txnToken -- ${token}`);
      return res.status(200).json({
        msg: "success",
        data: result,
        txnToken: token,
        orderId: orderId,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    } finally {
      async () => {
        await prisma.$disconnect();
      };
    }
  }
}
