import Link from "next/link";
function Logo() {
  return (
    <Link href={"/"} className="sm:text-3xl text-2xl font-extrabold capitalize">
      <span>Weather </span>
      <span className="text-orange-500">man</span>
    </Link>
  );
}

export default Logo;
