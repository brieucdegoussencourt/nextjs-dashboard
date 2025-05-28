import { lusitana } from "@/app/ui/fonts";

// Footer component for the application

const Footer: React.FC = () => (
    <footer className={`${lusitana.className} flex w-full flex-row items-center justify-end text-white`}>
        <div>
            &copy; {new Date().getFullYear()} - La Finca CSA
        </div>

    </footer>
);

export default Footer;

