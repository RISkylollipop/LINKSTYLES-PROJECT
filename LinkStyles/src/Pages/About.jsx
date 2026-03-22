import { useNavigate } from "react-router-dom";
import styles from "./about.module.css";

const values = [
  {
    icon: "🛍️",
    name: "Multi-Vendor Freedom",
    desc: "We empower independent merchants to set up shop, reach customers, and grow their business on their own terms.",
  },
  {
    icon: "🔒",
    name: "Secure Payments",
    desc: "Every transaction is protected. We integrate trusted payment gateways so buyers and sellers transact with confidence.",
  },
  {
    icon: "🚀",
    name: "Built for Africa",
    desc: "Designed from the ground up with the Nigerian and African market in mind — local payment options, local experience.",
  },
  {
    icon: "🤝",
    name: "Seller First",
    desc: "Our tools are built to help merchants succeed — from product listings to order management and real-time analytics.",
  },
];

const team = [
  { name: "Yunus Oluwadamilare kelani", role: "Founder & Engineer" },
  { name: "Olamide Ifeoluwa", role: "Customer Success" },
  { name: "Ololade Eniola", role: "Delivery & Ops" },
];

function About() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <p className={styles.heroLabel}>About Linkstyles</p>
        <h1 className={styles.heroTitle}>
          Shop More.
          <span>Style Better.</span>
        </h1>
        <p className={styles.heroSub}>
          Linkstyles is a multi-vendor marketplace connecting buyers with
          the best fashion merchants across Nigeria — fast, secure, and built
          for the way Africans shop.
        </p>
        <div className={styles.heroBadge}>
          Est.<br />2025<br />🇳🇬
        </div>
      </section>

      {/* STATS */}
      <section className={styles.stats}>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>500+</div>
          <div className={styles.statLabel}>Active Merchants</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>12k+</div>
          <div className={styles.statLabel}>Products Listed</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>98%</div>
          <div className={styles.statLabel}>Customer Satisfaction</div>
        </div>
      </section>

      {/* MISSION */}
      <section className={styles.mission}>
        <div className={styles.missionLeft}>
          <p className={styles.sectionLabel}>Our Mission</p>
          <h2 className={styles.missionTitle}>
            Democratizing commerce, one vendor at a time.
          </h2>
          <p className={styles.missionText}>
            We started Linkstyles because great products were stuck in local markets,
            invisible to buyers who would have loved them. Our platform breaks that wall.
          </p>
          <p className={styles.missionText}>
            Whether you're a fashion designer in Kano or a buyer in Lagos, Linkstyles
            is your bridge to seamless, trustworthy commerce.
          </p>
        </div>
        <div className={styles.missionRight}>
          <p className={styles.sectionLabel}>Our Vision</p>
          <h2 className={styles.missionTitle}>
            Africa's most trusted fashion marketplace.
          </h2>
          <p className={styles.missionText}>
            We're building the infrastructure for the next generation of African
            e-commerce — where every seller has enterprise-level tools and every
            buyer shops with confidence.
          </p>
          <p className={styles.missionText}>
            From discovery to doorstep, Linkstyles is redefining what it means
            to shop African fashion online.
          </p>
        </div>
      </section>

      {/* VALUES */}
      <section className={styles.values}>
        <p className={styles.sectionLabel}>What We Stand For</p>
        <h2 className={styles.valuesTitle}>Our Core Values</h2>
        <div className={styles.valuesGrid}>
          {values.map((v) => (
            <div key={v.name} className={styles.valueCard}>
              <span className={styles.valueIcon}>{v.icon}</span>
              <div className={styles.valueName}>{v.name}</div>
              <p className={styles.valueDesc}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section className={styles.team}>
        <p className={styles.sectionLabel}>The People</p>
        <h2 className={styles.teamTitle}>Meet the Team</h2>
        <div className={styles.teamGrid}>
          {team.map((member) => (
            <div key={member.name} className={styles.teamCard}>
              <div className={styles.teamAvatar}>
                {member.name[0]}
              </div>
              <div className={styles.teamName}>{member.name}</div>
              <div className={styles.teamRole}>{member.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.ctaBg} />
        <h2 className={styles.ctaTitle}>Ready to explore?</h2>
        <p className={styles.ctaSub}>
          Join thousands of shoppers and merchants already on Linkstyles.
        </p>
        <div className={styles.ctaButtons}>
          <button className={styles.btnPrimary} onClick={() => navigate("/clothes")}>
            Start Shopping
          </button>
          <button className={styles.btnOutline} onClick={() => navigate("/register")}>
            Become a Seller
          </button>
        </div>
      </section>

    </div>
  );
}

export default About;