import { Editor } from '@helmiapp/platform-email-editor-core';

import { ImageExtension } from '@helmiapp/platform-email-editor-core/extensions';

function App() {
  return (
    <div className="flex h-screen w-full items-center justify-center p-10">
      <div className="bg-background text-foreground h-full w-full max-w-full rounded-lg border border-red-500 p-10">
        <Editor
          onUpdate={(e) => console.log(e.getJSON())}
          extensions={[
            ImageExtension.configure({
              uploadImage: async (file: File) => {
                console.log(file);
                return 'https://placeholder.com/image.jpg';
              },
            }),
          ]}
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
