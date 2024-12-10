const Error = ({ message }) => {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-xl font-bold text-red-600">Error</h1>
        <p className="text-gray-700 mt-2">{message || 'Something went wrong.'}</p>
      </div>
    );
  };
  
  export default Error;