import { TypeIcon } from "lucide-react";
import * as Icons from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FeatureCard({ icon, title, description }) {
  const Icon = Icons[icon];

  return (
    <Card className="transition-all duration-300 hover:shadow-lg dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <Icon className="h-10 w-10 text-purple-600 dark:text-purple-400 mb-2" />
        <CardTitle className="text-gray-900 dark:text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500 dark:text-gray-400">{description}</p>
      </CardContent>
    </Card>
  );
}
