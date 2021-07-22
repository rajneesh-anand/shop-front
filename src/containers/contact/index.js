import ContactForm from "../../components/contact-form";
import ContactInfo from "../../components/contact-info";
import ContactData from "../../data/global/contact.json";
import Link from "next/link";

const ContactContainer = () => {
  return (
    <>
      <div className="row">
        <div className="bread-crumbs">
          <Link href={process.env.PUBLIC_URL + "/"}>
            <a>home</a>
          </Link>
          <span> &#8250; </span>
          <span className="active">contact</span>
        </div>
      </div>
      <div className="row" style={{ marginTop: 24 }}>
        <div
          className="text-center"
          data-aos="fade-up"
          style={{
            marginBottom: 32,
            background: "#31144e",
            borderRadius: "5px",
          }}
        >
          <h3
            className="title"
            style={{ color: "white", marginTop: 8, fontSize: "20px" }}
          >
            How caw we help you ?
          </h3>
        </div>
        <div className="col-lg-4 col-xl-4 m-auto">
          <div className="contact-info-content">
            {ContactData &&
              ContactData.map((single, key) => {
                return <ContactInfo data={single} key={key} />;
              })}
          </div>
        </div>

        <div className="col-lg-8 col-xl-8 m-auto">
          <div className="contact-form">
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactContainer;
