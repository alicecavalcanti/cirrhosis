import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const trocarTela = () => navigate("/cirrhosis-level");
  const trocarParaTelaCadastro = () => navigate("/patient-registration");
  return (
    <div className="bg-telaInicial min-h-screen bg-no-repeat bg-cover bg-center bg-fixed sm:max-w-full md:max-w-5xl lg:max-w-6xl xl:max-w-full">
      <div className="w-3/6 flex flex-col h-screen ml-24 justify-center text-laranjaFont gap-4 font-bold font-poppins">
        <h1 className="text-6xl sm:text-4xl md:text-5xl xm:text-4xl">
          Cirrhosis Clinic
        </h1>
        <p className="text-2xl sm:text-xl xm:text-xl text-CinzaFont w-3/5">
          Early detection saves lives: Understand your liver health today and
          take control of your future.
        </p>
        <div className="flex gap-6 xm:flex-col pt-8">
          <button
            onClick={trocarTela}
            className="bg-azulEscuro px-6 py-2 hover:bg-laranjaFont  rounded-lg w-1/4 items-center text-white text-sm hover:bg-verdeFont ease-linear duration-300 sm:px-12 sm:py-4 sm:text-base xm:w-full xm:px-8 xm:py-4 xm:text-base md:px-4 md:py-2"
          >
            Check Cirrhosis Level
          </button>
          <button
            onClick={trocarParaTelaCadastro}
            className="bg-azulEscuro px-6 py-2 hover:bg-laranjaFont  rounded-lg w-1/4 items-center text-white text-sm hover:bg-verdeFont ease-linear duration-300 sm:px-12 sm:py-4 sm:text-base xm:w-full xm:px-8 xm:py-4 xm:text-base md:px-4 md:py-2"
          >
            Register Patient
          </button>
        </div>
      </div>
    </div>

  );
}