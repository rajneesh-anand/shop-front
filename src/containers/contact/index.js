import ContactForm from "../../components/contact-form";
import ContactInfo from "../../components/contact-info";
import ContactData from "../../data/global/contact.json";

const ContactContainer = () => {
  return (
    <div className="blog-area blog-masonry-area">
      <div className="contact-area">
        <div className="container">
          {/* <div className="row">
            <div className="col-lg-12 col-xl-10 m-auto">
              <div className="contact-info-content">
                {ContactData &&
                  ContactData.map((single, key) => {
                    return <ContactInfo data={single} key={key} />;
                  })}
              </div>
            </div>
          </div> */}
          <div className="row">
            <div className="col-lg-12 col-xl-10 m-auto">
              <div className="contact-form">
                <div className="text-center" data-aos="fade-up">
                  <h2 className="title">How caw we help you ?</h2>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactContainer;
