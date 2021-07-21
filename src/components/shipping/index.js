import React from "react";

const Shipping = () => {
  return (
    <div className="row service-list">
      <div className="col-6 col-md-3">
        <div className="text-center shipping">
          <i className="fal fa-rocket-launch" /> <span> Free Delivery</span>
          <p>Orders above $1000</p>
        </div>
      </div>
      <div className="col-6 col-md-3">
        <div className="text-center shipping">
          <i className="far fa-credit-card" /> <span>Secure Payment</span>
          <img src="/img/payment_card.png" alt="card" />
        </div>
      </div>
      <div className="col-6 col-md-3">
        <div className="text-center shipping">
          <i className="fas fa-tags" /> <span>Lowest Price</span>
          <p>Best deals available</p>
        </div>
      </div>
      <div className="col-6 col-md-3">
        <div className="text-center shipping">
          <i className="fas fa-phone-alt" /> <span>24x7 Support</span>
          <p>Call @ +91-89898898</p>
        </div>
      </div>
    </div>
    // <div className="shipping-area section-space-top-100">
    //   <div className="container">
    //     <div className="shipping-bg">
    //       <div className="row shipping-wrap">
    //         <div className="col-lg-4 col-md-6">
    //           <div className="shipping-item">
    //             <div className="shipping-img">
    //               <img src="/img/shipping/icon/car.png" alt="Shipping Icon" />
    //             </div>
    //             <div className="shipping-content">
    //               <h2 className="title">Free Shipping</h2>
    //               <p className="short-desc mb-0">Capped at $319 per order</p>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="col-lg-4 col-md-6 mt-4 mt-md-0">
    //           <div className="shipping-item">
    //             <div className="shipping-img">
    //               <img src="/img/shipping/icon/card.png" alt="Shipping Icon" />
    //             </div>
    //             <div className="shipping-content">
    //               <h2 className="title">Safe Payment</h2>
    //               <p className="short-desc mb-0">With our payment gateway</p>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="col-lg-4 col-md-6 mt-4 mt-lg-0">
    //           <div className="shipping-item">
    //             <div className="shipping-img">
    //               <img
    //                 src="/img/shipping/icon/service.png"
    //                 alt="Shipping Icon"
    //               />
    //             </div>
    //             <div className="shipping-content">
    //               <h2 className="title">Best Services</h2>
    //               <p className="short-desc mb-0">
    //                 Friendly &amp; Supper Services
    //               </p>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};
export default Shipping;
