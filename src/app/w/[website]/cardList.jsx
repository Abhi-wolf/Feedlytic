"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function CardList({ items, title, col1, col2 }) {
  return (
    <Card className="max-h-[60vh] overflow-y-auto w-full">
      <CardHeader>
        <CardTitle>{title} </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="capitalize font-semibold">{col1}</TableHead>
              <TableHead className="text-right capitalize font-semibold">
                {col2}
              </TableHead>
            </TableRow>
          </TableHeader>
          {items?.length === 0 ? (
            <TableBody className="w-full text-red-400 italic ">
              <p className="text-sm md:text-md text-center my-2">
                No data found
              </p>
            </TableBody>
          ) : (
            <TableBody>
              {items?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="break-words max-w-0">
                    {item[col1]}
                  </TableCell>
                  <TableCell className="text-right">
                    {item?.visits?.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </CardContent>
    </Card>
  );
}
