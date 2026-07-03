import "./Greeting.css";

export default function Greeting({ user }) {
  return (
    <section className="greeting">
      <p className="subtitle">
        GOOD MORNING, {user.firstName.toUpperCase()}
      </p>

      <h2>Your crops are thriving today.</h2>
    </section>
  );
}