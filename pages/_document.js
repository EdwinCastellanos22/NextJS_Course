import { Html, Head, Main, NextScript } from "next/document";
import Link from "next/link";

export default function Document() {
  const i= "http://localhost:3000/";
  return (
    <Html lang="es">
      <Head />
      <body>
        <div className="navbar">
          <div className="navbar-start">
            <h1 className="text-xl normal-case btn-ghost">BookShop</h1>
          </div>
          <div className="navbar-end">
            <Link
              href="/"
              className={i == 'http://localhost:3000/' ? "hidden" : "btn rounded-full text-white hover:bg-white hover:text-black m-w m-2"}
            >
              Books
            </Link>
            <Link
              href="/newbook"
              className="btn rounded-full text-white hover:bg-white hover:text-black m-w m-2"
            >
              New Book
            </Link>
          </div>
        </div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
