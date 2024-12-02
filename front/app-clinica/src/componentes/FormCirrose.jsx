import { useState } from "react";
import { useForm } from "react-hook-form";

export default function FormCirrose() {
  const [cirrhosisLevel, setCirrhosisLevel] = useState(null); // Estado para a mensagem
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const requestData = {
      nome: data.name, // Nome do paciente
      cpf: data.cpf,   // CPF do paciente
      idade: parseInt(data.age, 10),
      colesterol: parseFloat(data.colesterol),
      sexo: data.sex === "Masculino" ? "M" : "F",
      ascites: data.ascites === "Sim" ? "S" : "N",
      hepatomegalia: data.hepatomegalia === "Sim" ? "S" : "N",
      spiders: data.spiders === "Sim" ? "S" : "N",
      edema: data.edema === "Sim" ? "S" : "N",
    };
  
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/predict-cirrhosis/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );
  
      if (!response.ok) {
        throw new Error("Erro ao comunicar com o backend");
      }
  
      const responseData = await response.json();
  
      // Atualizar o estado com a resposta do backend
      setCirrhosisLevel(responseData.resultado);
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
      setCirrhosisLevel("Erro ao calcular o nível de cirrose.");
    }
  };
  
  return (
   <div className="bg-figado-dolorido min-h-screen bg-no-repeat bg-cover bg-center bg-fixed flex items-start justify-start">
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="w-full max-w-lg bg-white p-8 border border-gray-400 rounded-lg shadow-md m-4 ml-16 sm:max-w-sm md:max-w-md lg:max-w-lg"
  >
 
    <label className="text-2xl font-bold mt-4 block">Cirrhosis Level</label>
   
    <div className="flex gap-8 flex-wrap pt-8">
    <input
      id="nome"
      placeholder="Say the patient's name*"
      {...register("nome", { required: "Name required" })}
      className={`outline-none placeholder-gray-500 p-4 w-full border h-14 rounded border-gray-400 ${
        errors.nome ? "placeholder:text-red-500 border-red-500" : ""
      }`}
      type="text"
    />
    {errors.nome && <p className="text-red-500">{errors.nome.message}</p>}

    <input
      id="cpf"
      placeholder="Say the patient's SSN*"
      {...register("cpf", {
        required: "SSN is required",
        pattern: {
          value: /^\d{11}$/,
          message: "Enter patient's SSN (11 digits)*",
        },
      })}
      className={`outline-none placeholder-gray-500 p-4 w-full border h-14 rounded border-gray-400 text-sm ${
        errors.cpf ? "placeholder:text-red-500 border-red-500" : ""
      }`}
      type="text"
    />
    {errors.cpf && <p className="text-red-500">{errors.cpf.message}</p>}
    <input
      id="age"
      placeholder="Say the patient's age*"
      {...register("age", { required: "Age is required" })}
      className={`outline-none placeholder-gray-500 p-4 w-full border h-14 rounded border-gray-400 ${
        errors.age ? "placeholder:text-red-500 border-red-500" : ""
      }`}
      type="text"
      inputMode="numeric" // Exibe o teclado numérico nos dispositivos móveis
      onInput={(e) => {
        // Remove qualquer caractere não numérico
        e.target.value = e.target.value.replace(/\D/g, '');
      }}
    />
    {errors.age && <p className="text-red-500">{errors.age.message}</p>}

      
    <select
      id="sex"
      {...register("sex", { required: "Selection is required" })}
      className={`outline-none placeholder-gray-500 p-4 w-full border h-14 rounded border-gray-400 text-sm ${
        errors.sex ? "border-red-500" : ""
      }`}
    >
      <option value="">Select sex</option>
      <option value="Masculino">Male</option>
      <option value="Feminino">Female</option>
    </select>
    {errors.sex && <p className="text-red-500">{errors.sex.message}</p>}

    <label className="text-2xl pt-2">Clinical details</label>

    <input
      id="colesterol"
      placeholder="Say the patient's cholesterol*"
      {...register("colesterol", {
        required: "Cholesterol level is required.",
        pattern: {
          value: /^[0-9]+(\.[0-9]{1,2})?$/,  // Allow numbers with up to two decimals
          message: "Enter a valid cholesterol value.",
        },
      })}
      className={`outline-none placeholder-gray-500 p-4 w-full border h-14 rounded border-gray-400 text-sm ${
        errors.colesterol ? "placeholder:text-red-500 border-red-500" : ""
      }`}
      type="text"
      inputMode="numeric" // Exibe o teclado numérico nos dispositivos móveis
      onInput={(e) => {
        e.target.value = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
      }}
    />
    {errors.colesterol && <p className="text-red-500">{errors.colesterol.message}</p>}


      <select
        id="ascites"
        {...register("ascites", { required: "Ascites is required" })}
        className={`outline-none placeholder-gray-500 p-4 w-full border h-14 rounded border-gray-400 text-sm ${
          errors.ascites ? "border-red-500" : ""
        }`}
      >
        <option value="">Say the patient's ascites</option>
        <option value="Sim">Yes</option>
        <option value="Não">No</option>
      </select>
      {errors.ascites && <p className="text-red-500">{errors.ascites.message}</p>}

    <select
      id="hepatomegalia"
      {...register("hepatomegalia", { required: "Hepatomegalia is required" })}
      className={`outline-none placeholder-gray-500 p-4 w-full border h-14 rounded border-gray-400 text-sm ${
        errors.hepatomegalia ? "border-red-500" : ""
      }`}
    >
      <option value="">Say the patient's hepatomegalia</option>
      <option value="Masculino">Yes</option>
      <option value="Feminino">No</option>
    </select>
    {errors.hepatomegalia && <p className="text-red-500">{errors.hepatomegalia.message}</p>}

    <select
      id="spiders"
      {...register("spiders", { required: "Spiders is required" })}
      className={`outline-none placeholder-gray-500 p-4 w-full border h-14 rounded border-gray-400 text-sm ${
        errors.spiders ? "border-red-500" : ""
      }`}
    >
      <option value="">Say the patient's spiders</option>
      <option value="Sim">Yes</option>
      <option value="Não">No</option>
    </select>
    {errors.spiders && <p className="text-red-500">{errors.spiders.message}</p>}
  
  

    
    <select
      id="edema"
      {...register("edema", { required: "Edema is required" })}
      className={`outline-none placeholder-gray-500 p-4 w-full border h-14 rounded border-gray-400 text-sm ${
        errors.edema ? "border-red-500" : ""
      }`}
    >
      <option value="">Say the patient's edema</option>
      <option value="Sim">Yes</option>
      <option value="Não">No</option>
    </select>
    {errors.edema && <p className="text-red-500 mt-6">{errors.edema.message}</p>}
    </div>

    <div className="flex justify-center mt-6 flex-col items-center">
      <button
        type="submit"
        className="w-32 h-10 bg-azulEscuro hover:bg-laranjaFont text-white font-bold rounded"
      >
        Check
      </button>

      {cirrhosisLevel && (
        <p className="text-center text-lg text-red-800 font-semibold mt-4">
          {cirrhosisLevel}
        </p>
      )}
    </div>

  </form>
  
</div>

  );
}
