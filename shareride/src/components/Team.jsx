// import Header from "./Header";
import "./Team.css";

const Team = () => {
  return (
    <>
      {/* <Header /> */}
      <section className="team-section">
        <h2 className="team-title">Meet the Team Behind Share-Ride</h2>

        <p className="team-intro">
          <strong>Share-Ride</strong> is powered by a dedicated team committed
          to making your travel experience seamless and cost-effective. Get to
          know the people who make it all possible.
        </p>

        <div className="team-content">
          <div className="team-member">
            <h3 className="team-member-name">Prabhat Ranjan</h3>
            <p className="team-member-contact">
              <strong>Phone:</strong> +91 8709898186
            </p>
            <p className="team-member-contact">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:prabhatranjanguraru@gmail.com"
                className="team-member-link"
              >
                prabhatranjanguraru@gmail.com
              </a>
            </p>
          </div>

          <div className="team-member">
            <h3 className="team-member-name">Gaurav Kumar</h3>
            <p className="team-member-contact">
              <strong>Phone:</strong> +91 8529137373
            </p>
            <p className="team-member-contact">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:gaurav.nit.agartala.653@gmail.com"
                className="team-member-link"
              >
                gaurav.nit.agartala.653@gmail.com
              </a>
            </p>
          </div>

          <div className="team-member">
            <h3 className="team-member-name">Duke Saurabh</h3>
            <p className="team-member-contact">
              <strong>Phone:</strong> +91 9798634484
            </p>
            <p className="team-member-contact">
              <strong>Email:</strong>{" "}
              <a href="mailto:ds8123495@gmail.com" className="team-member-link">
                ds8123495@gmail.com
              </a>
            </p>
          </div>

          <div className="team-member">
            <h3 className="team-member-name">Vidya Sagar</h3>
            <p className="team-member-contact">
              <strong>Phone:</strong> +91 6201427621
            </p>
            <p className="team-member-contact">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:vidya9955297836@gmail.com"
                className="team-member-link"
              >
                vidya9955297836@gmail.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Team;
