import Preloader from "../assets/PingPongLoader.gif";

export default function PreLoader() {
  return (
    <>
      {/* Centered Ping Pong Loader . It will load until the data is fetched. */}
      <section className="preloader mt-20 flex justify-center">
        <img src={Preloader} alt="Ping Pong Animated Preloader" />
      </section>
    </>
  );
}
