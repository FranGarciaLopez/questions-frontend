'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';    
import ResponseList from './ShowResponses';

export default function QuestionForm() {
          const [jobType, setJobType] = useState('');
          const [difficulty, setDifficulty] = useState('');
          const [numOfQuestions, setNumOfQuestions] = useState('');
          const [questions, setQuestions] = useState<string[]>([]);

          const API_URL = process.env.NEXT_PUBLIC_API_URL;

          async function handleGenerateQuestions(e : React.FormEvent<HTMLFormElement>) {
                    e.preventDefault();

                    const res = await fetch(`${API_URL}/api/generate-questions`, {
                              method: 'POST',
                              headers: {
                                        'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                        jobType,
                                        difficulty,
                                        numOfQuestions: Number(numOfQuestions),
                              }),

                    });

                    if(!res.ok) {
                              const errorData = await res.json();
                              console.error(errorData);          
                              return;
                    }
                    const data = await res.json();

                    const formattedQuestions = Array.isArray(data.questions)
                    ? data.questions.flat() 
                    : [data.questions];
                    setQuestions(formattedQuestions || []);
          }

          return (
                    <div className="p-6 border border-border rounded-lg bg-card text-card-foreground
                              max-w-lg mx-auto w-full space-y-4
                              
                    ">
                      <form onSubmit={handleGenerateQuestions} className="space-y-4">
                        {/* Job Type */}
                        <Input
                          type="text"
                          placeholder="Puesto de trabajo (ej. Desarrollador Frontend)"
                          value={jobType}
                          onChange={(e) => setJobType(e.target.value)}
                          required
                          className="w-full p-2 border border-border bg-background text-foreground rounded-lg focus:ring-2 focus:ring-ring focus:outline-none"
                        />
                
                        {/* Difficulty */}
                        <select
                          className="w-full p-2 border border-border bg-background text-foreground rounded-lg focus:ring-2 focus:ring-ring focus:outline-none"
                          value={difficulty}
                          onChange={(e) => setDifficulty(e.target.value)}
                        >
                          <option value="">Dificultad</option>
                          <option value="easy">Fácil</option>
                          <option value="medium">Medio</option>
                          <option value="hard">Difícil</option>
                        </select>
                
                        {/* Number of Questions */}
                        <Input
                          type="number"
                          placeholder="Número de preguntas"
                          value={numOfQuestions}
                          onChange={(e) => setNumOfQuestions(e.target.value)}
                          required
                          className="w-full p-2 border border-border bg-background text-foreground rounded-lg focus:ring-2 focus:ring-ring focus:outline-none"
                        />
                
                        {/* Button */}
                        <Button
                          type="submit"
                          className="w-full bg-primary text-primary-foreground
                          hover:bg-primary/85 px-4 py-2 rounded-md transition"
                        >
                          Generar preguntas
                        </Button>
                      <ResponseList questions={questions} />

                      </form>
                

                    </div>
                  );
}