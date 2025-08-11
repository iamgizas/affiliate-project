import { Link } from "react-router";

const Navbar = () => {
    return (
        <div className="relative flex flex-col overflow-hidden py-5 sm:py-12"> 
            <div className="flex flex-row justify-end mr-10">                                
                <Link
                    className='bg-violet-700 text-zinc-200 p-5 mr-10 text-center rounded-md
                    border-2 border-violet-700 hover:bg-transparent transition delay-200 ease-in
                    text-lg font-semibold'
                    to={{
                    pathname: "/login"
                    }}
                    >
                    Entrar
                </Link>                
            </div>           
        </div>
    );
}

export default Navbar;