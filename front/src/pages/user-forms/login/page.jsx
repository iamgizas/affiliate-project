import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { userLogin } from "../../../services/api";
import Cookies from "js-cookie";

const schema = yup 
.object({
        email: yup
        .string()
        .required("Por favor, coloque um email.")
        .min(5, "O email precisa ter no mínimo 5 letras!")
        .email("Insira um email válido!"),
        senha: yup
        .string()
        .required("Por favor, coloque uma senha.")
        .min(7, "A senha precisa ter no mínimo 7 letras!"),       
    })
    .required()
    
const UserLogin = () => {
    const [mostrarSenha, getMostrarSenha] = useState(false);
    const [lembrarConta, setLembrarConta] = useState(false);
    
    const navigate = useNavigate();

    const { register, handleSubmit, formState: {errors}, } = useForm({
        resolver: yupResolver(schema),
    });

    async function onSubmit(data) {
        try {
            const { email, senha } = data;
            const response = await userLogin(email, senha);
            const result = await response.json();

            if (result.token) {
                Cookies.set("token", result.token, {
                    expires: lembrarConta ? 7 : null,
                    secure: true,
                    sameSite: "strict",
                });

                navigate("/");
            }
        } catch (e) {
            console.error(e);   
        }
    };

    return (
        <div>
            <div className="absolute top-1 left-1">            
                <Link
                className='bg-violet-700 text-zinc-200 flex m-5 p-5 text-center rounded-md hover:bg-violet-600/50
                transition delay-300'
                to={{
                pathname: "/"
                }}
                >
                    Voltar
                </Link>
            </div>

            <form className="bg-neutral-800/70 flex items-center justify-center h-screen" onSubmit={handleSubmit(onSubmit)}>
                <div className="w-96 p-6 shadow-lg rounded-lg bg-white border-violet-700 border-4">
                    <h2 className="text-center font-semibold block text-3xl text-gray-800">
                        Entre com sua Conta!
                    </h2>
                
                    <div className="mt-5">
                        <label htmlFor="register-email" className="text-gray-800 text-base mb-2 block font-medium">
                            Email
                        </label>

                        <input 
                        type="text" 
                        {...register("email")}
                        className="text-gray-800 bg-gray-300 border rounded-lg py-1 px-2 w-full text-base focus:outline-none focus:ring-0 focus:border-gray-700
                        hover:bg-gray-400/75 transition duration-300" 
                        />
                        <p role="alert" className="text-violet-700 font-medium">{errors.email?.message}</p>
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

                        <span className="text-base font-medium hover:font-bold">
                            Lembrar minha conta
                        </span>
                    </label>
                    
                    <div className="mt-1">
                        <Link
                        className='font-semibold hover:font-bold'
                        to={{
                        pathname: "/forgot-password"
                        }}
                        >
                            Esqueci minha senha
                        </Link>
                    </div>
                    
                    <div className="mt-1">
                        <Link
                        className='font-semibold hover:font-bold'
                        to={{
                        pathname: "/register"
                        }}
                        >
                            Não tenho uma conta
                        </Link>
                    </div>
                    
                    <div>
                        <input
                        type="submit"  
                        value="Entrar"
                        onClick={userLogin}
                        className="mt-5 rounded-lg text-white border-2 border-violet-600 bg-violet-600 py-1 w-full 
                        hover:bg-transparent hover:text-violet-700 hover:font-semibold transition duration-500 hover:cursor-pointer"                    
                        />                        
                            
                    </div>
                </div>
            </form>
        </div>
    );
}

export default UserLogin;