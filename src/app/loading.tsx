export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
      </div>

      <div className="relative z-10 text-center">
        {/* Anime Loading Spinner */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          {/* Outer ring */}
          <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin" />
          {/* Middle ring */}
          <div className="absolute inset-2 border-4 border-transparent border-t-purple-500 border-r-pink-500 rounded-full [animation:spin-reverse_1.5s_linear_infinite]" />
          {/* Inner ring */}
          <div className="absolute inset-4 border-4 border-transparent border-t-pink-500 border-r-blue-500 rounded-full animate-spin" />
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-3xl font-bold text-white mb-4 animate-pulse">
          Loading
          <span className="inline-block animate-bounce">.</span>
          <span className="inline-block animate-bounce [animation-delay:0.2s]">.</span>
          <span className="inline-block animate-bounce [animation-delay:0.4s]">.</span>
        </h2>

        {/* Subtitle */}
        <p className="text-gray-400 text-lg mb-8">
          Fetching your anime data
        </p>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full [animation:loading-bar_2s_ease-in-out_infinite]" />
          </div>
        </div>

        {/* Loading Tips */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto border border-gray-700">
          <p className="text-blue-300 text-sm italic">
            "Even if you're bored, just keep watching. Because it might get interesting later!"
          </p>
          <p className="text-gray-500 text-xs mt-2">— Loading wisdom from anime fans</p>
        </div>

        {/* Floating Anime Icons */}
        <div className="absolute top-20 left-20 text-4xl opacity-30 [animation:float_3s_ease-in-out_infinite]">📺</div>
        <div className="absolute bottom-20 right-20 text-4xl opacity-30 [animation:float-delayed_4s_ease-in-out_infinite]">🎬</div>
        <div className="absolute top-1/2 right-32 text-3xl opacity-30 [animation:float_3s_ease-in-out_infinite]">⭐</div>
        <div className="absolute bottom-1/3 left-32 text-3xl opacity-30 [animation:float-delayed_4s_ease-in-out_infinite]">✨</div>
      </div>
    </div>
  );
}
