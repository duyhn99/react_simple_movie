export default function Loading() {
  return (
    <div className='fixed inset-0 flex flex-col items-center justify-center backdrop-blur-sm z-50'>
      <div className='flex flex-col items-center gap-4'>
        <div className='h-12 w-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin'></div>
        <p className='text-gray-600 font-medium text-center'>Loading...</p>
      </div>
    </div>
  );
}
