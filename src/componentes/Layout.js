import RestartButton from "./Restart/Restart";

const Layout = () => {
  return (
    <div>
      <RestartButton onRestart={() => console.log("Reiniciar")} />
    </div>
  );
};

export default Layout;
