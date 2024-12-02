import { useState } from "react";
import { useForm } from "react-hook-form";

export default function FormCirrose() {
  const [cirrhosisLevel, setCirrhosisLevel] = useState(null); // State for success message
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Function called when the form is submitted
  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/cadastrar-paciente/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // Display the personalized message with the patient's name
        const nomePaciente = result.content?.nome; // Access the patient's name
        setCirrhosisLevel(`${nomePaciente} has been successfully registered in the system.`);
      } else {
        // Display the error if any
        setCirrhosisLevel(result.error || "Unknown error.");
      }
    } catch (error) {
      console.error("Error registering patient:", error);
      setCirrhosisLevel("Error registering patient.");
    }
  };

  return (
    <div className="bg-telaInicial min-h-screen bg-no-repeat bg-cover bg-center bg-fixed flex items-center justify-start">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-white p-8 rounded-lg border border-gray-400 shadow-2xl m-4 ml-16 sm:max-w-sm md:max-w-md lg:max-w-lg"
      >
        <label className="text-2xl font-bold pt-10">Register patient</label>
        <div className="flex gap-8 flex-wrap pt-8">
          <input
            id="nome"
            placeholder="Full name*"
            {...register("nome", { required: "Name is required." })}
            className={`outline-none placeholder-gray-500 p-4 w-full border h-14 rounded border-gray-400 ${
              errors.nome ? "placeholder:text-red-500 border-red-500" : ""
            }`}
            type="text"
          />
          <input
            id="cpf"
            placeholder="SSN*"
            {...register("cpf", {
              required: "SSN is required.",
              pattern: {
                value: /^\d{11}$/,
                message: "Invalid CPF. It must have 11 digits.",
              },
            })}
            className={`outline-none placeholder-gray-500 p-4 w-full border h-14 rounded border-gray-400 text-sm ${
              errors.cpf ? "placeholder:text-red-500 border-red-500" : ""
            }`}
            type="text"
          />
          <input
            id="numero_contato"
            placeholder="Contact number*"
            {...register("numero_contato", {
              required: "Contact number is required.",
              pattern: {
                value: /^\d{2}\d{9}$/,
                message: "Invalid contact number. Use the format DDD9XXXXXXXX.",
              },
            })}
            className={`outline-none placeholder-gray-500 p-4 w-full border h-14 rounded border-gray-400 ${
              errors.numero_contato ? "placeholder:text-red-500 border-red-500" : ""
            }`}
            type="text"
          />
        </div>
        <div className="flex gap-8 flex-wrap pt-8">
          <input
            id="cep"
            placeholder="Postal code*"
            {...register("cep", {
              required: "Postal code is required.",
              pattern: {
                value: /^\d{8}$/, // Validation for 8-digit postal code
                message: "Invalid postal code. It must have 8 digits.",
              },
            })}
            className={`outline-none placeholder-gray-500 p-4 w-full border h-14 rounded border-gray-400 ${
              errors.cep ? "placeholder:text-red-500 border-red-500" : ""
            }`}
            type="text"
            inputMode="numeric" // Displays the numeric keyboard on mobile devices
            onInput={(e) => {
              // Remove any non-numeric characters
              e.target.value = e.target.value.replace(/\D/g, "");
            }}
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="flex justify-center w-32 h-10 bg-azulEscuro hover:bg-laranjaFont text-white font-bold rounded mt-4 py-2"
          >
            Register
          </button>
        </div>

        {/* Display the success message after submission */}
        {cirrhosisLevel && (
          <p className="text-left text-lg text-red-800 font-semibold mt-4">
            {cirrhosisLevel}
          </p>
        )}

        {/* Display error messages */}
        {/* Display error messages */}
        <div className="mt-4">
          {errors.cpf && <p className="text-red-500 text-sm">{errors.cpf.message}</p>}
          {errors.numero_contato && (
            <p className="text-red-500 text-sm">{errors.numero_contato.message}</p>
          )}
          {errors.cep && <p className="text-red-500 text-sm">{errors.cep.message}</p>}
        </div>  
      </form>
    </div>
  );
}
