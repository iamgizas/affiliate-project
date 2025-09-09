import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { userRegister } from "../../../services/api";
import Cookies from "js-cookie";

const schema = yup 
    .object({
        nome: yup
        .string()
        .required("Por favor, coloque um nome.")
        .min(3, "Coloque seu nome completo!"),
        email: yup
        .string()
        .required("Por favor, coloque um email.")
        .min(5, "O email precisa ter no mínimo 5 letras!")
        .email("Insira um email válido!"),
        cpf: yup
        .string()
        .required("Por favor, coloque um CPF.")
        .min(11, "O CPF precisa ter no mínimo 11 números!")
        .max(11, "O CPF precisa ter no máximo 11 números!"),
        telefone: yup
        .string()
        .required("Por favor, coloque um telefone.")
        .min(10, "O telefone precisa ter no mínimo 10 números!")
        .max(11, "O telefone precisa ter no máximo 11 números!"),
        senha: yup
        .string()
        .required("Por favor, coloque uma senha.")
        .min(7, "A senha precisa ter no mínimo 7 letras!"),
        confirmarSenha: yup
        .string()
        .required("Por favor, coloque uma senha.")
        .oneOf([yup.ref("senha"), null], "As senhas tem que ser iguais!"),
    })
    .required()

const UserRegister = () => {
    const [mostrarSenha, getMostrarSenha] = useState(false);
    const [mostrarConfirmarSenha, getMostrarConfirmarSenha] = useState(false);
    const [lembrarConta, setLembrarConta] = useState(false);
    
    const navigate = useNavigate();
    
    const { 
        register, 
        handleSubmit, 
        formState: {errors}, 
    } = useForm({
        resolver: yupResolver(schema),
    })

    async function onSubmit (data) {
        try {
            const { nome, email, cpf, telefone, senha } = data; 
            const role = data.role || "consumidor";

            const response = await userRegister(role, nome, email, cpf, telefone, senha);
            const result = await response.json();

            if (result.token) {
                Cookies.set("token", result.token, {
                    expires: lembrarConta ? 7 : null,
                    secure: true,
                    sameSite: "strict",
                });

                navigate("/");
            } else {
                console.log("Token not found.", result);
            }

        } catch (e) {
            console.log(e);
        }
    };

    return ( 
        <div>
            <div className="absolute top-1 left-1">            
                <Link
                className='bg-violet-700 text-zinc-200 flex m-5 p-5 text-center rounded-md hover:bg-violet-600/50
                 transition delay-300'
                to={{
                pathname: "/login"
                }}
                >
                    Voltar
                </Link>
            </div>

            <form className="bg-neutral-800/70 flex items-center justify-center h-screen" onSubmit={handleSubmit(onSubmit)}>                
                <div className="w-96 p-6 shadow-lg rounded-lg bg-white border-violet-700 border-4">
                    <h2 className="text-center font-semibold block text-3xl text-gray-800">
                        Crie sua Conta!
                    </h2>

                    <div className="grid mt-5">
                        <label htmlFor="afil-or-cons" className="flex mb-1 text-lg font-semibold">Você será um afiliado ou consumidor?</label>
                        <select name="role" id="role" 
                        className="p-1 w-36 block text-violet-700 border-2 border-violet-600 rounded-lg font-semibold">
                            <option value="afiliado" className="font-semibold">Afiliado</option>
                            <option value="consumidor" className="font-semibold">Consumidor</option>
                        </select>
                    </div>

                    <div className="mt-5">
                        <label htmlFor="register-name" className="text-gray-800 text-base font-medium mb-2 block" font-medium>
                            Nome
                        </label>
                        <input 
                        type="text" 
                        {...register("nome")} 
                        className="text-gray-800 bg-gray-300 border rounded-lg py-1 px-2 w-full text-base focus:outline-none focus:ring-0 focus:border-gray-700
                        hover:bg-gray-400/75 transition duration-300" 
                        />
                        <p role="alert" className="text-violet-700 font-medium">{errors.nome?.message}</p>
                    </div>

                    <div className="mt-5">
                        <label htmlFor="register-email" className="text-gray-800 text-base mb-2 block font-medium">
                            Email
                        </label>

                        <input 
                        type="text" 
                        {...register("email")}                
                        placeholder="Ex.: example@gmail.com"
                        className="text-gray-800 bg-gray-300 border rounded-lg py-1 px-2 w-full text-base focus:outline-none focus:ring-0 focus:border-gray-700
                        hover:bg-gray-400/75 transition duration-300" 
                        />
                        <p role="alert" className="text-violet-700 font-medium">{errors.email?.message}</p>
                    </div>

                    <div className="mt-5">
                        <label htmlFor="register-email" className="text-gray-800 text-base mb-2 block font-medium">
                            CPF
                        </label>

                        <input 
                        type="text" 
                        {...register("cpf")}
                        placeholder="Ex.: 123.456.789-01"
                        className="text-gray-800 bg-gray-300 border rounded-lg py-1 px-2 w-full text-base focus:outline-none focus:ring-0 focus:border-gray-700
                        hover:bg-gray-400/75 transition duration-300" 
                        />
                        <p role="alert" className="text-violet-700 font-medium">{errors.cpf?.message}</p>
                    </div>

                    <div className="mt-5">
                        <label htmlFor="register-email" className="text-gray-800 text-base mb-2 block font-medium">
                            Telefone
                        </label>

                        <input 
                        type="text" 
                        {...register("telefone")}
                        placeholder="Ex.: 12 34567-8901"
                        className="text-gray-800 bg-gray-300 border rounded-lg py-1 px-2 w-full text-base focus:outline-none focus:ring-0 focus:border-gray-700
                        hover:bg-gray-400/75 transition duration-300" 
                        />
                        <p role="alert" className="text-violet-700 font-medium">{errors.telefone?.message}</p>
                    </div>

                    <div className="mt-5">
                        <label htmlFor="register-password" className="text-gray-800 text-base font-medium mb-2 block">
                            Senha
                        </label>

                        <div className="relative">
                            <input 
                            type={mostrarSenha ? "text" : "password"} 
                            {...register("senha")}
                            className="text-gray-800 bg-gray-300 border rounded-lg py-1 px-2 w-full text-base focus:outline-none focus:ring-0 focus:border-gray-700
                            hover:bg-gray-400/75 transition duration-300 ease-in-out" 
                            />
                            <button
                            type="button"
                            onClick={() => getMostrarSenha((prev) => !prev)}
                            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-700"
                            >
                                {mostrarSenha ? <EyeOff /> : <Eye />}
                            </button>
                        </div>
                        <p role="alert" className="text-violet-700 font-medium">{errors.senha?.message}</p>
                    </div>
                    
                    <div className="mt-5">
                        <label htmlFor="register-confirm-password" className="text-gray-800 text-base font-medium mb-2 block">
                            Confirme sua Senha
                        </label>
                        <div className="relative">
                            <input 
                            type={mostrarConfirmarSenha ? "text" : "password"} 
                            {...register("confirmarSenha")} 
                            className="text-gray-800 bg-gray-300 border rounded-lg py-1 px-2 w-full text-base focus:outline-none focus:ring-0 focus:border-gray-700
                            hover:bg-gray-400/75 transition duration-300" 
                            />
                            <button
                            type="button"
                            onClick={() => getMostrarConfirmarSenha((prev) => !prev)}
                            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-700"
                            >
                                {mostrarConfirmarSenha ? <EyeOff /> : <Eye />}
                            </button>
                        </div>
                        <p role="alert" className="text-violet-700 font-medium">{errors.confirmarSenha?.message}</p>
                    </div>                

                    <label htmlFor="lembrar-conta" className="flex items-center gap-2 cursor-pointer mt-3">
                        <input 
                            type="checkbox" 
                            id="lembrar-conta"
                            checked={lembrarConta}
                            onChange={() => setLembrarConta(prev => !prev)}
                            className="peer hidden"
                        />

                        <div className="w-4 h-4 rounded border-2 border-violet-600 peer-checked:bg-violet-600 flex items-center justify-center">
                            <svg className="w-3 h-3 text-white hidden peer-checked:block" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>

                        <span className="text-base font-medium hover:cursor-pointer hover:font-bold">
                            Lembrar minha conta
                        </span>
                    </label>

                    <div>
                        <input
                        type="submit"  
                        value="Criar Conta"
                        onClick={userRegister}
                        className="mt-5 rounded-lg text-white border-2 border-violet-600 bg-violet-600 py-1 w-full 
                        hover:bg-transparent hover:text-violet-700 hover:font-semibold transition duration-500"                    
                        />                        
                            
                    </div>
                </div>
            </form>
        </div>   
    );
}

export default UserRegister;