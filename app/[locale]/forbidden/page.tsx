import Link from "next/link";

/* This example requires Tailwind CSS v2.0+ */
export default function page() {
  return (
    <>
      {/*
            This example requires updating your template:
    
            ```
            <html class="h-full">
            <body class="h-full">
            ```
          */}
      <div className="bg-white min-h-full flex flex-col lg:relative">
        <div className="flex-grow flex flex-col">
          <main className="flex-grow flex flex-col bg-white">
            <div className="flex-grow mx-auto max-w-7xl w-full flex flex-col px-4 sm:px-6 lg:px-8">
              <div className="flex-shrink-0 pt-10 sm:pt-16">
                <a href="/" className="inline-flex">
                  <span className="sr-only">Workflow</span>
                  <img className="h-12 w-auto" src="/images/logo.png" alt="" />
                </a>
              </div>
              <div className="flex-shrink-0 my-auto py-16 sm:py-32">
                <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
                  Erreur 403
                </p>
                <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                  Accès refusé
                </h1>
                <p className="mt-2 text-base text-gray-500">
                  Désolé, vous n'avez pas accès à cette page.
                </p>
                <div className="mt-6">
                  <div className="mt-6">
                    <Link
                      href="/"
                      className="text-base font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Retourner à la page d'accueil
                      <span aria-hidden="true"> &rarr;</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <footer className="flex-shrink-0 bg-gray-50">
            <div className="mx-auto max-w-7xl w-full px-4 py-16 sm:px-6 lg:px-8"></div>
          </footer>
        </div>
        <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://cdnfr.africanmanager.com/wp-content/uploads/2020/06/amen_bank.jpg"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
