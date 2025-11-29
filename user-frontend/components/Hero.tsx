export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6">
            Decentralized Data Labeling Platform
          </h1>
          <p className="text-xl mb-8 text-purple-100">
            Create tasks, get labeled data, pay with SOL
          </p>
          <div className="flex justify-center gap-8 text-sm">
            <div>
              <div className="text-3xl font-bold">⚡</div>
              <div>Fast</div>
            </div>
            <div>
              <div className="text-3xl font-bold">🔒</div>
              <div>Secure</div>
            </div>
            <div>
              <div className="text-3xl font-bold">💎</div>
              <div>Blockchain</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
