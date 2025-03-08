'use client';

import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

interface ResponseListProps {
  questions: string[];
}

export default function ResponseList({ questions }: ResponseListProps) {
  if (!questions || questions.length === 0) {
    return null;
  }

  return (
    <Card className="bg-card border border-border text-card-foreground shadow-lg mt-4">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-primary-foreground">
          Preguntas generadas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-decimal list-inside space-y-2">
          {questions.map((question, index) => (
            <div
              key={index}
              className="text-accent-foreground text-sm pb-2 last:border-b-0"
            >
              {question}
            </div>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
