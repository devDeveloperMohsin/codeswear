import Image from "next/image";
import Link from "next/link";

function Custom404() {
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-col px-5 py-24 justify-center items-center">
          <Image
            className="mb-10 object-cover object-center rounded"
            alt="hero"
            src="/404.jpg"
            height={200}
            width={300}
        
            style={{ maxWidth: '100%', width: 'auto', height: 'auto' }}
          />
          <div className="w-full md:w-2/3 flex flex-col mb-16 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              404 - Page not Found
            </h1>
            <p className="mb-8 leading-relaxed">
              Please click the below link to navigate back to home
              <br />
              <Link href={'/'} className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 inline-block rounded">Back to Home</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Custom404;
