import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";

export default function Feedback() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Feedback</CardTitle>
        <CardDescription>User feedback and reviews</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="tw:text-gray-500">Feedback content will be displayed here.</p>
      </CardContent>
    </Card>
  );
}