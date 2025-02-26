import { Editor } from '@maily-to/core/*';



export const dynamic = 'force-static';

export default function LandingPage() {
  return (

      <main className="mx-auto w-full max-w-[calc(600px+40px)] px-5">
      <Editor />
    </main>

  );
}
