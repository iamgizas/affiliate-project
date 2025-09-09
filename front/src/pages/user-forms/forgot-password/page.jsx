import { useState } from "react";
import { Link } from "react-router";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:7777/api/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = res.json();
            setMsg(data.message);
        } catch (err) {
            setMsg('Erro ao enviar solicitação.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
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
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80 p-5 bg-white border-4 border-violet-700 rounded-md">
                <h2 className="flex justify-center text-2xl font-bold mb-4">Esqueci minha senha</h2>
                <input
                type="email"
                className="border rounded p-2 bg-neutral-300"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
                <button
                type="submit"
                className="mt-5 rounded-lg text-white border-2 border-violet-600 bg-violet-600 py-1 w-full 
                hover:bg-transparent hover:text-violet-700 hover:font-semibold transition duration-500"
                >
                Enviar link
                </button>
            </form>
            {msg && <p className="mt-3 text-sm text-gray-700">{msg}</p>}
        </div>
    );
}

export default ForgotPassword;