function Loader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-dashed border-blue-500"></div>
        <p className="text-lg font-medium text-blue-700">Loading...</p>
      </div>
    </div>
  );
}

export default Loader;
