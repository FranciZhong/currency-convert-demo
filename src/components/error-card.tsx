import { TriangleAlert } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface ErrorCardProps {
  children?: React.ReactNode;
}

export default function ErrorCard({ children }: ErrorCardProps) {
  return (
    <Card className="px-4">
      <CardContent className="flex flex-col items-center gap-4">
        <TriangleAlert className="h-16 w-16 text-red-500" />
        {children}
      </CardContent>
    </Card>
  );
}
