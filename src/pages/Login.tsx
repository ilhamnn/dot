import { useLogin } from "../hooks/UseLogin";

export default function LoginPage() {
  const {
    username,
    setUsername,
    password,
    setPassword,
    handleSubmit,
    loading,
    error,
  } = useLogin();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow">
        <h1 className="mb-2 text-center text-3xl font-bold">Login</h1>

        <p className="mb-6 text-center text-gray-500">Masuk ke akun Anda</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
              placeholder="dot"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
              placeholder="123"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-black py-2 font-medium text-white"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}
