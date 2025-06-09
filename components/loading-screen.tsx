export default function LoadingScreen() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-amber-900">
      <div className="text-4xl font-bold text-white mb-4">Loading Prehistoric World</div>
      <div className="text-xl text-amber-200 mb-6">Loading models and textures...</div>
      <div className="w-64 h-2 bg-amber-700 rounded-full overflow-hidden">
        <div className="h-full bg-amber-400 animate-[loading_2s_ease-in-out_infinite]"></div>
      </div>
    </div>
  )
}
