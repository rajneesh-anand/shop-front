import React from "react";
import useMasonry from "../../hooks/use-masonry";
import ProductCard from "../../components/product-card";
import ProductFilter from "../../components/product-filter";
import { slugify } from "../../utils";

const ProductList = ({ data }) => {
  const { categories } = useMasonry(
    data,
    ".portfolio-list",
    ".masonry-grid",
    ".messonry-button",
    ".messonry-button button"
  );

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="messonry-button text-center mb-8">
            <ProductFilter categories={categories} />
          </div>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 portfolio-list mb-n30">
        <div className="col resizer"></div>
        {data &&
          data.map((item) => (
            <div
              key={item.id}
              className={`col masonry-grid mb-30 ${item.subCategories
                .map((cat) => slugify(cat))
                .join(" ")}`}
            >
              <ProductCard data={item} />
            </div>
          ))}
      </div>
    </>
  );
};

export default ProductList;
