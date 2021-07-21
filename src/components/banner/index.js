import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Link from "next/link";

export default function Banner({ data }) {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      controls={false}
      indicators={true}
    >
      {data.map((item, index) => (
        <Carousel.Item key={item.id}>
          <img className="d-block w-100" src={item.img} alt={item.title} />
          {/* <Carousel.Caption>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <Link href={item.to}>
              <a>{item.buttonText}</a>
            </Link>
          </Carousel.Caption> */}
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
