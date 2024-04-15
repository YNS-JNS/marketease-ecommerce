const Stats = () => {

  // const StatItem = ({ icon, bgColor, title, value }) => {
  //   return (
  //     <div className={`flex items-center bg-white border rounded-sm overflow-hidden shadow ${bgColor}`}>
  //       <div className="p-4">{icon}</div>
  //       <div className="px-4 text-gray-700">
  //         <h3 className="text-sm tracking-wider">{title}</h3>
  //         <p className="text-3xl">{value}</p>
  //       </div>
  //     </div>
  //   );
  // };

  return (

    <div>
      <div className="bg-gray-200 h-screen ">
        <div className="grid gap-4 lg:gap-8 md:grid-cols-3 p-8 pt-20">
          <div className="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
                <span>Revenue</span>
              </div>

              <div className="text-3xl dark:text-gray-100">
                $192.1k
              </div>

              <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-green-600">

                <span>32k increase</span>

                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                  aria-hidden="true">
                  <path fillRule="evenodd"
                    d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                    clipRule="evenodd"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
                <span>New customers</span>
              </div>

              <div className="text-3xl dark:text-gray-100">
                1340
              </div>

              <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-red-600">

                <span>3% decrease</span>

                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                  aria-hidden="true">
                  <path fillRule="evenodd"
                    d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z"
                    clipRule="evenodd"></path>
                </svg>
              </div>
            </div>

          </div>

          <div className="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">

                <span>New orders</span>
              </div>

              <div className="text-3xl dark:text-gray-100">
                3543
              </div>

              <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-green-600">

                <span>7% increase</span>

                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                  aria-hidden="true">
                  <path fillRule="evenodd"
                    d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                    clipRule="evenodd"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>




    //   <div className="grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-4 sm:px-8">
    //     <StatItem
    //       icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
    //       bgColor="bg-green-400"
    //       title="Total Member"
    //       value="12,768"
    //     />
    //     <StatItem
    //       icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>}
    //       bgColor="bg-blue-400"
    //       title="Total Post"
    //       value="39,265"
    //     />
    //     <StatItem
    //       icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>}
    //       bgColor="bg-indigo-400"
    //       title="Total Comment"
    //       value="142,334"
    //     />
    //     <StatItem
    //       icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>}
    //       bgColor="bg-red-400"
    //       title="Server Load"
    //       value="34.12%"
    //     />
    //   </div>
  );
};



export default Stats;
