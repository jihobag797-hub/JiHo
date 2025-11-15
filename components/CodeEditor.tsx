
import React from 'react';
import CodeIcon from './icons/CodeIcon';
import PlayIcon from './icons/PlayIcon';

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
  onRun: () => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, setCode, onRun }) => {
  return (
    <div className="flex flex-col h-full bg-gray-800 rounded-lg shadow-2xl overflow-hidden">
      <div className="flex items-center p-3 bg-gray-700 border-b border-gray-600">
        <CodeIcon className="w-5 h-5 mr-2 text-indigo-400" />
        <h2 className="text-lg font-semibold text-gray-200">Code Editor</h2>
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="flex-grow p-4 bg-gray-800 text-gray-300 font-mono text-sm resize-none focus:outline-none w-full"
        placeholder="Paste your HTML, CSS, and JavaScript here..."
        spellCheck="false"
      />
      <div className="p-2 bg-gray-800 border-t border-gray-700">
        <button
          onClick={onRun}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-colors duration-200"
        >
          <PlayIcon className="w-5 h-5"/>
          Run Game
        </button>
      </div>
    </div>
  );
};

export default CodeEditor;
