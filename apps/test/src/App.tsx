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
                return 'https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=';
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
