import Link from "next/link";

import { containsObject, flatDeep, slugify } from "../../../utils";

const BlogTag = ({ tags }) => {
  console.log(tags);
  // const tags = BlogData.map((item) => {
  //   return item.tags;
  // });
  let singleTagArray = flatDeep(tags);
  let allTags = [];
  singleTagArray.forEach((tag) => {
    const obj = {
      title: tag.trim(),
      slug: slugify(tag),
    };
    const objIndex = containsObject(obj, allTags);
    if (objIndex !== -1) {
      allTags[objIndex] = {
        title: tag.trim(),
        slug: slugify(tag),
      };
    } else {
      allTags.push(obj);
    }
  });
  return (
    <div className="widget-tags">
      <span>Tags:</span>
      {allTags.map((tag, i) => {
        return (
          <div key={i} style={{ margin: "0px 6px" }}>
            {tag.title}
            {i !== allTags.length - 1 && " "}
          </div>
        );
      })}
    </div>
  );
};

export default BlogTag;
