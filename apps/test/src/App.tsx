import { Editor } from '../../../packages/core/dist/index.mjs';

function App() {
  return (
    <div className="flex h-screen w-full items-center justify-center p-10">
      <div className="bg-background text-foreground h-full w-full max-w-full rounded-lg border border-red-500 p-10">
        <Editor
          onUpdate={(e) => console.log(e.getJSON())}
          config={{
            hasMenuBar: false,
            contentClassName:
              '!w-full !max-w-full !bg-background !text-foreground ',
            bodyClassName:
              '!p-0 !w-full !border-0 !m-0 !rounded-none !bg-background',
            toolbarClassName: '!bg-background',
            wrapClassName: ' !w-full !bg-background',
          }}
        />
      </div>
    </div>
  );
}

export default App;
