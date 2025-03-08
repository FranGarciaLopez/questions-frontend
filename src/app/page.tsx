import QuestionForm from "@/components/QuestionForm";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 space-y-4
      min-h-screen bg-background text-foreground
    ">
      <h1 className="text-4xl font-bold text-center
      max-w-lg text-start">Preparación de entrevistas de trabajo</h1>
      <p className="text-lg text-center">
        Aprende a responder preguntas de entrevistas de trabajo
      </p>
      <QuestionForm />
    </div>
  );
}
