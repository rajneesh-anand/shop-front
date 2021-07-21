import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const {
    order_number,
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
    payment_id,
  } = req.body;

  try {
    const result = await prisma.orders.create({
      data: {
        OrderNumber: order_number,
        Name: name,
        Email: email,
        Contact: contact,
        Address: JSON.stringify(address),
        Amount: JSON.parse(amount),
        Tax: JSON.parse(tax),
        ShippingCharge: JSON.parse(shipping),
        TotalProducts: total_products,
        TotalAmount: JSON.parse(total_amount),
        ProductDetails: JSON.stringify(product_details),
        PaymentID: payment_id,
      },
    });
    return res.status(200).json({
      msg: "success",
      data: result,
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
