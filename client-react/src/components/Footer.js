import {
    AiFillFacebook,
    AiFillLinkedin,
    AiFillGithub,
} from "react-icons/ai";

function Footer() {
    return (
        <footer className="flex px-24 py-6 bg-white text-center items-center border-t">
            <p className="mr-auto text-lg">© 2023 1753030 - Mai Thanh Binh</p>
            <div className="flex items-center w-1/5 justify-between">
                <p className="text-xl">Contact Me on</p>
                <a
                    href="https://www.facebook.com/mtbinhitus"
                    target="_blank"
                >
                    <AiFillFacebook size="36" color="#385898" />
                </a>
                <a
                    href="https://www.linkedin.com/in/binh-mai-668818204"
                    target="_blank"
                >
                    <AiFillLinkedin size="36" color="#0A66C2" />
                </a>
                <a
                    href="https://github.com/mtbinhitus"
                    target="_blank"
                >
                    <AiFillGithub size="36" color="#171515" />
                </a>
            </div>
        </footer>
    );
}

export default Footer;
