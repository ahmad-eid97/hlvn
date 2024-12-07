import Link from "next/link";

function Footer() {
    return (
        <footer className="footer">
          <div className="box">
          <div className="topLinks">
                <div className="groupLinks">
                    <Link href="##">Voluptates repudiandae</Link>
                    <Link href="##">Lorem ipsum </Link>
                </div>
                <svg width="208" height="54" viewBox="0 0 208 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.0371094" y="0.375" width="207.927" height="53" rx="26.5" fill="#BCE9FB" />
                    <path
                        d="M74.0016 21.7045C73.4287 21.7045 72.9055 21.5649 72.432 21.2855C71.9585 21.0014 71.5797 20.6226 71.2956 20.1491C71.0163 19.6757 70.8766 19.1525 70.8766 18.5795C70.8766 18.0019 71.0163 17.4787 71.2956 17.0099C71.5797 16.5365 71.9585 16.16 72.432 15.8807C72.9055 15.5966 73.4287 15.4545 74.0016 15.4545C74.5792 15.4545 75.1025 15.5966 75.5712 15.8807C76.0447 16.16 76.4211 16.5365 76.7005 17.0099C76.9846 17.4787 77.1266 18.0019 77.1266 18.5795C77.1266 19.1525 76.9846 19.6757 76.7005 20.1491C76.4211 20.6226 76.0447 21.0014 75.5712 21.2855C75.1025 21.5649 74.5792 21.7045 74.0016 21.7045Z"
                        fill="#078DC2"
                    />
                    <path
                        d="M74.4718 34.375V19.8295H77.1067V25.9872H83.8468V19.8295H86.4888V34.375H83.8468V28.196H77.1067V34.375H74.4718ZM89.3546 34.375V19.8295H91.9895V32.1662H98.3958V34.375H89.3546ZM101.125 19.8295L104.91 31.2784H105.059L108.838 19.8295H111.736L106.608 34.375H103.355L98.2342 19.8295H101.125ZM125.605 19.8295V34.375H123.261L116.407 24.4673H116.286V34.375H113.651V19.8295H116.009L122.856 29.7443H122.984V19.8295H125.605Z"
                        fill="#078DC2"
                    />
                </svg>
                <div className="groupLinks">
                    <Link href="##">Nullam justo enim</Link>
                    <Link href="##">Voluptates repudiandae</Link>
                </div>
            </div>
            <div className="bottomLinks">
              <div className="copy">
              © Copyright 2024 HLVN
              </div>
              <div className="bl">
                <Link href="##">Voluptates</Link>
                <Link href="##">Repudiandae</Link>
                <Link href="##">Lorem dolor</Link>
                <Link href="##">Voluptates</Link>
              </div>
            </div>
          </div>
        </footer>
    );
}

export default Footer;
