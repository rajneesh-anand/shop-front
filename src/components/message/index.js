import Link from "next/link";
import { MessageBox, MessageTitle, AnchorButton } from "../messagebox";

const Message = ({ title, url, btnText }) => {
  return (
    <MessageBox>
      <MessageTitle>{title}</MessageTitle>
      <Link href={url}>
        <AnchorButton>{btnText}</AnchorButton>
      </Link>
    </MessageBox>
  );
};

export default Message;
