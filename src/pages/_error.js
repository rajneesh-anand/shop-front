
import Link from "next/link";

function Error({ statusCode }) {
  return (
    <>
      {statusCode ? (
        <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 w-100 text-center error-card">
          <div className="w-100">
            <h1
              className={`${
                statusCode === 404 ? "text-warning" : "text-danger"
              } display-1 mb-0 font-weight-bolder`}
            >
              ERROR {statusCode}
            </h1>
            <h6 className="mt-0 mb-2 text-body">
              Sorry, nothing found here !
            </h6>
            <Link href="/" as={`${process.env.baseUrl}`}>
              <button>Go back home</button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 w-100 text-center error-card">
          <div className="w-100">
            <h1
              className={`${
                statusCode === 404 ? "text-warning" : "text-danger"
              } display-1 mb-0 font-weight-bolder`}
            >
              ERROR {statusCode}
            </h1>
            <h6 className="mt-0 mb-2 text-body">
              Oops ! An unexpected error has occurred
            </h6>
            <Link href="/" as={`${process.env.baseUrl}`}>
               <button>Go back home</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
