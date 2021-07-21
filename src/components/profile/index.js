import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/client";
// import { OverlayTrigger, Popover } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import PopoverBody from "react-bootstrap/PopoverBody";
import PopoverHeader from "react-bootstrap/PopoverHeader";

function Profile() {
  const [session, loading] = useSession();
  return session ? (
    <OverlayTrigger
      trigger="click"
      key="bottom"
      placement="bottom"
      rootClose={true}
      overlay={
        <Popover id="popover-basic">
          <PopoverHeader style={{ textAlign: "center" }}>
            {session.user.name}
          </PopoverHeader>
          <PopoverBody>
            <ul className="profile-buttons">
              <li>
                <Link href="/user/account">
                  <a className="btn btn-outline-dark btn-sm">My Account</a>
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => signOut()}
                >
                  Sign Out
                </button>
              </li>
            </ul>
          </PopoverBody>
        </Popover>
      }
    >
      <img
        src={session.user.image}
        alt={session.user.name}
        style={{
          width: "28px",
          borderRadius: "50%",
          cursor: "pointer",
        }}
      />
    </OverlayTrigger>
  ) : (
    !loading && (
      <Link href="/auth/signin">
        <a className="btn btn-outline-dark btn-sm">Sign In</a>
      </Link>
    )
  );
}

export default Profile;
