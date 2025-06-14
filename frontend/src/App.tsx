import React, { useState } from "react";
import {
  Github,
  Folder,
  XCircle,
  Loader,
  Cloudy,
  FolderSync,
  Server,
  CheckCheck,
  Hexagon,
  Hammer
} from "lucide-react";
import { BACKEND_URL } from "./config";

function App() {
  const [githubUrl, setGithubUrl] = useState("");
  const [directory, setDirectory] = useState("");
  const [installCommand, setInstallCommand] = useState("");
  const [buildCommand, setBuildCommand] = useState("");
  const [buildDir, setBuildDir] = useState("");
  const [status, setStatus] = useState<number | null>(null);
  const [deployUrl, setDeployUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const pollDeploymentStatus = async (deployId: string) => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/project/${deployId}`,
          {
            headers: { "Content-Type": "application/json" },
            method: "GET",
          }
        );
        const result = await response.json();
        console.log(result);
        if (result) {
          console.log(result);
          setStatus(result.status);
          setDeployUrl(result.deployed_url);
          if (result.status === 3 || result.status === 4)
            clearInterval(interval);
            setError(result.error_message || null);
        }
      } catch (err) {
        setStatus(4);
        clearInterval(interval);
      }
    }, 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStatus(0);
    try {
      const response = await fetch(`${BACKEND_URL}/deploy`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          repo_url: githubUrl,
          project_directory: directory,
          install_command: installCommand,
          build_command: buildCommand,
          build_dir: buildDir
        }),
      });
      const result = await response.json();
      console.log("RESULT", result)
      if (result.id) {
        pollDeploymentStatus(result.id); // Start polling for status
      } else {
        setStatus(4);
        setError(result.error || "Deployment failed. Please check your inputs.");
      }
    } catch (err) {
      console.log(err);
      setStatus(4);
    }
  };

  const statusConfig = [
    {
      status: 0,
      icon: <Loader className="w-5 h-5 text-green-400" />,
      text: "Preparing deployment...",
    },
    {
      status: 1,
      icon: <FolderSync className="w-5 h-5 text-yellow-500" />,
      text: "Building your project...",
    },
    {
      status: 2,
      icon: <Server className="w-5 h-5 text-green-600" />,
      text: "Deploying your project...",
    },
    {
      status: 3,
      icon: <CheckCheck className="w-5 h-5 text-green-600" />,
      text: "Deployed your project successfully!",
    },
    {
      status: 4,
      icon: <XCircle className="w-5 h-5 text-red-600" />,
      text: "Deployment failed!",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0d1016] bg-radial-dots flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 bg-opacity-15 backdrop-blur-lg border-2 border-gray-800 rounded-3xl shadow-xl p-8">
          <div className="flex items-center justify-center space-x-2 mb-8 ">
          <div className="">
            <Cloudy className="w-8 h-8 text-slate-100" strokeWidth={3} /> 
            </div>           
          <h1 className="text-2xl font-bold text-gray-100">Nymbus Deploy</h1>
          </div>

          <form onSubmit={handleSubmit} className=" space-y-6">
            <div className="">
              <label className="block text-sm font-medium text-gray-100  mb-2">
                <div className="flex items-center space-x-2">
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository URL</span>
                </div>
              </label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/username/repo"
                className="w-full px-4 py-2 text-slate-100 bg-slate-800 bg-opacity-15 backdrop-blur-lg border-2 border-gray-800 rounded-lg "
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-100 mb-2">
                <div className="flex items-center space-x-2">
                  <Folder className="w-4 h-4" />
                  <span>Project Directory</span>
                </div>
              </label>
              <input
                type="text"
                value={directory}
                onChange={(e) => setDirectory(e.target.value)}
                placeholder="src"
                className="w-full px-4 text-slate-100 py-2w-full py-2 bg-slate-800 bg-opacity-15 backdrop-blur-lg border-2 border-gray-800 rounded-lg "
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-100 mb-2">
                <div className="flex items-center space-x-2">
                  <Hexagon className="w-4 h-4" />
                  <span>Install Command</span>
                </div>
              </label>
              <input
                type="text"
                value={installCommand}
                onChange={(e) => setInstallCommand(e.target.value)}
                placeholder="`npm install` or `pnpm install` or `yarn`"
                className="w-full px-4 text-slate-100 py-2w-full py-2 bg-slate-800 bg-opacity-15 backdrop-blur-lg border-2 border-gray-800 rounded-lg "
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-100 mb-2">
                <div className="flex items-center space-x-2">
                  <Hammer className="w-4 h-4" />
                  <span>Build Command</span>
                </div>
              </label>
              <input
                type="text"
                value={buildCommand}
                onChange={(e) => setBuildCommand(e.target.value)}
                placeholder="`npm build` or `pnpm build` or `yarn build`"
                className="w-full px-4 text-slate-100 py-2w-full py-2 bg-slate-800 bg-opacity-15 backdrop-blur-lg border-2 border-gray-800 rounded-lg "
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-100 mb-2">
                <div className="flex items-center space-x-2">
                  <Folder className="w-4 h-4" />
                  <span>Build Directory</span>
                </div>
              </label>
              <input
                type="text"
                value={buildDir}
                onChange={(e) => setBuildDir(e.target.value)}
                placeholder="`dist` or `build`"
                className="w-full px-4 text-slate-100 py-2w-full py-2 bg-slate-800 bg-opacity-15 backdrop-blur-lg border-2 border-gray-800 rounded-lg "
              />
            </div>
            

            <button
              type="submit"
              disabled={
                typeof status === "number" && status !== 3 && status !== 4
              }
              className="w-full bg-grad font-bold tracking-normal hover:tracking-[0.15em] text-slate-900 py-2 px-4 rounded-lg hover:bg-opacity-50 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {typeof status === "number" && status !== 3 && status !== 4 ? (
                <span className="flex items-center justify-center space-x-2">
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Deploying...</span>
                </span>
              ) : (
                "Deploy"
              )}
            </button>
          </form>

          {typeof status === "number" && (
            <div className={`mt-6 p-4 rounded-lg`}>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-slate-100 flex flex-col gap-2 items-center justify-center mx-auto">
                  <div className="flex gap-1">
                    {statusConfig.find((s) => s.status === status)?.icon}
                    {statusConfig.find((s) => s.status === status)?.text}
                  </div>
                  {error && (
                    <span className="text-red-500">
                      {error}
                    </span>
                  )}
                </span>
              </div>
                <a
                  href={`https://${deployUrl}`}
                  target="_blank"
                  // rel="noopener noreferrer"
                  className="mt-2 text-indigo-600 hover:text-indigo-800 truncate flex justify-center items-center"
                >
                  {deployUrl}
                </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
