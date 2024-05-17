const ForBidden = () => {
  return (
    <>
      {/*
        This example requires updating your template:
  
        ```
        <html class="h-full">
        <body class="h-full">
        ```
      */}
      <div className="bg-white dark:bg-slate-950 min-h-full flex flex-col lg:relative">
        <div className="flex-grow flex flex-col">
          <main className="flex-grow flex flex-col dark:bg-slate-950 bg-white">
            <div className="flex-grow mx-auto max-w-7xl w-full flex flex-col px-4 sm:px-6 lg:px-8">
              <div className="flex-shrink-0 pt-10 sm:pt-16">
                <a href="/" className="inline-flex">
                  <span className="sr-only">Workflow</span>
                  {/* <img
                      className="h-12 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                      alt=""
                    /> */}
                </a>
              </div>
              <div className="flex-shrink-0 my-auto py-16 sm:py-32">
                <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
                  403
                </p>
                <h1 className="mt-2 text-4xl font-extrabold text-gray-900 dark:text-slate-50  tracking-tight sm:text-5xl">
                  Forbidden
                </h1>
                <p className="mt-2 text-base text-gray-500 dark:text-slate-300">
                  Désolé, vous n'avez pas accès à cette page.
                </p>
                {/* <div className="mt-6">
                    <a
                      href="#"
                      className="text-base font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Rentrer à la maison →<span aria-hidden="true"> &rarr;</span>
                    </a>
                  </div> */}
              </div>
            </div>
          </main>
          {/* <footer className="flex-shrink-0 bg-gray-50">
              <div className="mx-auto max-w-7xl w-full px-4 py-16 sm:px-6 lg:px-8">
                <nav className="flex space-x-4">
                  <a
                    href="#"
                    className="text-sm font-medium text-gray-500 hover:text-gray-600"
                  >
                    Contact Support
                  </a>
                  <span
                    className="inline-block border-l border-gray-300"
                    aria-hidden="true"
                  />
                  <a
                    href="#"
                    className="text-sm font-medium text-gray-500 hover:text-gray-600"
                  >
                    Status
                  </a>
                  <span
                    className="inline-block border-l border-gray-300"
                    aria-hidden="true"
                  />
                  <a
                    href="#"
                    className="text-sm font-medium text-gray-500 hover:text-gray-600"
                  >
                    Twitter
                  </a>
                </nav>
              </div>
            </footer> */}
        </div>
        <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1470847355775-e0e3c35a9a2c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1825&q=80"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default ForBidden;
