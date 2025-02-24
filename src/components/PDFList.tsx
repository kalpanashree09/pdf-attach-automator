
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileDown } from "lucide-react";

type PDF = {
  filename: string;
  fromAddress: string;
  dateReceived: string;
  subject: string;
};

type PDFListProps = {
  pdfs: PDF[];
};

const PDFList = ({ pdfs }: PDFListProps) => {
  return (
    <Card className="p-6 animate-fade-up">
      <h2 className="text-lg font-semibold mb-4">Recent PDF Downloads</h2>
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {pdfs.map((pdf) => (
            <Card
              key={pdf.filename}
              className="p-4 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileDown className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="font-medium">{pdf.filename}</div>
                  <div className="text-sm text-muted-foreground">
                    From: {pdf.fromAddress}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Subject: {pdf.subject}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Received: {new Date(pdf.dateReceived).toLocaleString()}
                  </div>
                </div>
              </div>
            </Card>
          ))}
          {pdfs.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              No PDFs downloaded yet. Configure an email account to start receiving PDFs.
            </div>
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default PDFList;
