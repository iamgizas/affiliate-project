import { useState } from "react";

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
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Esqueci minha senha</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80">
                <input
                type="email"
                className="border rounded p-2"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
                <button
                type="submit"
                className="bg-violet-600 hover:bg-violet-700 text-white rounded p-2"
                >
                Enviar link
                </button>
            </form>
            {msg && <p className="mt-3 text-sm text-gray-700">{msg}</p>}
        </div>
    );
}

export default ForgotPassword;