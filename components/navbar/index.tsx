import { FunctionComponent } from "react";
import Link from "next/link";
import { useAccount, useNetwork } from "../../hooks/index";

const Navbar: FunctionComponent = () => {
  const {
    account: { data: accountData, connect, isInstalled },
  } = useAccount();

  const { network } = useNetwork();

  const connectHandler = () => {
    if (isInstalled) {
      connect();
    } else {
      window.open("https://metamask.io", "_blank");
    }
  };

  const shortenAccount = (accData: string) => {
    return `0x${accData[3]}${accData[4]}${accData[5]}.....${accData.slice(-4)}`;
  };

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href={"/items/create"}>Create Item</Link>
            </li>
            <li>
              <Link href={"/profile"}>My Items</Link>
            </li>
            <li>
              <Link href={"/about"}>About</Link>
            </li>
          </ul>
        </div>
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
      </div>
      <div className="navbar-center btn btn-ghost">
        <Link href={"/"} className="text-xl capitalize">
          eth-marketplace
        </Link>
      </div>
      <div className="navbar-end">
        {accountData?.address ? (
          <div
            className="flex items-center justify-center lowercase btn btn-ghost dropdown dropdown-left dropdown-hover"
            tabIndex={10}
          >
            <span>{shortenAccount(accountData?.address as string)}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="35px"
              height="35px"
              viewBox="0 0 256 417"
              version="1.1"
              preserveAspectRatio="xMidYMid"
            >
              <g>
                <polygon
                  fill="#002B3D"
                  points="127.9611 0 125.1661 9.5 125.1661 285.168 127.9611 287.958 255.9231 212.32"
                />
                <polygon
                  fill="#B3ccF5"
                  points="127.962 0 0 212.32 127.962 287.959 127.962 154.158"
                />
                <polygon
                  fill="#002B3D"
                  points="127.9611 312.1866 126.3861 314.1066 126.3861 412.3056 127.9611 416.9066 255.9991 236.5866"
                />
                <polygon
                  fill="#B3ccF5"
                  points="127.962 416.9052 127.962 312.1852 0 236.5852"
                />
                <polygon
                  fill="#00202e"
                  points="127.9611 287.9577 255.9211 212.3207 127.9611 154.1587"
                />
                <polygon
                  fill="#8eb4f0"
                  points="0.0009 212.3208 127.9609 287.9578 127.9609 154.1588"
                />
              </g>
            </svg>
            <ul
              tabIndex={10}
              className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li
                onClick={() => copyToClipboard(accountData?.address as string)}
              >
                <div className="shadow stat">
                  <div className="stat-title">account</div>
                  <div className="text-xs stat-value">
                    {shortenAccount(accountData?.address as string)}
                  </div>
                  <div className="stat-desc">copy to clipboard</div>
                </div>
              </li>

              <li onClick={() => copyToClipboard(network.data as string)}>
                <div className="shadow stat">
                  <div className="stat-title">Network</div>
                  <div className="text-xs stat-value">{network.data}</div>
                  <div className="stat-desc">copy to clipboard</div>
                </div>
              </li>

              <li
                onClick={() => copyToClipboard(accountData?.balance as string)}
              >
                <div className="shadow stat">
                  <div className="stat-title">Balance</div>
                  <div className="text-xs uppercase stat-value">
                    {accountData?.balance} eth
                  </div>
                  <div className="stat-desc">copy to clipboard</div>
                </div>
              </li>
            </ul>
          </div>
        ) : (
          <div
            className="btn btn-ghost text-secondary"
            onClick={connectHandler}
          >
            connect
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
