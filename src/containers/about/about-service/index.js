import Link from "next/link";
import AboutData from "../../../data/global/about.json";

const AboutService = () => {
  return (
    <div className="service-area">
      <div className="container">
        <div className="row">
          <div
            className="col-lg-8 col-xl-8 mb-sm-50 mb-md-70"
            data-aos="fade-up"
          >
            <h2 className="title">{AboutData[0].title}</h2>
            <p
              dangerouslySetInnerHTML={{
                __html: AboutData[0].excerpt,
              }}
            />
          </div>
          <div
            className="col-lg-4 col-xl-3 offset-xl-1"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <h2 className="title">{AboutData[1].title}</h2>
            <ul>
              {AboutData[1].pagelinkText &&
                AboutData[1].pagelinkText.map((single, key) => {
                  return (
                    <li key={key}>
                      <Link href={process.env.PUBLIC_URL + "/"}>
                        <a>{single}</a>
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutService;
