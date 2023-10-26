import logo from "../../assets/logo.png";

const Home = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <img src={logo} alt="Tontine Logo" className="animate-pulse" />
    </div>
  );
};

export default Home;
