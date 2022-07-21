import home from "@assets/home.jpg";

export default function Home() {
  return (
    <header className="App-header">
      <p>
        Gagner dans l'arrogance,
        <br />
        Perdre dans la mauvaise foi&nbsp;!
      </p>
      <img src={home} alt="This is BloodBowl !" />
      <span>Et en plus, ici, on va te prendre toute ta thune !</span>
    </header>
  );
}
