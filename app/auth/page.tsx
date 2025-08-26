// ...existing code...
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function AuthPage() {
  return (
    <Card className="max-w-md mx-auto mt-20">
      <CardHeader>
        <h2 className="text-xl font-bold">Authentication</h2>
      </CardHeader>
      <CardContent>
        {/* TODO: Add login/register forms here */}
        <p>Login and registration will be available soon.</p>
      </CardContent>
    </Card>
  );
}
